## Feature Selection Report

**Metodos**: SelectKBest (f_regression) + SHAP TreeExplainer + Permutation noise probe

**Seed**: 100432070

**Umbrales probados**: leve (1/3, p<0.05, SHAP>=1%), moderado (2/3, p<0.05, SHAP>=1%), agresivo (3/3, p<0.01, SHAP>=5%)


### Comparativa de umbrales

| Target | Umbral | Features | MAE | Delta | Accion |
|--------|--------|:--------:|----:|------:|--------|
| price | (todas) | 49 | 301.31 | baseline | --- |
| | leve | 47 | 345.49 | +14.7% | peor |
| | moderado | 42 | 349.85 | +16.1% | peor |
| | agresivo | 24 | 365.30 | +21.2% | peor |
| price_m2 | (todas) | 49 | 3.17 | baseline | --- |
| | leve | 49 | 3.17 | +0.0% | no_change |
| | moderado | 46 | 3.27 | +3.3% | peor |
| | agresivo | 39 | 3.27 | +3.2% | peor |


### Target: price

- Features originales: 49
- Features seleccionadas (umbral final): 24
- Features excluidas: 25
- Metodo: consensus_3_of_3

#### Features excluidas

| Feature | Razon |
|---------|-------|
| `deposit` | SKB p=0.028; Perm=-0.0044<=noise=0.0034 |
| `private_owner` | SHAP=35.8672<41.8893; Perm=0.0002<=noise=0.0034 |
| `year_built` | SKB p=0.015 |
| `second_hand` | SKB p=0.026; SHAP=1.3745<41.8893; Perm=0.0000<=noise=0.0034 |
| `lift` | SHAP=17.7318<41.8893 |
| `garage_included` | Perm=0.0024<=noise=0.0034 |
| `furnished` | SKB p=0.430; SHAP=19.6131<41.8893; Perm=-0.0015<=noise=0.0034 |
| `equipped_kitchen` | SKB p=0.430; SHAP=13.8571<41.8893; Perm=-0.0019<=noise=0.0034 |
| `air_conditioning` | Perm=0.0004<=noise=0.0034 |
| `storeroom` | Perm=-0.0021<=noise=0.0034 |
| `garden_area` | SKB p=1.000; SHAP=0.0000<41.8893; Perm=0.0000<=noise=0.0034 |
| `surface_is_built` | Perm=0.0011<=noise=0.0034 |
| `dist_metro_m` | SKB p=0.330 |
| `dist_bicimad_m` | SKB p=0.016; Perm=-0.0080<=noise=0.0034 |
| `Asociaciones (sección 1ª)` | SKB p=0.774; Perm=0.0014<=noise=0.0034 |
| `Asociaciones culturales y casas regionales` | SKB p=0.471 |
| `Asociaciones vecinales` | SKB p=0.497; Perm=0.0022<=noise=0.0034 |
| `Campos de fútbol 11` | Perm=-0.0015<=noise=0.0034 |
| `ine_renta_persona` | Perm=0.0012<=noise=0.0034 |
| `ine_edad_media` | Perm=0.0007<=noise=0.0034 |
| `ine_tamano_hogar` | Perm=0.0010<=noise=0.0034 |
| `green_area_m2` | Perm=-0.0014<=noise=0.0034 |
| `licencias_density_1km` | SKB p=1.000; SHAP=0.0000<41.8893; Perm=0.0000<=noise=0.0034 |
| `vut_distance_nearest` | SKB p=0.248 |
| `vut_count_district` | Perm=0.0024<=noise=0.0034 |

#### Features seleccionadas

| Feature | SelectKBest p | SHAP | Perm |
|---------|--------------|------|------|
| `surface_m2` | 0.000 | 837.7851 | 0.1476 |
| `bathrooms` | 0.000 | 822.9320 | 0.1048 |
| `floor_built` | 0.000 | 806.9424 | 0.1444 |
| `density_1km` | 0.000 | 645.5930 | 0.0649 |
| `vut_count_1_0km` | 0.000 | 589.6077 | 0.0190 |
| `bicimad_density_1km` | 0.000 | 407.3399 | 0.0468 |
| `log_surface_m2` | 0.000 | 277.0824 | 0.0848 |
| `distance_center_km` | 0.000 | 249.5339 | 0.0633 |
| `lng` | 0.000 | 240.9091 | 0.0125 |
| `noise_ld_db` | 0.003 | 217.7973 | 0.0140 |
| `lat` | 0.001 | 217.3720 | 0.0262 |
| `balcony` | 0.000 | 157.8292 | 0.0054 |
| `terrace_density_1km` | 0.000 | 143.8170 | 0.0186 |
| `bedrooms` | 0.000 | 139.2366 | 0.1007 |
| `floor_area` | 0.000 | 128.0746 | 0.0068 |
| `locales_density_1km` | 0.000 | 115.1929 | 0.0164 |
| `emt_density_500m` | 0.000 | 112.1971 | 0.0204 |
| `air_no2_nearest` | 0.000 | 103.4877 | 0.0104 |
| `vut_density_1_0km` | 0.000 | 102.7755 | 0.0184 |
| `Asociaciones de mujeres` | 0.000 | 98.4931 | 0.0072 |
| `terrace` | 0.000 | 94.0442 | 0.0118 |
| `ine_pct_unipersonal` | 0.000 | 67.7945 | 0.0044 |
| `fitted_wardrobes` | 0.000 | 62.7484 | 0.0042 |
| `swimming_pool` | 0.000 | 45.6443 | 0.0153 |


