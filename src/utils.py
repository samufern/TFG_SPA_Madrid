"""
utils.py - Funciones compartidas del proyecto SPA-Madrid
=========================================================

Este modulo centraliza toda la logica reutilizable del proyecto de prediccion
de precios de alquiler en Madrid. Incluye funciones para:

    - Gestion de rutas del proyecto
    - Descarga y cache de datos externos
    - Calculo de distancias geograficas (formula Haversine)
    - Generacion de geohashes para agrupaciones espaciales
    - Evaluacion de modelos de regresion con metricas estandar
    - Construccion de pipelines de boosting (CatBoost, LightGBM, XGBoost)
    - Agregaciones out-of-fold (OOF) para evitar data leakage
    - Imputacion de valores faltantes preservando nombres de columnas
    - Visualizacion de mapas interactivos (Folium) o estaticos (Matplotlib)
    - Splits temporales para validacion cruzada con datos secuenciales

Todas las funciones estan disenadas para ser importadas desde los notebooks
del proyecto. El modulo se encuentra en src/utils.py y se importa asi:

    from src.utils import haversine, eval_regression, make_boosting_pipeline

Autor: Samuel Fernández Fernández
"""

from __future__ import annotations

import json
import math
import time
import unicodedata
from hashlib import sha256
from pathlib import Path
from typing import Any, Dict, Iterable, List, Mapping, Optional, Sequence

import numpy as np


# ---------------------------------------------------------------------------
#  Constantes globales
# ---------------------------------------------------------------------------

# Cabeceras HTTP por defecto para las peticiones de descarga de datos.
# Simula un navegador estandar para evitar bloqueos por parte de servidores.
DEFAULT_HEADERS: Dict[str, str] = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "*/*",
}


# ---------------------------------------------------------------------------
#  Gestion de rutas del proyecto
# ---------------------------------------------------------------------------

def _find_repo_root(start_path: Path) -> Path:
    """Busca la raiz del repositorio subiendo por el arbol de directorios.

    Recorre los directorios padre desde ``start_path`` hasta encontrar
    una carpeta que contenga ``.git`` o ``pyproject.toml``, lo cual indica
    que es la raiz del repositorio.

    Args:
        start_path: Directorio desde donde comenzar la busqueda.

    Returns:
        Ruta a la raiz del repositorio. Si no se encuentra ninguna,
        devuelve el propio ``start_path``.
    """
    for parent in [start_path, *start_path.parents]:
        if (parent / ".git").exists() or (parent / "pyproject.toml").exists():
            return parent
    return start_path


def get_repo_root() -> Path:
    """Encuentra la raiz del repositorio desde el directorio de trabajo actual.

    Util para que los notebooks funcionen independientemente de desde
    que carpeta se ejecuten (por ejemplo, desde ``notebooks/`` o desde
    la raiz del proyecto).

    Returns:
        Ruta absoluta a la raiz del proyecto.

    Ejemplo:
        >>> ROOT = get_repo_root()
        >>> data_path = ROOT / "data" / "raw" / "dataset.csv"
    """
    current = Path.cwd().resolve()
    for parent in [current] + list(current.parents):
        if (parent / ".git").exists() or (parent / "pyproject.toml").exists():
            return parent
    return current


# ---------------------------------------------------------------------------
#  Logging de descargas
# ---------------------------------------------------------------------------

def _append_jsonl(path: Path, payload: Mapping[str, Any]) -> None:
    """Anade una entrada al log de descargas en formato JSON Lines.

    Cada linea del archivo es un objeto JSON independiente, lo que permite
    hacer append sin leer el archivo completo. Se usa para registrar
    el historial de descargas de datos externos.

    Args:
        path: Ruta al archivo de log (se crea si no existe).
        payload: Diccionario con los datos a registrar (URL, estado, etc.).
    """
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload, ensure_ascii=False) + "\n")


# ---------------------------------------------------------------------------
#  Descarga de archivos externos
# ---------------------------------------------------------------------------

