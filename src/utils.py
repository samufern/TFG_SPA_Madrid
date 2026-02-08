from __future__ import annotations

import json
import math
import time
import unicodedata
from hashlib import sha256
from pathlib import Path
from typing import Any, Dict, Iterable, List, Mapping, Optional, Sequence

import numpy as np

DEFAULT_HEADERS: Dict[str, str] = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "*/*",
}


# ---------------------------------------------------------------------------
#  Parseo de datos de barrios (formato JavaScript)
# ---------------------------------------------------------------------------

def parse_js_barrios(js_text: str) -> List[Dict[str, Any]]:
    """Convierte el array JavaScript ``barriosMadrid`` a una lista de diccionarios.

    El archivo fuente ``alquiler_barrios_madrid_oct2025.js`` contiene datos de
    barrios en formato JavaScript (no JSON estandar). Esta funcion se encarga
    de limpiarlo y parsearlo:

    1. Elimina comentarios JS (// y /* */)
    2. Anade comillas a las claves (JS permite claves sin comillas)
    3. Reemplaza literales JS (true/false/null) por equivalentes Python
    4. Extrae el array completo y lo parsea con ``ast.literal_eval``

    Args:
        js_text: Contenido del archivo JS como texto.

    Returns:
        Lista de diccionarios, uno por barrio. Lista vacia si el parseo falla
        o el texto no contiene ``barriosMadrid``.

    Ejemplo:
        >>> barrios = parse_js_barrios(open("barrios.js").read())
        >>> barrios[0]["name"]
        'Prosperidad'
    """
    import re

    def _strip_js_comments(text: str) -> str:
        """Elimina comentarios de linea (//) y de bloque (/* */) del codigo JS."""
        output = []
        i = 0
        in_string: str | None = None
        escape = False
        in_line_comment = False
        in_block_comment = False
        while i < len(text):
            char = text[i]
            nxt = text[i + 1] if i + 1 < len(text) else ""
            if in_line_comment:
                if char == "\n":
                    in_line_comment = False
                    output.append(char)
                i += 1
                continue
            if in_block_comment:
                if char == "*" and nxt == "/":
                    in_block_comment = False
                    i += 2
                    continue
                i += 1
                continue
            if in_string:
                output.append(char)
                if escape:
                    escape = False
                elif char == "\\":
                    escape = True
                elif char == in_string:
                    in_string = None
                i += 1
                continue
            if char in ("'", '"'):
                in_string = char
                output.append(char)
                i += 1
                continue
            if char == "/" and nxt == "/":
                in_line_comment = True
                i += 2
                continue
            if char == "/" and nxt == "*":
                in_block_comment = True
                i += 2
                continue
            output.append(char)
            i += 1
        return "".join(output)

    def _quote_keys(text: str) -> str:
        """Anade comillas dobles a las claves de objetos JS sin comillas."""
        output = []
        i = 0
        in_string = None
        escape = False
        while i < len(text):
            ch = text[i]
            if in_string:
                output.append(ch)
                if escape:
                    escape = False
                elif ch == "\\":
                    escape = True
                elif ch == in_string:
                    in_string = None
                i += 1
                continue
            if ch in ("'", '"'):
                in_string = ch
                output.append(ch)
                i += 1
                continue
            if ch in "{,":
                output.append(ch)
                i += 1
                while i < len(text) and text[i].isspace():
                    output.append(text[i])
                    i += 1
                start = i
                if i < len(text) and (text[i].isalpha() or text[i] == "_"):
                    i += 1
                    while i < len(text) and (text[i].isalnum() or text[i] == "_"):
                        i += 1
                    key = text[start:i]
                    j = i
                    while j < len(text) and text[j].isspace():
                        j += 1
                    if j < len(text) and text[j] == ":":
                        output.append(f"\"{key}\"")
                        output.append(text[i:j])
                        output.append(":")
                        i = j + 1
                        continue
                    output.append(key)
                    i = j
                    continue
                continue
            output.append(ch)
            i += 1
        return "".join(output)

    def _replace_js_literals(text: str) -> str:
        """Convierte literales JavaScript a Python: true->True, false->False, null->None."""
        output = []
        i = 0
        in_string = None
        escape = False
        while i < len(text):
            ch = text[i]
            if in_string:
                output.append(ch)
                if escape:
                    escape = False
                elif ch == "\\":
                    escape = True
                elif ch == in_string:
                    in_string = None
                i += 1
                continue
            if ch in ("'", '"'):
                in_string = ch
                output.append(ch)
                i += 1
                continue
            if ch.isalpha():
                start = i
                while i < len(text) and text[i].isalpha():
                    i += 1
                token = text[start:i]
                if token == "true":
                    output.append("True")
                elif token == "false":
                    output.append("False")
                elif token == "null":
                    output.append("None")
                else:
                    output.append(token)
                continue
            output.append(ch)
            i += 1
        return "".join(output)

    def _extract_js_array(text: str, anchor: str) -> str | None:
        """Extrae un array JS completo desde la posicion del anchor dado."""
        anchor_idx = text.find(anchor)
        if anchor_idx < 0:
            return None
        start_idx = text.find("[", anchor_idx)
        if start_idx < 0:
            return None
        depth = 0
        in_string: str | None = None
        escape = False
        for idx in range(start_idx, len(text)):
            char = text[idx]
            if in_string:
                if escape:
                    escape = False
                elif char == "\\":
                    escape = True
                elif char == in_string:
                    in_string = None
                continue
            if char in ("'", '"'):
                in_string = char
                continue
            if char == "[":
                depth += 1
            elif char == "]":
                depth -= 1
                if depth == 0:
                    return text[start_idx : idx + 1]
        return None

    # Intentar parsear con y sin limpieza de comentarios
    for candidate in (_strip_js_comments(js_text), js_text):
        raw_array = _extract_js_array(candidate, "barriosMadrid")
        if not raw_array:
            continue
        normalized = _quote_keys(raw_array)
        normalized = re.sub(r",\\s*}", "}", normalized)
        normalized = re.sub(r",\\s*]", "]", normalized)
        try:
            import ast
            normalized = _replace_js_literals(normalized)
            parsed = ast.literal_eval(normalized)
            if isinstance(parsed, list) and parsed:
                return parsed
        except (ValueError, SyntaxError):
            continue
    return []


