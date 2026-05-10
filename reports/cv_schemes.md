## Esquemas de validacion

- Holdout: por staleness/fecha (last_update) (test_size=0.2, gap_days=1).
- CV normal: KFold 5 folds aleatorio.
- GroupCV: GroupKFold por district (n_groups=88).
- SpatialCV p=6: GroupKFold por geohash_6 (5 folds, MAE=561.59).
- TimeCV: TimeSeriesSplit 5 folds, gap=208 (MAE=493.26).

## Metricas CV resumen

| target | cv_mae | tuned_cv_mae | group_cv_mae | spatial_cv_mae_6 | temporal_cv_mae |
| --- | --- | --- | --- | --- | --- |
| price | 400.65 | 391.48 | 615.66 | 561.59 | 493.26 |
| price_m2 | 4.11 | 3.87 | 5.26 | 4.77 | 4.43 |