def download_file(
    url: str,
    out_path: Path,
    headers: Optional[Dict[str, str]] = None,
    retries: int = 3,
    timeout: int = 30,
) -> Path:
    """Descarga un archivo desde una URL con cache, reintentos y logging.

    Si el archivo ya existe en disco (cache), no se vuelve a descargar.
    Cada descarga (exitosa o fallida) se registra en el log de descargas.
    Los archivos ZIP se validan despues de descargar.

    Args:
        url: URL completa del archivo a descargar.
        out_path: Ruta local donde guardar el archivo descargado.
        headers: Cabeceras HTTP adicionales (opcional).
        retries: Numero maximo de reintentos en caso de error (por defecto 3).
        timeout: Tiempo maximo de espera en segundos por peticion (por defecto 30).

    Returns:
        Ruta al archivo descargado (igual que ``out_path``).

    Raises:
        RuntimeError: Si la descarga falla despues de todos los reintentos,
            o si el archivo ZIP descargado esta corrupto.

    Ejemplo:
        >>> path = download_file(
        ...     "https://datos.madrid.es/dataset.zip",
        ...     ROOT / "data" / "external" / "dataset.zip"
        ... )
    """
    import requests

    out_path.parent.mkdir(parents=True, exist_ok=True)
    headers = {**DEFAULT_HEADERS, **(headers or {})}
    repo_root = _find_repo_root(out_path.resolve())
    log_path = repo_root / "reports" / "download_log.jsonl"
    checksum_path = repo_root / "reports" / "download_checksums.csv"

    # --- Cache: si el archivo ya existe y es valido, no lo descargamos ---
    if out_path.exists() and out_path.stat().st_size > 0:
        if out_path.suffix.lower() in {".zip", ".xlsx"}:
            import zipfile

            if not zipfile.is_zipfile(out_path):
                # El archivo cacheado esta corrupto: eliminarlo y re-descargar
                log_entry = {
                    "url": url, "path": str(out_path), "status": "invalid_cached",
                    "bytes": out_path.stat().st_size, "elapsed_s": 0.0,
                    "error": "cached file is not a valid zip",
                }
                _append_jsonl(log_path, log_entry)
                try:
                    out_path.unlink()
                except OSError:
                    pass
            else:
                _append_jsonl(log_path, {
                    "url": url, "path": str(out_path), "status": "cached",
                    "bytes": out_path.stat().st_size, "elapsed_s": 0.0, "error": None,
                })
                return out_path
        else:
            _append_jsonl(log_path, {
                "url": url, "path": str(out_path), "status": "cached",
                "bytes": out_path.stat().st_size, "elapsed_s": 0.0, "error": None,
            })
            return out_path

    # --- Descarga con reintentos ---
    last_error: Optional[str] = None
    for attempt in range(1, retries + 1):
        start = time.time()
        try:
            response = requests.get(url, headers=headers, timeout=timeout, stream=True)
            status = response.status_code
            response.raise_for_status()

            # Escribir a archivo temporal para evitar archivos parciales
            tmp_path = out_path.with_suffix(out_path.suffix + ".tmp")
            with tmp_path.open("wb") as handle:
                for chunk in response.iter_content(chunk_size=1024 * 1024):
                    if chunk:
                        handle.write(chunk)
            tmp_path.replace(out_path)  # Renombrar atomicamente

            # Validar integridad de archivos ZIP
            if out_path.suffix.lower() in {".zip", ".xlsx"}:
                import zipfile
                if not zipfile.is_zipfile(out_path):
                    _append_jsonl(log_path, {
                        "url": url, "path": str(out_path), "status": "invalid_download",
                        "bytes": out_path.stat().st_size,
                        "elapsed_s": round(time.time() - start, 3),
                        "error": "downloaded file is not a valid zip",
                    })
                    try:
                        out_path.unlink()
                    except OSError:
                        pass
                    raise RuntimeError(f"Downloaded file is not a valid zip: {out_path}")

            # Registrar checksum SHA-256 para trazabilidad
            elapsed = time.time() - start
            checksum = sha256(out_path.read_bytes()).hexdigest()
            checksum_path.parent.mkdir(parents=True, exist_ok=True)
            if not checksum_path.exists():
                checksum_path.write_text("path,sha256\n", encoding="utf-8")
            with checksum_path.open("a", encoding="utf-8") as handle:
                handle.write(f"{out_path},{checksum}\n")

            _append_jsonl(log_path, {
                "url": url, "path": str(out_path), "status": status,
                "bytes": out_path.stat().st_size,
                "elapsed_s": round(elapsed, 3), "error": None,
            })
            return out_path

        except Exception as exc:  # noqa: BLE001
            last_error = str(exc)
            elapsed = time.time() - start
            time.sleep(1 + (attempt - 1))  # Espera progresiva entre reintentos
            _append_jsonl(log_path, {
                "url": url, "path": str(out_path), "status": None,
                "bytes": 0, "elapsed_s": round(elapsed, 3), "error": last_error,
            })

    raise RuntimeError(f"Failed to download {url}: {last_error}")


def unzip_if_needed(zip_path: Path, extract_to: Optional[Path] = None) -> Path:
    """Extrae un archivo ZIP en la carpeta destino si es valido.

    Si el archivo no existe, esta vacio o esta corrupto, simplemente
    retorna la carpeta destino sin generar error (para que el pipeline
    pueda continuar con datos parciales).

    Args:
        zip_path: Ruta al archivo ZIP.
        extract_to: Carpeta donde extraer (por defecto, misma ruta sin extension).

    Returns:
        Ruta a la carpeta donde se extrajeron los archivos.
    """
    import zipfile

    extract_to = extract_to or zip_path.with_suffix("")
    extract_to.mkdir(parents=True, exist_ok=True)
    if not zip_path.exists() or zip_path.stat().st_size == 0:
        return extract_to
    if not zipfile.is_zipfile(zip_path):
        repo_root = _find_repo_root(zip_path.resolve())
        log_path = repo_root / "reports" / "download_log.jsonl"
        _append_jsonl(log_path, {
            "url": None, "path": str(zip_path), "status": "invalid_zip",
            "bytes": zip_path.stat().st_size, "elapsed_s": 0.0,
            "error": "File is not a zip file",
        })
        return extract_to
    try:
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(extract_to)
    except zipfile.BadZipFile as exc:
        repo_root = _find_repo_root(zip_path.resolve())
        log_path = repo_root / "reports" / "download_log.jsonl"
        _append_jsonl(log_path, {
            "url": None, "path": str(zip_path), "status": "bad_zip",
            "bytes": zip_path.stat().st_size, "elapsed_s": 0.0, "error": str(exc),
        })
    return extract_to


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
#  Evaluacion de modelos de regresion
# ---------------------------------------------------------------------------

