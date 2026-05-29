"""build_data_dictionary.py - Genera el diccionario de datos del proyecto.

Lee ``artifacts/features_master.parquet`` (dataset maestro, 70 columnas) y produce
``artifacts/data_dictionary.csv`` con, por cada columna:

    columna, dtype, pct_no_nulo, n_unicos, ejemplo, descripcion, unidad, fuente

Los metadatos objetivos (dtype, cobertura, cardinalidad, ejemplo) se calculan
automaticamente. Las descripciones/unidades/fuentes provienen de un diccionario
curado (``DESCRIPTIONS``) construido a partir de:
  - la documentacion de generacion del dataset base (Idealista),
  - artifacts/selected_features.json (features finales),
  - la tabla de fuentes del README.

Uso:
    python src/build_data_dictionary.py
"""

from __future__ import annotations

from pathlib import Path

import pandas as pd


def _find_repo_root(start: Path) -> Path:
    for parent in [start, *start.parents]:
        if (parent / ".git").exists() or (parent / "artifacts").exists():
            return parent
    return start


ROOT = _find_repo_root(Path(__file__).resolve())
MASTER = ROOT / "artifacts" / "features_master.parquet"
OUT = ROOT / "artifacts" / "data_dictionary.csv"


# (descripcion, unidad, fuente)  -- clave = nombre exacto de la columna
DESCRIPTIONS: dict[str, tuple[str, str, str]] = {
    # --- Identificadores y metadatos del anuncio (Idealista) ---
    "web_id": ("Identificador unico del anuncio en Idealista", "-", "Idealista"),
    "url": ("Enlace al anuncio original", "-", "Idealista"),
    "title": ("Titulo libre del anuncio", "-", "Idealista"),
    "type": ("Tipo de inmueble (Flat, Studio, Penthouse, Duplex, House...)", "-", "Idealista"),
    "professional_name": ("Nombre de la agencia/profesional anunciante", "-", "Idealista"),
    "private_owner": ("Anunciante particular (no profesional)", "bool", "Idealista"),
    "location": ("Ubicacion textual (calle, subdistrito, distrito)", "-", "Idealista"),
    "district": ("Distrito declarado en el anuncio", "-", "Idealista"),
    "subdistrict": ("Subdistrito/barrio declarado en el anuncio", "-", "Idealista"),
    "postalcode": ("Codigo postal", "-", "Idealista"),
    "last_update": ("Fecha de ultima actualizacion del anuncio (dia/mes, sin anio)", "fecha", "Idealista"),

    # --- Targets ---
    "price": ("TARGET principal: alquiler mensual", "EUR/mes", "Idealista"),
    "price_m2": ("TARGET secundario: alquiler por superficie", "EUR/m2", "Derivada (price/surface_m2)"),

    # --- Caracteristicas estructurales (Idealista) ---
    "deposit": ("Fianza exigida (en mensualidades)", "mensualidades", "Idealista"),
    "floor_built": ("Superficie construida", "m2", "Idealista"),
    "floor_area": ("Superficie util/habitable", "m2", "Idealista"),
    "floor": ("Planta del inmueble (saneada a numerica; ground=0)", "planta", "Idealista"),
    "year_built": ("Anio de construccion", "anio", "Idealista"),
    "orientation": ("Orientacion (east/south/west/north)", "-", "Idealista"),
    "bedrooms": ("Numero de dormitorios", "uds", "Idealista"),
    "bathrooms": ("Numero de banios", "uds", "Idealista"),
    "second_hand": ("Inmueble de segunda mano", "bool", "Idealista"),
    "lift": ("Dispone de ascensor", "bool", "Idealista"),
    "garage_included": ("Garaje incluido", "bool", "Idealista"),
    "furnished": ("Amueblado", "bool", "Idealista"),
    "equipped_kitchen": ("Cocina equipada", "bool", "Idealista"),
    "fitted_wardrobes": ("Armarios empotrados", "bool", "Idealista"),
    "air_conditioning": ("Aire acondicionado", "bool", "Idealista"),
    "terrace": ("Terraza", "bool", "Idealista"),
    "balcony": ("Balcon", "bool", "Idealista"),
    "storeroom": ("Trastero", "bool", "Idealista"),
    "swimming_pool": ("Piscina", "bool", "Idealista"),
    "garden_area": ("Zona ajardinada", "bool", "Idealista"),

    # --- Geolocalizacion y features espaciales derivadas (NB01/NB03) ---
    "lat": ("Latitud (grados decimales, WGS84)", "grados", "Idealista + geocodificacion"),
    "lng": ("Longitud (grados decimales, WGS84)", "grados", "Idealista + geocodificacion"),
    "surface_m2": ("Superficie consolidada usada como feature", "m2", "Derivada (floor_area/floor_built)"),
    "surface_is_built": ("La superficie proviene de superficie construida (no util)", "bool", "Derivada"),
    "distance_center_km": ("Distancia a Puerta del Sol", "km", "Derivada (haversine)"),
    "geohash_6": ("Celda espacial r7 (nombre historico 'geohash_6'; en realidad H3 r7 via spatial_group)", "celda", "Derivada (H3)"),
    "h3_cell": ("Celda H3 resolucion 7 (duplicado conceptual de geohash_6)", "celda", "Derivada (H3)"),
    "log_price": ("Logaritmo natural de price", "log(EUR)", "Derivada"),
    "log_price_m2": ("Logaritmo natural de price_m2", "log(EUR/m2)", "Derivada"),
    "log_surface_m2": ("Logaritmo natural de surface_m2", "log(m2)", "Derivada"),
    "density_1km": ("Densidad de anuncios en radio de 1 km", "anuncios/km2", "Derivada"),
    "barrio_join": ("Clave de union normalizada con shapefile de barrios", "-", "Derivada"),
    "distrito_join": ("Clave de union normalizada con shapefile de distritos", "-", "Derivada"),
    "district_norm": ("Nombre de distrito normalizado", "-", "Derivada"),

    # --- Movilidad (OSM / GTFS) ---
    "dist_metro_m": ("Distancia a la boca de Metro mas cercana", "m", "OpenStreetMap"),
    "emt_density_500m": ("Numero de paradas EMT en 500 m", "paradas", "GTFS EMT"),
    "dist_bicimad_m": ("Distancia a la estacion BiciMAD mas cercana", "m", "BiciMAD (OSM)"),
    "bicimad_density_1km": ("Densidad de estaciones BiciMAD en 1 km", "estaciones/km2", "BiciMAD (OSM)"),

    # --- INE (Censo 2021, por seccion censal) ---
    "ine_renta_persona": ("Renta media por persona", "EUR/anio", "INE - Censo 2021"),
    "ine_edad_media": ("Edad media de la poblacion", "anios", "INE - Censo 2021"),
    "ine_tamano_hogar": ("Tamanio medio del hogar", "personas", "INE - Censo 2021"),
    "ine_pct_unipersonal": ("Porcentaje de hogares unipersonales", "%", "INE - Censo 2021"),

    # --- Medio ambiente (Ayto. Madrid) ---
    "green_area_m2": ("Superficie de zonas verdes cercanas", "m2", "Ayto. Madrid"),
    "air_no2_nearest": ("NO2 en la estacion de calidad del aire mas cercana", "ug/m3", "Ayto. Madrid"),
    "noise_ld_db": ("Nivel de ruido diurno (Ld) interpolado del mapa MER 2021", "dB", "Ayto. Madrid (GeoTIFF)"),

    # --- Urbano (Ayto. Madrid) ---
    "licencias_density_1km": ("Densidad de licencias urbanisticas en 1 km", "licencias/km2", "Ayto. Madrid"),
    "terrace_density_1km": ("Densidad de terrazas de hosteleria en 1 km", "terrazas/km2", "Ayto. Madrid"),
    "locales_density_1km": ("Densidad de locales comerciales en 1 km", "locales/km2", "Ayto. Madrid"),

    # --- Viviendas de Uso Turistico (VUT) ---
    "vut_count_1_0km": ("Numero de VUT en radio de 1 km", "VUT", "Catastro / Ayto. Madrid"),
    "vut_density_1_0km": ("Densidad de VUT en 1 km", "VUT/km2", "Catastro / Ayto. Madrid"),
    "vut_distance_nearest": ("Distancia a la VUT mas cercana", "m", "Catastro / Ayto. Madrid"),
    "vut_count_district": ("Numero de VUT en el distrito", "VUT", "Catastro / Ayto. Madrid"),
}