### Target: price_m2

- Features originales: 49
- Features seleccionadas (umbral final): 39
- Features excluidas: 10
- Metodo: consensus_3_of_3

#### Features excluidas

| Feature | Razon |
|---------|-------|
| `second_hand` | SKB p=0.692; SHAP=0.0023<0.0852 |
| `lift` | SHAP=0.0295<0.0852 |
| `furnished` | SKB p=0.529; SHAP=0.0204<0.0852 |
| `equipped_kitchen` | SKB p=0.529; SHAP=0.0282<0.0852 |
| `fitted_wardrobes` | Perm=-0.0068<=noise=-0.0062 |
| `balcony` | SKB p=0.179; SHAP=0.0508<0.0852 |
| `storeroom` | SHAP=0.0471<0.0852 |
| `garden_area` | SKB p=1.000; SHAP=0.0000<0.0852 |
| `air_no2_nearest` | SKB p=0.038 |
| `licencias_density_1km` | SKB p=1.000; SHAP=0.0000<0.0852 |

#### Features seleccionadas

| Feature | SelectKBest p | SHAP | Perm |
|---------|--------------|------|------|
| `log_surface_m2` | 0.000 | 1.7041 | 0.2383 |
| `surface_m2` | 0.000 | 1.5727 | 0.3037 |
| `terrace_density_1km` | 0.000 | 0.9323 | 0.0273 |
| `density_1km` | 0.000 | 0.9220 | 0.0720 |
| `bathrooms` | 0.000 | 0.9076 | 0.1200 |
| `bicimad_density_1km` | 0.000 | 0.8808 | 0.0209 |
| `distance_center_km` | 0.000 | 0.8092 | 0.0229 |
| `air_conditioning` | 0.000 | 0.7688 | 0.0243 |
| `floor_built` | 0.000 | 0.6242 | 0.0256 |
| `year_built` | 0.001 | 0.4409 | 0.0375 |
| `locales_density_1km` | 0.000 | 0.4311 | 0.0014 |
| `lat` | 0.000 | 0.4204 | 0.0078 |
| `lng` | 0.003 | 0.3979 | 0.0025 |
| `swimming_pool` | 0.000 | 0.3632 | 0.0452 |
| `ine_renta_persona` | 0.000 | 0.3120 | 0.0055 |
| `vut_density_1_0km` | 0.000 | 0.2953 | 0.0205 |
| `floor_area` | 0.000 | 0.2903 | 0.0069 |
| `vut_distance_nearest` | 0.000 | 0.2531 | 0.0063 |
| `surface_is_built` | 0.001 | 0.2381 | 0.0043 |
| `dist_bicimad_m` | 0.000 | 0.2332 | 0.0203 |
| `bedrooms` | 0.000 | 0.2311 | 0.0331 |
| `emt_density_500m` | 0.000 | 0.2269 | 0.0137 |
| `dist_metro_m` | 0.000 | 0.2203 | 0.0011 |
| `noise_ld_db` | 0.000 | 0.2194 | 0.0051 |
| `vut_count_1_0km` | 0.000 | 0.2182 | 0.0227 |
| `ine_pct_unipersonal` | 0.000 | 0.2031 | -0.0014 |
| `private_owner` | 0.000 | 0.1995 | 0.0060 |
| `Asociaciones de mujeres` | 0.000 | 0.1738 | -0.0030 |
| `deposit` | 0.000 | 0.1726 | 0.0013 |
| `green_area_m2` | 0.000 | 0.1533 | 0.0004 |
| `Asociaciones vecinales` | 0.000 | 0.1349 | -0.0010 |
| `ine_tamano_hogar` | 0.000 | 0.1250 | -0.0023 |
| `Campos de fútbol 11` | 0.000 | 0.1188 | 0.0000 |
| `vut_count_district` | 0.000 | 0.1170 | -0.0013 |
| `garage_included` | 0.000 | 0.1124 | -0.0010 |
| `ine_edad_media` | 0.000 | 0.1081 | -0.0023 |
| `Asociaciones (sección 1ª)` | 0.000 | 0.1051 | -0.0023 |
| `Asociaciones culturales y casas regionales` | 0.000 | 0.0895 | 0.0009 |
| `terrace` | 0.000 | 0.0887 | 0.0009 |