def eval_regression(
    y_true: Sequence[float],
    y_pred: Sequence[float],
    segments: Optional[Dict[str, Iterable[int]]] = None,
) -> Dict[str, float]:
    """Evalua un modelo de regresion con metricas estandar y segmentos opcionales.

    Calcula las tres metricas principales de regresion:
    - **MAE** (Mean Absolute Error): Error medio absoluto en las mismas unidades
      que el target (EUR/mes). Mas interpretable que RMSE.
    - **RMSE** (Root Mean Squared Error): Penaliza mas los errores grandes.
    - **R2** (Coeficiente de determinacion): 1.0 = prediccion perfecta,
      0.0 = tan bueno como predecir la media, <0 = peor que la media.

    Opcionalmente, calcula las mismas metricas para subgrupos (segmentos),
    lo que permite analizar el rendimiento por rangos de precio, distritos, etc.

    Args:
        y_true: Valores reales del target (precios reales).
        y_pred: Valores predichos por el modelo.
        segments: Diccionario con nombre_segmento -> indices de filas.
            Permite evaluar por subgrupos (ejemplo: precios altos vs bajos).

    Returns:
        Diccionario con todas las metricas calculadas.

    Ejemplo:
        >>> metrics = eval_regression(y_real, y_pred)
        >>> print(f"MAE: {metrics['mae']:.0f} EUR")
        MAE: 369 EUR
    """
    from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

    def _ascii_name(value: str) -> str:
        """Normaliza nombres de segmentos eliminando caracteres especiales."""
        text = unicodedata.normalize("NFKD", str(value))
        return "".join(c for c in text if not unicodedata.combining(c))

    y_true_arr = np.asarray(y_true)
    y_pred_arr = np.asarray(y_pred)

    # Calcular RMSE (compatible con versiones antiguas y nuevas de sklearn)
    try:
        rmse = mean_squared_error(y_true_arr, y_pred_arr, squared=False)
    except TypeError:
        rmse = math.sqrt(mean_squared_error(y_true_arr, y_pred_arr))

    metrics = {
        "mae": mean_absolute_error(y_true_arr, y_pred_arr),
        "rmse": rmse,
        "r2": r2_score(y_true_arr, y_pred_arr),
    }

    # Metricas por segmento (opcional)
    if segments:
        for name, idx in segments.items():
            idx_array = np.asarray(list(idx))
            if len(idx_array) < 2:
                continue
            safe_name = _ascii_name(name)
            yt_seg = y_true_arr[idx_array]
            yp_seg = y_pred_arr[idx_array]
            metrics[f"mae_{safe_name}"] = mean_absolute_error(yt_seg, yp_seg)
            try:
                seg_rmse = mean_squared_error(yt_seg, yp_seg, squared=False)
            except TypeError:
                seg_rmse = math.sqrt(mean_squared_error(yt_seg, yp_seg))
            metrics[f"rmse_{safe_name}"] = seg_rmse
            metrics[f"r2_{safe_name}"] = r2_score(yt_seg, yp_seg)
    return metrics


# ---------------------------------------------------------------------------
#  Agregaciones Out-of-Fold (OOF) - Prevencion de data leakage
# ---------------------------------------------------------------------------

def oof_aggregations(
    df,
    group_col: str,
    value_col: str,
    n_splits: int = 5,
    seed: int = 100432070,
) -> np.ndarray:
    """Calcula promedios por grupo usando solo datos del fold de entrenamiento.

    Esta tecnica evita el "data leakage" (filtracion de informacion):
    en lugar de calcular la media global por grupo (que incluiria la propia
    fila), se usa validacion cruzada para que cada fila reciba la media
    calculada SOLO con datos de otros folds.

    Ejemplo practico: para calcular "precio medio por distrito" sin leakage,
    cada vivienda recibe la media de precios de su distrito calculada
    sin incluir su propio precio.

    Args:
        df: DataFrame con las columnas de grupo y valor.
        group_col: Columna de agrupacion (por ejemplo, "district").
        value_col: Columna del valor a agregar (por ejemplo, "price").
        n_splits: Numero de folds para la validacion cruzada (por defecto 5).
        seed: Semilla para reproducibilidad.

    Returns:
        Array con el promedio OOF para cada fila del DataFrame.
    """
    from sklearn.model_selection import KFold

    oof = np.full(len(df), np.nan)  # NaN por defecto (mas seguro que 0.0)
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=seed)
    for train_idx, val_idx in kf.split(df):
        train = df.iloc[train_idx]
        means = train.groupby(group_col)[value_col].mean()
        global_mean = train[value_col].mean()
        # Cada fila del fold de validacion recibe la media de su grupo
        # calculada SOLO con datos del fold de entrenamiento
        oof[val_idx] = df.iloc[val_idx][group_col].map(means).fillna(global_mean).to_numpy()
    return oof


# ---------------------------------------------------------------------------
#  Visualizacion de mapas
# ---------------------------------------------------------------------------

def plot_maps(
    df,
    lat_col: str,
    lon_col: str,
    value_col: Optional[str] = None,
    title: Optional[str] = None,
    use_folium: bool = True,
) -> Any:
    """Genera un mapa interactivo (Folium) o estatico (Matplotlib) de los datos.

    Si Folium esta disponible, crea un mapa web interactivo con zoom,
    click en marcadores y clustering automatico de puntos cercanos.
    Como alternativa, usa Matplotlib para generar un scatter plot estatico.

    Para datasets grandes (>2000 puntos), se muestra una muestra aleatoria
    para mantener un rendimiento fluido.

    Args:
        df: DataFrame con columnas de coordenadas y opcionalmente un valor.
        lat_col: Nombre de la columna de latitud.
        lon_col: Nombre de la columna de longitud.
        value_col: Columna para colorear los puntos (por ejemplo, "price").
        title: Titulo del mapa (opcional).
        use_folium: Si True, intenta usar Folium (por defecto True).

    Returns:
        Objeto Map de Folium (si disponible), o None si usa Matplotlib.
    """
    import importlib.util

    if use_folium and importlib.util.find_spec("folium"):
        import folium
        from folium.plugins import MarkerCluster

        center_lat = df[lat_col].median()
        center_lon = df[lon_col].median()
        m = folium.Map(location=[center_lat, center_lon], zoom_start=12,
                       tiles="CartoDB positron")
        cluster = MarkerCluster()

        # Limitar a 2000 puntos para rendimiento
        sample = df.sample(min(len(df), 2000), random_state=100432070) if len(df) > 2000 else df
        for _, row in sample.iterrows():
            popup = f"{value_col}: {row.get(value_col, '')}" if value_col else ""
            folium.CircleMarker(
                location=[row[lat_col], row[lon_col]],
                radius=3, color="steelblue", fill=True, popup=popup,
            ).add_to(cluster)
        cluster.add_to(m)

        if title:
            folium.map.Marker(
                [center_lat, center_lon],
                icon=folium.DivIcon(html=f"<b>{title}</b>"),
            ).add_to(m)
        return m

    # Fallback: grafico estatico con Matplotlib
    import matplotlib.pyplot as plt

    plt.figure(figsize=(8, 6))
    if value_col and value_col in df.columns:
        plt.scatter(df[lon_col], df[lat_col], c=df[value_col], s=5, cmap="viridis", alpha=0.6)
        plt.colorbar(label=value_col)
    else:
        plt.scatter(df[lon_col], df[lat_col], s=5, alpha=0.6)
    plt.xlabel("lon")
    plt.ylabel("lat")
    if title:
        plt.title(title)
    plt.tight_layout()
    plt.show()
    return None