def _describe(col: str) -> tuple[str, str, str]:
    """Devuelve (descripcion, unidad, fuente) para una columna."""
    if col in DESCRIPTIONS:
        return DESCRIPTIONS[col]
    # Equipamientos por seccion censal (nombres con acentos variables)
    if col.startswith("Asociaciones") or col.startswith("Campos de"):
        return (f"Equipamiento de barrio: '{col}' (conteo por zona)", "uds", "Ayto. Madrid")
    return ("(sin descripcion curada)", "-", "-")


def _example(series: pd.Series) -> str:
    non_null = series.dropna()
    if non_null.empty:
        return ""
    val = non_null.iloc[0]
    if isinstance(val, float):
        return f"{val:.4g}"
    return str(val)[:60]


def main() -> None:
    if not MASTER.exists():
        raise FileNotFoundError(
            f"No se encuentra {MASTER}. Ejecuta antes NB03 (features_core)."
        )
    df = pd.read_parquet(MASTER)
    n = len(df)

    rows = []
    for col in df.columns:
        desc, unit, source = _describe(col)
        rows.append({
            "columna": col,
            "dtype": str(df[col].dtype),
            "pct_no_nulo": round(100.0 * df[col].notna().sum() / n, 2),
            "n_unicos": int(df[col].nunique(dropna=True)),
            "ejemplo": _example(df[col]),
            "descripcion": desc,
            "unidad": unit,
            "fuente": source,
        })

    out_df = pd.DataFrame(rows, columns=[
        "columna", "dtype", "pct_no_nulo", "n_unicos", "ejemplo",
        "descripcion", "unidad", "fuente",
    ])
    out_df.to_csv(OUT, index=False, encoding="utf-8-sig")

    n_sin_desc = (out_df["descripcion"] == "(sin descripcion curada)").sum()
    print(f"Diccionario generado: {OUT}")
    print(f"  {len(out_df)} columnas | {n} filas en el dataset")
    print(f"  Columnas sin descripcion curada: {n_sin_desc}")


if __name__ == "__main__":
    main()
