"""Tests unitarios de las funciones puras de ``src/utils.py``.

Cubren la logica reutilizable critica del proyecto sin depender de datos
externos ni de modelos entrenados:

    - ``haversine``         : distancias geograficas + casos limite (NaN, iguales)
    - ``validate_price_m2`` : reglas de rango y consistencia precio/superficie
    - ``oof_aggregations``  : agregacion out-of-fold (propiedad anti-leakage)
    - ``eval_regression``   : metricas de regresion (MAE, RMSE, R2)
    - ``parse_js_barrios``  : parseo del array JavaScript de barrios
    - ``get_feature_cols``  : exclusion de targets / derivados / IDs

Ejecutar con:  pytest -q
"""

import math
import sys
from pathlib import Path

import numpy as np
import pandas as pd
import pytest

# Permitir ``import src.utils`` ejecutando pytest desde cualquier directorio.
ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from src.utils import (  # noqa: E402
    SEED,
    eval_regression,
    get_feature_cols,
    haversine,
    oof_aggregations,
    parse_js_barrios,
    validate_price_m2,
)


# ---------------------------------------------------------------------------
#  haversine
# ---------------------------------------------------------------------------

def test_haversine_identical_points_is_zero():
    assert haversine(40.4168, -3.7038, 40.4168, -3.7038) == 0.0


def test_haversine_one_degree_latitude_is_about_111_km():
    # 1 grado de latitud equivale aproximadamente a 111,19 km.
    d = haversine(0.0, 0.0, 1.0, 0.0)
    assert d == pytest.approx(111.19, abs=0.5)


def test_haversine_nan_coordinate_returns_nan():
    assert math.isnan(haversine(float("nan"), -3.7, 40.4, -3.7))


def test_haversine_is_symmetric():
    a = haversine(40.4168, -3.7038, 40.4530, -3.6883)
    b = haversine(40.4530, -3.6883, 40.4168, -3.7038)
    assert a == pytest.approx(b)


# ---------------------------------------------------------------------------
#  validate_price_m2
# ---------------------------------------------------------------------------

def test_validate_price_m2_flags_range_and_consistency():
    df = pd.DataFrame({
        "price": [1000.0, 5000.0, 800.0, 2000.0],
        "surface_m2": [50.0, 100.0, 40.0, 100.0],
        # fila0 ok (20); fila1 ok (50); fila2 inconsistente; fila3 fuera de rango (alto)
        "price_m2": [20.0, 50.0, 99.0, 200.0],
    })
    valid = validate_price_m2(df)
    assert list(valid) == [True, True, False, False]


def test_validate_price_m2_rejects_below_min():
    df = pd.DataFrame({"price_m2": [2.0]})  # < min_price_m2 (3.0)
    assert validate_price_m2(df).iloc[0] == False  # noqa: E712


# ---------------------------------------------------------------------------
#  oof_aggregations  (propiedad anti-leakage)
# ---------------------------------------------------------------------------

def test_oof_aggregations_shape_matches_input():
    df = pd.DataFrame({"g": ["a"] * 10 + ["b"] * 10, "v": np.arange(20.0)})
    out = oof_aggregations(df, "g", "v", n_splits=5, seed=SEED)
    assert out.shape == (20,)


def test_oof_aggregations_constant_group_recovers_value():
    # Si cada grupo tiene un valor constante, la media OOF debe ser ese valor
    # (los folds de entrenamiento del mismo grupo comparten el mismo valor).
    df = pd.DataFrame({
        "g": ["a"] * 10 + ["b"] * 10,
        "v": [100.0] * 10 + [200.0] * 10,
    })
    out = oof_aggregations(df, "g", "v", n_splits=5, seed=SEED)
    np.testing.assert_allclose(out[:10], 100.0)
    np.testing.assert_allclose(out[10:], 200.0)


# ---------------------------------------------------------------------------
#  eval_regression
# ---------------------------------------------------------------------------

def test_eval_regression_perfect_prediction():
    y = [100.0, 200.0, 300.0, 400.0]
    m = eval_regression(y, y)
    assert m["mae"] == pytest.approx(0.0)
    assert m["rmse"] == pytest.approx(0.0)
    assert m["r2"] == pytest.approx(1.0)


def test_eval_regression_known_mae():
    y_true = [100.0, 200.0, 300.0]
    y_pred = [110.0, 190.0, 300.0]  # errores: 10, 10, 0 -> MAE = 20/3
    m = eval_regression(y_true, y_pred)
    assert m["mae"] == pytest.approx(20.0 / 3.0)
    assert set(["mae", "rmse", "r2"]).issubset(m.keys())


# ---------------------------------------------------------------------------
#  parse_js_barrios
# ---------------------------------------------------------------------------

def test_parse_js_barrios_basic():
    js = """
    // datos de barrios
    var barriosMadrid = [
      {name: 'Centro', price_m2: 18.5, active: true},
      {name: "Salamanca", price_m2: 21.0, active: false}
    ];
    """
    barrios = parse_js_barrios(js)
    assert isinstance(barrios, list)
    assert len(barrios) == 2
    assert barrios[0]["name"] == "Centro"
    assert barrios[0]["active"] is True
    assert barrios[1]["active"] is False


def test_parse_js_barrios_missing_anchor_returns_empty():
    assert parse_js_barrios("const otraCosa = [1,2,3];") == []


# ---------------------------------------------------------------------------
#  get_feature_cols
# ---------------------------------------------------------------------------

def test_get_feature_cols_excludes_targets_derived_and_ids():
    cols = [
        "price", "price_m2", "log_price", "price_per_room",  # targets/derivados
        "web_id", "url",                                      # ids
        "surface_m2", "lat", "lng", "bedrooms",              # features validas
    ]
    out = get_feature_cols(cols)
    assert out == ["surface_m2", "lat", "lng", "bedrooms"]


def test_get_feature_cols_numeric_only():
    df = pd.DataFrame({
        "price": [1000.0],
        "surface_m2": [50.0],
        "barrio": ["Centro"],  # no numerica
        "bedrooms": [2],
    })
    out = get_feature_cols(df, numeric_only=True)
    assert "barrio" not in out
    assert "surface_m2" in out and "bedrooms" in out
    assert "price" not in out