# ---------------------------------------------------------------------------
#  Parseo de datos INE y GTFS
# ---------------------------------------------------------------------------

def parse_ine_csv_semicolon(path: Path):
    """Lee archivos CSV del INE (Instituto Nacional de Estadistica).

    Los CSV del INE usan punto y coma como separador en lugar de coma.
    Esta funcion los lee correctamente y devuelve un DataFrame.

    Args:
        path: Ruta al archivo CSV del INE.

    Returns:
        DataFrame de pandas con los datos del archivo.
    """
    import pandas as pd
    return pd.read_csv(path, sep=";", dtype=str)


def parse_gtfs(zip_path: Path) -> Dict[str, Any]:
    """Lee un archivo GTFS (General Transit Feed Specification) de transporte.

    GTFS es el formato estandar para datos de transporte publico.
    Los datos vienen en un ZIP con archivos TXT (stops.txt, routes.txt, etc.).

    Args:
        zip_path: Ruta al archivo ZIP de GTFS.

    Returns:
        Diccionario con nombre_archivo -> DataFrame para cada tabla GTFS.
    """
    import zipfile
    import pandas as pd

    data = {}
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        for name in zip_ref.namelist():
            if name.endswith(".txt"):
                with zip_ref.open(name) as handle:
                    data[name] = pd.read_csv(handle, low_memory=False)
    return data


def arcgis_paginated_query(
    base_url: str,
    params: Dict[str, Any],
    batch_size: int = 1000,
    headers: Optional[Dict[str, str]] = None,
) -> List[Dict[str, Any]]:
    """Descarga todos los registros de un servicio ArcGIS REST API con paginacion.

    Los servidores ArcGIS limitan los resultados a lotes (por defecto 1000).
    Esta funcion realiza peticiones sucesivas hasta obtener todos los registros.
    Se usa para descargar datos geoespaciales del Ayuntamiento de Madrid
    (paradas de metro, estaciones BiciMAD, locales, etc.).

    Args:
        base_url: URL del endpoint de consulta del servicio ArcGIS.
        params: Parametros de la consulta (where, outFields, etc.).
        batch_size: Tamano del lote por peticion (por defecto 1000).
        headers: Cabeceras HTTP adicionales (opcional).

    Returns:
        Lista de diccionarios con todos los features descargados.
    """
    import requests

    features = []
    offset = 0
    headers = {**DEFAULT_HEADERS, **(headers or {})}
    while True:
        page_params = dict(params)
        page_params.update({"resultOffset": offset, "resultRecordCount": batch_size})
        response = requests.get(base_url, params=page_params, headers=headers, timeout=30)
        response.raise_for_status()
        payload = response.json()
        batch = payload.get("features", [])
        features.extend(batch)
        if len(batch) < batch_size:
            break  # Ultimo lote: ya no hay mas datos
        offset += batch_size
    return features


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


# ---------------------------------------------------------------------------
#  Agregaciones espacio-temporales avanzadas
# ---------------------------------------------------------------------------

def oof_spatiotemporal_aggregations(
    df,
    group_col: str,
    time_col: str,
    value_col: str,
    window_days: Optional[int] = None,
) -> np.ndarray:
    """Calcula promedios historicos por grupo usando solo datos del pasado.

    A diferencia de una media simple por grupo, esta funcion solo usa
    observaciones ANTERIORES a cada fila para calcular la media. Esto
    evita data leakage temporal (usar informacion del futuro para predecir).

    Opcionalmente, se puede limitar a una ventana temporal (por ejemplo,
    ultimos 90 dias) en lugar de usar todo el historico.

    Args:
        df: DataFrame con columnas de grupo, tiempo y valor.
        group_col: Columna de agrupacion (por ejemplo, "geohash").
        time_col: Columna de fecha/hora para ordenar temporalmente.
        value_col: Columna del valor a agregar (por ejemplo, "price").
        window_days: Si se especifica, solo considera datos de los ultimos
            N dias (ventana movil). Si None, usa media expandida (todo
            el historico disponible).

    Returns:
        Array con la media historica para cada fila del DataFrame.
    """
    import pandas as pd

    df_sorted = df.sort_values(time_col).copy()
    dates = pd.to_datetime(df_sorted[time_col], errors="coerce")

    if window_days and dates.notna().sum() > 0:
        # Ventana temporal movil: solo los ultimos N dias
        result = pd.Series(np.nan, index=df_sorted.index)
        for grp, sub in df_sorted.groupby(group_col, sort=False):
            sub_dates = pd.to_datetime(sub[time_col], errors="coerce")
            vals = sub[value_col].values.astype(float)
            means = np.full(len(sub), np.nan)
            for i in range(len(sub)):
                if pd.isna(sub_dates.iloc[i]):
                    continue
                mask = (sub_dates < sub_dates.iloc[i]) & \
                       (sub_dates >= sub_dates.iloc[i] - pd.Timedelta(days=window_days))
                past = vals[mask.values]
                if len(past) > 0:
                    means[i] = np.nanmean(past)
            result.loc[sub.index] = means
        return result.reindex(df.index).to_numpy()

    # Media expandida: promedio de TODOS los datos anteriores del mismo grupo
    expanding = (
        df_sorted.groupby(group_col, sort=False)[value_col]
        .expanding()
        .mean()
        .shift(1)  # Excluir la propia fila (evitar leakage)
        .reset_index(level=0, drop=True)
    )
    return expanding.reindex(df_sorted.index).reindex(df.index).to_numpy()


