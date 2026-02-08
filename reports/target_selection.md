# Seleccion de target

- Columna precio mensual candidata: price
- Columna superficie candidata: floor_area
- Columna precio m2 candidata: derived_from_price_surface

- Se derivo price_m2 desde precio mensual y superficie.

## Diferenciacion precio/mes vs precio/m2

- Filas con patron euros/m2 (m2, m^2, /m): 0
- Filas con patron euros/mes (mes, month): 0
- Filas sin indicador de unidad (numerico puro): 9229
- No se detectaron strings tipo m2 en la columna de precio.
- Conclusion: Se asume que price representa euros/mes (alquiler mensual).
  price_m2 se calcula como price / surface_m2 para analisis por m2.

## Estadisticas rapidas price
- count: 9229.0
- mean: 1937.9958825441543
- std: 1615.0633075556534
- min: 400.0
- 10%: 800.0
- 50%: 1400.0
- 90%: 3500.0
- max: 25000.0
