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


def parse_js_barrios(js_text: str) -> List[Dict[str, Any]]:
    """Parse the barriosMadrid array"""
    import re

    def _strip_js_comments(text: str) -> str:
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


def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Return the great-circle distance in kilometers between two points."""
    earth_radius_km = 6371
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    )
    return 2 * earth_radius_km * math.asin(math.sqrt(a))


def make_time_splits(
    df,
    date_col: str,
    test_size: float = 0.2,
    seed: int = 42,
    gap_days: int = 0,
):
    """Create a temporal holdout split without shuffling.

    Also removes a gap (in days) between train and test to reduce leakage.
    """
    import pandas as pd

    df = df.copy()
    df[date_col] = pd.to_datetime(df[date_col], errors="coerce")
    valid = df.dropna(subset=[date_col]).sort_values(date_col)
    if valid.empty:
        indices = df.index.to_numpy()
        if len(indices) == 0:
            return indices, indices
        if len(indices) == 1:
            return indices, np.array([], dtype=indices.dtype)
        rng = np.random.default_rng(seed)
        perm = rng.permutation(indices)
        n_test = max(1, int(round(len(indices) * test_size)))
        if len(indices) > 1:
            n_test = min(n_test, len(indices) - 1)
        test_idx = perm[:n_test]
        train_idx = perm[n_test:]
        return train_idx, test_idx
    split_point = int(len(valid) * (1 - test_size))
    split_point = max(1, min(split_point, len(valid) - 1))
    split_date = valid.iloc[split_point][date_col]
    if gap_days and pd.notna(split_date):
        gap_cutoff = split_date - pd.Timedelta(days=int(gap_days))
        train_idx = valid.loc[valid[date_col] < gap_cutoff].index.to_numpy()
        test_idx = valid.loc[valid[date_col] >= split_date].index.to_numpy()
        if len(train_idx) == 0 or len(test_idx) == 0:
            train_idx = valid.iloc[:split_point].index.to_numpy()
            test_idx = valid.iloc[split_point:].index.to_numpy()
    else:
        train_idx = valid.iloc[:split_point].index.to_numpy()
        test_idx = valid.iloc[split_point:].index.to_numpy()
    missing_idx = df.index.difference(valid.index)
    if len(missing_idx) > 0:
        train_idx = np.concatenate([train_idx, missing_idx.to_numpy()])
    return train_idx, test_idx


def plot_maps(df, lat_col: str, lon_col: str, value_col: Optional[str] = None) -> None:
    """Quick scatter plot for latitude/longitude data with optional coloring."""
    import matplotlib.pyplot as plt

    plt.figure(figsize=(8, 6))
    if value_col:
        plt.scatter(df[lon_col], df[lat_col], c=df[value_col], s=5, cmap="viridis")
        plt.colorbar(label=value_col)
    else:
        plt.scatter(df[lon_col], df[lat_col], s=5)
    plt.xlabel("lon")
    plt.ylabel("lat")
    plt.show()


def make_geohash(lat: float, lon: float, precision: int = 6) -> str:
    """Return a geohash or a safe fallback string when geohash2 is unavailable."""
    import importlib.util

    if importlib.util.find_spec("geohash2"):
        import geohash2

        return geohash2.encode(lat, lon, precision=precision)
    return f"{lat:.{precision}f}_{lon:.{precision}f}"


def spatial_group(df, lat_col: str, lon_col: str, precision: int = 6) -> List[str]:
    """Group rows into spatial buckets (geohash or fallback encoding)."""
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