# ---------------------------------------------------------------------------
#  Imputacion de valores faltantes (compatible con sklearn Pipeline)
# ---------------------------------------------------------------------------

class DataFrameImputer:
    """Imputador de valores faltantes que preserva los nombres de columnas.

    El SimpleImputer de sklearn devuelve un array NumPy, lo que hace que
    los modelos entrenados con nombres de columnas emitan warnings del tipo
    "X does not have valid feature names". Este wrapper resuelve ese
    problema manteniendo la salida como DataFrame de pandas.

    Se integra con sklearn Pipeline gracias a los metodos ``fit``,
    ``transform``, ``get_params`` y ``set_params``.

    Ejemplo:
        >>> from sklearn.pipeline import Pipeline
        >>> pipe = Pipeline([
        ...     ("imputer", DataFrameImputer(strategy="median")),
        ...     ("model", CatBoostRegressor()),
        ... ])
        >>> pipe.fit(X_train, y_train)

    Args:
        strategy: Estrategia de imputacion. Opciones:
            - "median" (por defecto): Rellena con la mediana (robusto a outliers)
            - "mean": Rellena con la media
            - "most_frequent": Rellena con el valor mas comun
    """

    def __init__(self, strategy: str = "median"):
        from sklearn.impute import SimpleImputer
        self._imp = SimpleImputer(strategy=strategy)
        self._columns: Optional[List[str]] = None

    def fit(self, X, y=None):
        """Aprende las estadisticas de imputacion (medianas, medias, etc.)."""
        import pandas as pd
        if isinstance(X, pd.DataFrame):
            self._columns = list(X.columns)
        self._imp.fit(X)
        self.statistics_ = self._imp.statistics_
        return self

    def transform(self, X):
        """Aplica la imputacion y devuelve un DataFrame con nombres de columna.

        Maneja el caso especial donde SimpleImputer descarta columnas que eran
        100% NaN en fit (su statistics_ contiene NaN para esas columnas).
        """
        import pandas as pd
        result = self._imp.transform(X)
        if self._columns is not None:
            out_cols = self._columns
            # SimpleImputer puede descartar columnas all-NaN, causando shape mismatch
            if result.shape[1] != len(self._columns) and hasattr(self._imp, "statistics_"):
                kept_mask = ~np.isnan(self._imp.statistics_)
                out_cols = [c for c, keep in zip(self._columns, kept_mask) if keep]
            return pd.DataFrame(result, columns=out_cols,
                                index=X.index if hasattr(X, "index") else None)
        return result

    def fit_transform(self, X, y=None):
        """Aprende las estadisticas y aplica la imputacion en un solo paso."""
        return self.fit(X, y).transform(X)

    def get_params(self, deep=True):
        """Devuelve los parametros del imputador (compatible con sklearn)."""
        return {"strategy": self._imp.strategy}

    def set_params(self, **params):
        """Establece los parametros del imputador (compatible con sklearn)."""
        if "strategy" in params:
            from sklearn.impute import SimpleImputer
            self._imp = SimpleImputer(strategy=params["strategy"])
        return self


# ---------------------------------------------------------------------------
#  Wrapper de CatBoost compatible con sklearn
# ---------------------------------------------------------------------------

try:
    from catboost import CatBoostRegressor as _CatBoostRegressor
    from sklearn.base import BaseEstimator, RegressorMixin

    class CatBoostSklearnWrapper(BaseEstimator, RegressorMixin):
        """Envuelve CatBoost para hacerlo 100% compatible con sklearn Pipeline.

        CatBoost <1.3 no implementa ``__sklearn_tags__``, lo que causa errores
        con sklearn >=1.6 al usarlo dentro de Pipeline, GridSearchCV, etc.
        Este wrapper expone la interfaz estandar de sklearn (fit, predict,
        get_params, set_params) delegando las operaciones a CatBoost.

        Los hiperparametros se exponen como atributos para que
        RandomizedSearchCV pueda explorarlos automaticamente.

        Args:
            iterations: Numero de arboles a entrenar (mas = mejor pero mas lento).
            depth: Profundidad maxima de cada arbol (controla complejidad).
            learning_rate: Tasa de aprendizaje (mas bajo = mas conservador).
            l2_leaf_reg: Regularizacion L2 (previene overfitting).
            random_seed: Semilla para reproducibilidad.
            loss_function: Funcion de perdida ("MAE" para error absoluto).
            verbose: Si True, muestra progreso durante el entrenamiento.
        """

        def __init__(self, iterations=300, depth=6, learning_rate=0.1,
                     l2_leaf_reg=3, random_seed=100432070, loss_function="MAE",
                     verbose=False):
            self.iterations = iterations
            self.depth = depth
            self.learning_rate = learning_rate
            self.l2_leaf_reg = l2_leaf_reg
            self.random_seed = random_seed
            self.loss_function = loss_function
            self.verbose = verbose

        def _make_cb(self):
            """Crea una instancia limpia de CatBoostRegressor con los params actuales."""
            return _CatBoostRegressor(
                iterations=self.iterations, depth=self.depth,
                learning_rate=self.learning_rate,
                l2_leaf_reg=self.l2_leaf_reg,
                random_seed=self.random_seed,
                loss_function=self.loss_function,
                verbose=self.verbose,
            )

        def fit(self, X, y, **kw):
            """Entrena el modelo CatBoost con los datos proporcionados."""
            import pandas as pd
            self._model = self._make_cb()
            self._model.fit(X, y, **kw)
            self.is_fitted_ = True
            # Guardar feature_names_in_ para compatibilidad con sklearn >=1.6
            if isinstance(X, pd.DataFrame):
                self.feature_names_in_ = np.array(X.columns.tolist())
            return self

        def predict(self, X):
            """Genera predicciones para los datos de entrada."""
            from sklearn.utils.validation import check_is_fitted
            check_is_fitted(self)
            return self._model.predict(X)

        @property
        def feature_importances_(self):
            """Importancia de cada feature segun el modelo entrenado."""
            return self._model.get_feature_importance()

        @property
        def feature_names_(self):
            """Nombres de las features usadas en el entrenamiento."""
            return self._model.feature_names_