# ---------------------------------------------------------------------------
#  Funciones geograficas
# ---------------------------------------------------------------------------

def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calcula la distancia en kilometros entre dos puntos geograficos.

    Utiliza la formula de Haversine, que calcula la distancia en linea recta
    sobre la superficie de la Tierra (distancia "de vuelo de pajaro").

    Args:
        lat1: Latitud del primer punto (en grados decimales).
        lon1: Longitud del primer punto (en grados decimales).
        lat2: Latitud del segundo punto (en grados decimales).
        lon2: Longitud del segundo punto (en grados decimales).

    Returns:
        Distancia en kilometros. Retorna NaN si alguna coordenada es
        None o NaN. Retorna 0.0 si ambos puntos son identicos.

    Ejemplo:
        >>> haversine(40.4168, -3.7038, 40.4530, -3.6883)  # Sol -> Chamartin
        4.12  # aproximadamente 4.1 km
    """
    coords = [lat1, lon1, lat2, lon2]
    if any(c is None or (isinstance(c, float) and math.isnan(c)) for c in coords):
        return float('nan')
    if lat1 == lat2 and lon1 == lon2:
        return 0.0

    earth_radius_km = 6371  # Radio medio de la Tierra en km
    lat1, lon1, lat2, lon2 = map(math.radians, coords)
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    )
    return 2 * earth_radius_km * math.asin(math.sqrt(a))


def make_geohash(lat: float, lon: float, precision: int = 6) -> str:
    """Genera un identificador geoespacial (geohash) para una coordenada.

    Un geohash es un codigo alfanumerico que representa una zona geografica.
    Coordenadas cercanas comparten prefijo, lo que permite agrupar puntos
    por proximidad. Se usa para crear features espaciales (por ejemplo,
    precio medio por zona).

    Prioridad de librerias: H3 > geohash2 > formato texto simple.

    Args:
        lat: Latitud en grados decimales.
        lon: Longitud en grados decimales.
        precision: Nivel de detalle (mas alto = zona mas pequena).

    Returns:
        Codigo geohash como string.

    Ejemplo:
        >>> make_geohash(40.4168, -3.7038, 6)
        '87388a0acbfffff'  # Zona centro de Madrid
    """
    import importlib.util

    if importlib.util.find_spec("h3"):
        import h3
        resolution = max(0, min(15, precision + 1))
        return h3.latlng_to_cell(lat, lon, resolution)
    if importlib.util.find_spec("geohash2"):
        import geohash2
        return geohash2.encode(lat, lon, precision=precision)
    # Formato de texto simple como ultimo recurso
    return f"{lat:.{precision}f}_{lon:.{precision}f}"


def spatial_group(df, lat_col: str, lon_col: str, precision: int = 6) -> List[str]:
    """Asigna cada fila a una celda espacial (geohash) segun sus coordenadas.

    Las filas con coordenadas invalidas (NaN) reciben el grupo "missing".
    Se usa para crear agrupaciones espaciales en feature engineering
    (por ejemplo, estadisticas por zona geografica).

    Args:
        df: DataFrame con columnas de latitud y longitud.
        lat_col: Nombre de la columna de latitud.
        lon_col: Nombre de la columna de longitud.
        precision: Nivel de detalle del geohash (por defecto 6).

    Returns:
        Lista de strings con el geohash de cada fila.
    """
    import pandas as pd

    lat_series = pd.to_numeric(df[lat_col], errors="coerce")
    lon_series = pd.to_numeric(df[lon_col], errors="coerce")
    groups: List[str] = []
    for lat, lon in zip(lat_series.to_numpy(), lon_series.to_numpy()):
        if np.isnan(lat) or np.isnan(lon):
            groups.append("missing")
        else:
            groups.append(make_geohash(float(lat), float(lon), precision))
    return groups


# ---------------------------------------------------------------------------
#  Splits temporales para validacion cruzada
# ---------------------------------------------------------------------------

def make_time_splits(
    df,
    date_col: str,
    test_size: float = 0.2,
    seed: int = 100432070,
    gap_days: int = 0,
    n_cv_splits: int = 0,
):
    """Crea un split temporal train/holdout y opcionalmente folds de CV temporal.

    A diferencia de un split aleatorio, el split temporal respeta el orden
    cronologico: el modelo se entrena con datos pasados y se evalua con
    datos futuros. Esto simula un escenario real de produccion.

    El parametro ``gap_days`` introduce un "periodo de purga" entre train
    y test para evitar filtracion de informacion por anuncios actualizados
    recientemente.

    Esquema temporal::

        |--- TRAIN ---|-- GAP --|--- TEST (20%) ---|
        [mas antiguo]           [mas reciente]

    Args:
        df: DataFrame con una columna de fecha.
        date_col: Nombre de la columna con las fechas.
        test_size: Proporcion del dataset para holdout (por defecto 0.2 = 20%).
        seed: Semilla para split aleatorio (usado solo si no hay fechas validas).
        gap_days: Dias de separacion entre train y test (por defecto 0).
        n_cv_splits: Si >0, genera folds adicionales de CV temporal dentro
            del conjunto de entrenamiento.

    Returns:
        - ``(train_idx, test_idx)`` si ``n_cv_splits == 0``
        - ``(train_idx, test_idx, cv_folds)`` si ``n_cv_splits > 0``
          donde ``cv_folds`` es lista de tuplas ``(fold_train_idx, fold_val_idx)``

    Ejemplo:
        >>> train_idx, test_idx = make_time_splits(df, "last_update", gap_days=7)
        >>> X_train, X_test = df.loc[train_idx], df.loc[test_idx]
    """
    import pandas as pd

    df = df.copy()
    df[date_col] = pd.to_datetime(df[date_col], errors="coerce")
    valid = df.dropna(subset=[date_col]).sort_values(date_col)

    # Si no hay fechas validas, hacer split aleatorio
    if valid.empty:
        indices = df.index.to_numpy()
        if len(indices) == 0:
            result = (indices, indices)
            return (*result, []) if n_cv_splits else result
        rng = np.random.default_rng(seed)
        perm = rng.permutation(indices)
        n_test = max(1, int(round(len(indices) * test_size)))
        n_test = min(n_test, len(indices) - 1) if len(indices) > 1 else 0
        test_idx = perm[:n_test]
        train_idx = perm[n_test:]
        return (*(train_idx, test_idx), []) if n_cv_splits else (train_idx, test_idx)

    # Calcular punto de corte temporal (ultimo 20% por fecha)
    split_point = int(len(valid) * (1 - test_size))
    split_point = max(1, min(split_point, len(valid) - 1))
    split_date = valid.iloc[split_point][date_col]

    # Aplicar gap temporal si esta configurado
    if gap_days and pd.notna(split_date):
        gap_cutoff = split_date - pd.Timedelta(days=int(gap_days))
        train_idx = valid.loc[valid[date_col] < gap_cutoff].index.to_numpy()
        test_idx = valid.loc[valid[date_col] >= split_date].index.to_numpy()
        # Fallback si el gap elimina demasiados datos
        if len(train_idx) == 0 or len(test_idx) == 0:
            train_idx = valid.iloc[:split_point].index.to_numpy()
            test_idx = valid.iloc[split_point:].index.to_numpy()
    else:
        train_idx = valid.iloc[:split_point].index.to_numpy()
        test_idx = valid.iloc[split_point:].index.to_numpy()

    # Las filas sin fecha valida se asignan al train (decision conservadora)
    missing_idx = df.index.difference(valid.index)
    if len(missing_idx) > 0:
        train_idx = np.concatenate([train_idx, missing_idx.to_numpy()])

    # --- Validacion cruzada temporal bloqueada (opcional) ---
    cv_folds: List = []
    if n_cv_splits > 0:
        train_valid = valid.loc[valid.index.isin(train_idx)].sort_values(date_col)
        n_train = len(train_valid)
        if n_train > n_cv_splits:
            fold_size = n_train // (n_cv_splits + 1)
            for k in range(n_cv_splits):
                tr_end = fold_size * (k + 1)
                val_start = tr_end
                val_end = min(val_start + fold_size, n_train)
                if val_end <= val_start:
                    continue
                if gap_days:
                    # Aplicar purga entre train y validation del fold
                    boundary_date = train_valid.iloc[tr_end - 1][date_col]
                    purge = boundary_date + pd.Timedelta(days=gap_days)
                    tr_fold = train_valid.iloc[:tr_end]
                    tr_fold = tr_fold.loc[tr_fold[date_col] < boundary_date]
                    vl_fold = train_valid.iloc[val_start:val_end]
                    vl_fold = vl_fold.loc[vl_fold[date_col] >= purge]
                    if len(tr_fold) > 0 and len(vl_fold) > 0:
                        cv_folds.append((tr_fold.index.to_numpy(), vl_fold.index.to_numpy()))
                else:
                    cv_folds.append((
                        train_valid.iloc[:tr_end].index.to_numpy(),
                        train_valid.iloc[val_start:val_end].index.to_numpy(),
                    ))

    if n_cv_splits > 0:
        return train_idx, test_idx, cv_folds
    return train_idx, test_idx



