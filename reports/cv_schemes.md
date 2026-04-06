## Esquemas de validacion

- Holdout: por staleness/fecha (last_update) (test_size=0.2, gap_days=1).
- CV normal: KFold 5 folds aleatorio.
- GroupCV: GroupKFold por district (n_groups=88).
- SpatialCV p=6: GroupKFold por geohash_6 (5 folds, MAE=474.91).
- TimeCV: TimeSeriesSplit 5 folds, gap=208 (MAE=422.00).

## Metricas CV resumen

| target | cv_mae | tuned_cv_mae | group_cv_mae | spatial_cv_mae_6 | temporal_cv_mae |
| --- | --- | --- | --- | --- | --- |
| price | 400.65 | 391.38 | 521.27 | 474.91 | 422.00 |
| price_m2 | 4.11 | 3.99 | 5.08 | 4.69 | 4.41 |