except ImportError:
    # Si CatBoost no esta instalado, el wrapper no estara disponible.
    # Los notebooks usaran el fallback (LightGBM, XGBoost o HistGBR).
    CatBoostSklearnWrapper = None  # type: ignore[assignment,misc]


# ---------------------------------------------------------------------------
#  Construccion del pipeline de boosting
# ---------------------------------------------------------------------------

def make_boosting_pipeline(seed: int = 100432070):
    """Construye el mejor pipeline de gradient boosting disponible.

    Intenta usar las librerias en este orden de prioridad:
    1. **CatBoost** - Mejor rendimiento con datos categoricos
    2. **LightGBM** - Rapido y eficiente en memoria
    3. **XGBoost** - El clasico, bien probado
    4. **HistGradientBoosting (sklearn)** - Siempre disponible como fallback

    Cada pipeline incluye un imputador de medianas (DataFrameImputer) para
    manejar valores faltantes automaticamente.

    Args:
        seed: Semilla para reproducibilidad (por defecto 42).

    Returns:
        Tupla con tres elementos:
        - ``build_fn``: Funcion que crea una nueva instancia del pipeline.
        - ``param_distributions``: Diccionario de hiperparametros para
          busqueda aleatoria (RandomizedSearchCV).
        - ``engine_name``: Nombre del motor seleccionado (str).

    Ejemplo:
        >>> build_fn, params, engine = make_boosting_pipeline(seed=42)
        >>> print(f"Motor: {engine}")
        Motor: catboost
        >>> pipeline = build_fn()
        >>> pipeline.fit(X_train, y_train)
    """
    from sklearn.pipeline import Pipeline
    import importlib.util

    def _try(build_fn):
        """Verifica que el pipeline se puede crear, entrenar y predecir."""
        try:
            import pandas as pd
            m = build_fn()
            _X = pd.DataFrame({"a": [1.0, 2.0, 3.0], "b": [4.0, 5.0, 6.0]})
            m.fit(_X, pd.Series([10.0, 20.0, 30.0]))
            m.predict(_X)
            return True
        except Exception:
            return False

    # --- Opcion 1: CatBoost (mejor para datos con categoricas) ---
    if CatBoostSklearnWrapper is not None:
        def _build_cb():
            return Pipeline([
                ("imputer", DataFrameImputer(strategy="median")),
                ("model", CatBoostSklearnWrapper(random_seed=seed)),
            ])
        if _try(_build_cb):
            params = {
                "model__iterations": [200, 300, 500],
                "model__depth": [4, 6, 8],
                "model__learning_rate": [0.03, 0.05, 0.1],
                "model__l2_leaf_reg": [1, 3, 5, 10],
            }
            return _build_cb, params, "catboost"

    # --- Opcion 2: LightGBM (rapido, eficiente en memoria) ---
    if importlib.util.find_spec("lightgbm"):
        from lightgbm import LGBMRegressor

        def _build_lgbm():
            return Pipeline([
                ("imputer", DataFrameImputer(strategy="median")),
                ("model", LGBMRegressor(n_estimators=300, learning_rate=0.05,
                                        random_state=seed, verbose=-1)),
            ])
        if _try(_build_lgbm):
            params = {
                "model__n_estimators": [200, 300, 500],
                "model__learning_rate": [0.03, 0.05, 0.1],
                "model__num_leaves": [15, 31, 63],
                "model__reg_lambda": [0, 1, 5, 10],
            }
            return _build_lgbm, params, "lightgbm"

    # --- Opcion 3: XGBoost (clasico, bien probado) ---
    if importlib.util.find_spec("xgboost"):
        from xgboost import XGBRegressor

        def _build_xgb():
            return Pipeline([
                ("imputer", DataFrameImputer(strategy="median")),
                ("model", XGBRegressor(n_estimators=300, learning_rate=0.05,
                                       random_state=seed)),
            ])
        if _try(_build_xgb):
            params = {
                "model__n_estimators": [200, 300, 500],
                "model__learning_rate": [0.03, 0.05, 0.1],
                "model__max_depth": [4, 6, 8],
                "model__reg_lambda": [0, 1, 5, 10],
            }
            return _build_xgb, params, "xgboost"

    # --- Opcion 4: Fallback - HistGradientBoosting de sklearn ---
    from sklearn.ensemble import HistGradientBoostingRegressor

    def _build_hist():
        return Pipeline([
            ("imputer", DataFrameImputer(strategy="median")),
            ("model", HistGradientBoostingRegressor(random_state=seed)),
        ])

    params = {
        "model__max_iter": [100, 200, 300],
        "model__learning_rate": [0.03, 0.05, 0.1],
        "model__max_depth": [4, 6, 8, None],
        "model__l2_regularization": [0, 1, 5, 10],
    }
    return _build_hist, params, "histgbr"


# ---------------------------------------------------------------------------
#  Utilidades para modelos entrenados
# ---------------------------------------------------------------------------

def get_model_feature_names(model) -> Optional[List[str]]:
    """Extrae los nombres de features de un modelo entrenado.

    Funciona con cualquier tipo de modelo (CatBoost, LightGBM, XGBoost,
    sklearn) y con Pipelines que contienen un modelo como paso final.

    Args:
        model: Modelo entrenado o Pipeline de sklearn.

    Returns:
        Lista de nombres de features, o None si no se pueden obtener.
    """
    # Buscar directamente en el modelo
    for attr in ("feature_names_in_", "feature_names_"):
        if hasattr(model, attr):
            return list(getattr(model, attr))
    # Buscar dentro del Pipeline (en el paso "model")
    if hasattr(model, "named_steps"):
        inner = model.named_steps.get("model")
        if inner:
            for attr in ("feature_names_in_", "feature_names_"):
                if hasattr(inner, attr):
                    return list(getattr(inner, attr))
    return None


