## Resumen de trazabilidad

Proyecto de desarrollo de sistema de IA basado en alquileres de pisos
Este proyecto se centra en la exploracion, limpieza y preparacion de datos de alquileres en la provincia de Madrid. Se aplican tecnicas de analisis exploratorio (EDA), tratamiento de valores atipicos y nulos, y preprocesamiento para la posterior construccion de modelos de regresion y clasificacion con Scikit-learn siguendo la metodologia CRISP-DM para garantizar un flujo estructurado.
Importacion de bibliotecas y configuracion inicial

Contexto del origen:
- Fuente base referenciada en Kaggle (dataset de alquileres Madrid).
- Geolocalizacion completada con script externo y Google Maps API (segun trazabilidad).
- Script de geolocalizacion mencionado: madrid_rent_geolocation.py.

Supuestos y riesgos:
- Posibles duplicados entre fuentes; se deduplica por id/fingerprint.
- Temporalidad sin año; se asume 2025 para ordenar y se documenta la limitacion.
- Coordenadas/superficie pueden contener errores; se aplican filtros y parseo robusto.

Implicaciones para limpieza/validacion:
- Filtrado geografico por bbox/radio y percentiles.
- Preprocesado solo con train via Pipeline/ColumnTransformer.