def align_X_to_model(X, model):
    """Alinea las columnas de X con las que espera el modelo.

    Asegura que X tenga exactamente las mismas columnas que el modelo
    espera, en el mismo orden. Si faltan columnas, las rellena con 0.
    Si hay columnas extra, las elimina.

    Esto es necesario porque el modelo fue entrenado con un conjunto
    especifico de features, y al predecir debemos proporcionar
    exactamente las mismas columnas.

    Args:
        X: DataFrame con los datos de entrada.
        model: Modelo entrenado (o Pipeline) con feature_names guardados.

    Returns:
        DataFrame alineado con las columnas del modelo. No modifica
        el DataFrame original (trabaja sobre una copia).

    Ejemplo:
        >>> X_aligned = align_X_to_model(X_test, modelo_entrenado)
        >>> predicciones = modelo_entrenado.predict(X_aligned)
    """
    import pandas as pd
    features = get_model_feature_names(model)
    if features is None:
        return X
    X = X.copy()
    for col in features:
        if col not in X.columns:
            X[col] = 0  # Rellenar columnas faltantes con 0
    return X[features]  # Seleccionar y reordenar solo las columnas esperadas


# ---------------------------------------------------------------------------
#  Creacion de snapshots para simulacion de produccion
# ---------------------------------------------------------------------------

def make_snapshot_features(
    df,
    cutoff_date,
    date_col: str,
    group_col: Optional[str] = None,
    value_col: Optional[str] = None,
    window_days: Optional[int] = None,
):
    """Crea un snapshot del dataset hasta una fecha de corte, con agregaciones.

    Simula el escenario de produccion: "que datos tendriamos disponibles
    si estuvieramos en la fecha X?". Solo incluye filas anteriores o iguales
    a ``cutoff_date``.

    Si se especifican ``group_col`` y ``value_col``, tambien calcula
    agregaciones espacio-temporales (media por grupo usando solo datos
    del pasado), que se almacenan en la columna ``_snap_agg``.

    Args:
        df: DataFrame completo con datos historicos.
        cutoff_date: Fecha limite para el snapshot.
        date_col: Nombre de la columna de fecha.
        group_col: Columna de agrupacion para agregaciones (opcional).
        value_col: Columna de valor para agregaciones (opcional).
        window_days: Ventana temporal para las agregaciones (opcional).

    Returns:
        DataFrame filtrado hasta la fecha de corte, con columna
        ``_snap_agg`` si se solicitaron agregaciones.
    """
    import pandas as pd

    df = df.copy()
    df[date_col] = pd.to_datetime(df[date_col], errors="coerce")
    snap = df.loc[df[date_col] <= cutoff_date].copy()
    if group_col and value_col and group_col in snap.columns and value_col in snap.columns:
        snap["_snap_agg"] = oof_spatiotemporal_aggregations(
            snap, group_col, date_col, value_col, window_days=window_days,
        )
    return snap


# ---------------------------------------------------------------------------
#  Validacion de price_m2
# ---------------------------------------------------------------------------

def validate_price_m2(
    df,
    price_col: str = "price",
    surface_col: str = "surface_m2",
    price_m2_col: str = "price_m2",
    min_price_m2: float = 3.0,
    max_price_m2: float = 150.0,
) -> "pd.Series":
    """Valida price_m2: rango, finitud y consistencia con price/surface.

    Reglas aplicadas:
      - price_m2 debe ser finito y no nulo.
      - price_m2 debe estar en [min_price_m2, max_price_m2].
      - Si price y surface_m2 existen, la diferencia entre price_m2
        y (price / surface_m2) debe ser < 0.01 (tolerancia por redondeo).

    Args:
        df: DataFrame con las columnas de precio.
        price_col: Columna de precio absoluto (EUR/mes).
        surface_col: Columna de superficie (m2).
        price_m2_col: Columna de precio por metro cuadrado.
        min_price_m2: Limite inferior aceptable (EUR/m2).
        max_price_m2: Limite superior aceptable (EUR/m2).

    Returns:
        Serie booleana (True = fila valida, False = outlier/inconsistente).
    """
    import pandas as pd

    pm2 = df[price_m2_col]
    valid = pm2.notna() & np.isfinite(pm2) & (pm2 >= min_price_m2) & (pm2 <= max_price_m2)
    if price_col in df.columns and surface_col in df.columns:
        surface_safe = df[surface_col].replace(0, np.nan)
        derived = df[price_col] / surface_safe
        diff = (pm2 - derived).abs()
        # Si derived es NaN (surface=0), no podemos chequear consistencia → OK
        consistent = (diff < 0.01) | diff.isna()
        valid = valid & consistent
    return valid


# ---------------------------------------------------------------------------
#  Features espaciales de VUT (Viviendas de Uso Turistico)
# ---------------------------------------------------------------------------

def compute_vut_features(
    listings_df,
    vut_df,
    lat_col: str = "lat",
    lon_col: str = "lng",
    vut_lat_col: str = "lat",
    vut_lon_col: str = "lng",
    radius_km: float = 1.0,
) -> "pd.DataFrame":
    """Calcula features espaciales de VUT para cada anuncio de alquiler.

    Usa BallTree con metrica haversine para eficiencia O(n log m).
    Genera tres features:
      - vut_count_{radius}km: numero de VUT en el radio especificado.
      - vut_density_{radius}km: VUT por km2 en ese radio.
      - vut_distance_nearest: distancia al VUT mas cercano (metros).

    Args:
        listings_df: DataFrame de anuncios con columnas lat/lon.
        vut_df: DataFrame de VUT con columnas lat/lon.
        lat_col, lon_col: Nombres de columnas de coordenadas en listings.
        vut_lat_col, vut_lon_col: Nombres de columnas de coordenadas en VUT.
        radius_km: Radio de busqueda en kilometros (por defecto 1.0).

    Returns:
        DataFrame con columnas vut_count_Xkm, vut_density_Xkm,
        vut_distance_nearest alineado al indice de listings_df.
    """
    import pandas as pd
    from sklearn.neighbors import BallTree

    EARTH_RADIUS_KM = 6371.0
    r_str = str(radius_km).replace(".", "_")
    col_count = f"vut_count_{r_str}km"
    col_density = f"vut_density_{r_str}km"
    col_dist = "vut_distance_nearest"

    result = pd.DataFrame(index=listings_df.index)
    result[col_count] = np.nan
    result[col_density] = np.nan
    result[col_dist] = np.nan

    # Filtrar VUT con coordenadas validas
    vut_valid = vut_df.dropna(subset=[vut_lat_col, vut_lon_col])
    if vut_valid.empty:
        return result

    listings_valid_mask = (
        listings_df[[lat_col, lon_col]].notna().all(axis=1)
        & np.isfinite(listings_df[lat_col])
        & np.isfinite(listings_df[lon_col])
    )
    if not listings_valid_mask.any():
        return result

    vut_rad = np.radians(vut_valid[[vut_lat_col, vut_lon_col]].values.astype(float))
    tree = BallTree(vut_rad, metric="haversine")

    listings_rad = np.radians(
        listings_df.loc[listings_valid_mask, [lat_col, lon_col]].values.astype(float)
    )

    # Conteo en radio
    counts = tree.query_radius(
        listings_rad, r=radius_km / EARTH_RADIUS_KM, count_only=True
    )
    area_km2 = math.pi * radius_km ** 2

    # Distancia al mas cercano
    dist, _ = tree.query(listings_rad, k=1)
    dist_m = dist.ravel() * EARTH_RADIUS_KM * 1000.0  # km → metros

    result.loc[listings_valid_mask, col_count] = counts.astype(float)
    result.loc[listings_valid_mask, col_density] = counts.astype(float) / area_km2
    result.loc[listings_valid_mask, col_dist] = dist_m

    return result


# ---------------------------------------------------------------------------
#  Carga de modelos con compatibilidad legacy / dual-target
# ---------------------------------------------------------------------------

def load_model(
    model_path: "Path | str",
    target: str = "price",
) -> dict:
    """Carga un modelo desde joblib con compatibilidad legacy y dual-target.

    Formatos soportados:
      - Legacy (NB05 original): dict con clave 'model' directa.
      - Dual-target (refactor): dict con claves 'price' y 'price_m2',
        cada una conteniendo sub-dict con 'model', 'feature_names', etc.

    Args:
        model_path: Ruta al fichero .joblib.
        target: Target deseado ('price' o 'price_m2').

    Returns:
        Dict con claves 'model', 'feature_names', y metadata.
        Siempre devuelve la misma estructura independientemente del formato.

    Raises:
        FileNotFoundError: Si el fichero no existe.
        KeyError: Si el target solicitado no esta en el artefacto.
    """
    import joblib
    from pathlib import Path

    model_path = Path(model_path)
    if not model_path.exists():
        raise FileNotFoundError(f"Modelo no encontrado: {model_path}")

    raw = joblib.load(model_path)

    # Formato dual-target: {"price": {...}, "price_m2": {...}, "metadata": {...}}
    if target in raw and isinstance(raw[target], dict) and "model" in raw[target]:
        payload = dict(raw[target])  # copia shallow
        if "metadata" in raw:
            payload["metadata"] = raw["metadata"]
        return payload

    # Formato legacy: {"model": pipeline, "feature_names": [...], ...}
    if "model" in raw:
        return raw

    # Formato modelo directo (sin envolver)
    return {"model": raw}


# ---------------------------------------------------------------------------
#  Constantes de targets y columnas de leakage
# ---------------------------------------------------------------------------

TARGET_COLS = {"price", "price_m2"}
DERIVED_FROM_TARGET = {
    "log_price", "log_price_m2", "price_per_room",
}
ID_COLS = {"web_id", "postalcode", "id", "url", "listing_fingerprint"}


def get_feature_cols(
    df_or_columns,
    exclude_extra: Optional[Iterable[str]] = None,
    numeric_only: bool = False,
) -> List[str]:
    """Selecciona columnas validas excluyendo targets, derivadas e IDs.

    Usa exclusion explicita (TARGET_COLS + DERIVED_FROM_TARGET + ID_COLS)
    como barrera principal, y regex 'price' como cinturon de seguridad.

    Args:
        df_or_columns: DataFrame o lista/Index de columnas. Si se pasa un
            DataFrame y ``numeric_only=True``, se filtran columnas no numericas.
        exclude_extra: Columnas adicionales a excluir (opcional).
        numeric_only: Si True, solo devuelve columnas numericas (requiere
            DataFrame como primer argumento).

    Returns:
        Lista de nombres de columnas seguras para usar como features.
    """
    import pandas as pd

    if isinstance(df_or_columns, pd.DataFrame):
        df = df_or_columns
        df_columns = df.columns
    else:
        df = None
        df_columns = df_or_columns

    exclude = TARGET_COLS | DERIVED_FROM_TARGET | ID_COLS
    if exclude_extra:
        exclude = exclude | set(exclude_extra)

    cols = []
    for c in df_columns:
        if c in exclude:
            continue
        # Cinturon de seguridad: regex para derivados no listados
        if "price" in c.lower():
            continue
        # Filtro de tipo: solo numericas si se solicita
        if numeric_only and df is not None:
            if not pd.api.types.is_numeric_dtype(df[c]):
                continue
        cols.append(c)
    return cols
