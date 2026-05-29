"""restrict_opportunities_to_city.py - Saneamiento de las oportunidades mostradas en la web.

Motivacion (auditoria). Se aplican DOS filtros encadenados a las oportunidades:

  1. Alcance geografico. El dataset abarca toda el area metropolitana (88 valores de
     `district`), pero el enrichment externo (INE, ruido, VUT...) solo se une a los 21
     distritos oficiales del municipio (`distrito_join`). Fuera de ahi el modelo extrapola
     sin soporte fiable. -> Se conservan solo los 21 distritos del municipio.

  2. Dominio de aplicabilidad (sanity sobre EUR/m2). Incluso dentro del municipio, el
     modelo extrapola en estudios pequenos de zonas prime, produciendo estimaciones de
     EUR/m2 que ningun alquiler real del dataset alcanza (p. ej. Sol 33 m2 -> 155 EUR/m2,
     cuando el P99 real es ~54 y el maximo observado 120). -> Se descartan las
     oportunidades cuya estimacion implicita supere el percentil 99 del `price_m2` real.
     El umbral se calcula en tiempo de ejecucion desde el dataset (reproducible).

Acciones:
  - Filtra `web/data/opportunities_pool.json` (in-place) con ambos criterios.
  - Regenera los tres rankings top-10 (mixto / descuento EUR via z-score / descuento EUR/m2)
    con la MISMA metodologia que NB08 y reescribe el bloque `const OPPORTUNITIES = {...};`
    de `web/app.js`.

Uso:
    python src/restrict_opportunities_to_city.py
"""

from __future__ import annotations

import json
import re
import unicodedata
from datetime import datetime, timezone
from pathlib import Path


def _find_repo_root(start: Path) -> Path:
    for parent in [start, *start.parents]:
        if (parent / ".git").exists() or (parent / "web").exists():
            return parent
    return start


ROOT = _find_repo_root(Path(__file__).resolve())
POOL = ROOT / "web" / "data" / "opportunities_pool.json"
APPJS = ROOT / "web" / "app.js"
MASTER = ROOT / "artifacts" / "features_master.parquet"

# Tope de EUR/m2 por defecto (P99 del price_m2 real) si no se puede leer el dataset.
DEFAULT_EUR_M2_CAP = 54.0

# 21 distritos del municipio de Madrid (normalizados) + alias/forma corta que
# aparecen en los datos servidos.
CITY_DISTRICTS = {
    "arganzuela", "barajas", "carabanchel", "centro",
    "chamartin", "chamberi", "ciudad lineal",
    "fuencarral", "fuencarral - el pardo",
    "hortaleza", "latina",
    "moncloa", "moncloa - aravaca",
    "moratalaz",
    "puente vallecas", "puente de vallecas",
    "retiro", "salamanca", "barrio de salamanca",
    "san blas", "san blas - canillejas",
    "tetuan", "usera", "vicalvaro",
    "villa de vallecas", "villaverde",
}


def _norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", str(s))
    s = "".join(c for c in s if not unicodedata.combining(c))
    return " ".join(s.lower().split())


def _is_city(item: dict) -> bool:
    return _norm(item.get("district", "")) in CITY_DISTRICTS


def _est_eur_m2(it: dict) -> float:
    m2 = it.get("m2") or 0
    return (it.get("estimated", 0) / m2) if m2 else 0.0


def _eur_m2_cap(default: float = DEFAULT_EUR_M2_CAP) -> float:
    """Percentil 99 del price_m2 real del dataset (umbral de aplicabilidad)."""
    try:
        import pandas as pd
        if MASTER.exists():
            pm2 = pd.read_parquet(MASTER, columns=["price_m2"])["price_m2"].dropna()
            return float(round(pm2.quantile(0.99), 1))
    except Exception:
        pass
    return default


def _pct_rank(values: list[float]) -> list[float]:
    """Rango percentil (0..1) de cada valor dentro de la lista."""
    n = len(values)
    if n <= 1:
        return [1.0] * n
    order = sorted(range(n), key=lambda i: values[i])
    ranks = [0.0] * n
    for pos, idx in enumerate(order):
        ranks[idx] = pos / (n - 1)
    return ranks


def _row(it: dict, rank: int) -> dict:
    return {
        "rank": rank,
        "barrio": it.get("barrio", ""),
        "district": it.get("district", ""),
        "m2": it.get("m2"),
        "published": it.get("published"),
        "estimated": it.get("estimated"),
        "score": round(float(it.get("score", 0.0)), 2),
        "url": it.get("url_id", it.get("url", "")),
    }


def _js_array(rows: list[dict]) -> str:
    lines = []
    for r in rows:
        barrio = json.dumps(r["barrio"], ensure_ascii=False)
        district = json.dumps(r["district"], ensure_ascii=False)
        url = json.dumps(str(r["url"]), ensure_ascii=False)
        lines.append(
            f'    {{rank:{r["rank"]}, barrio:{barrio}, district:{district}, '
            f'm2:{r["m2"]}, published:{r["published"]}, estimated:{r["estimated"]}, '
            f'score:{r["score"]:.2f}, url:{url}}}'
        )
    return ",\n".join(lines)


def main() -> None:
    data = json.loads(POOL.read_text(encoding="utf-8"))
    items = data.get("items", [])

    # --- Filtro 1: alcance geografico (21 distritos del municipio) ---
    in_city = [it for it in items if _is_city(it)]
    out_city = [it for it in items if not _is_city(it)]

    # --- Filtro 2: dominio de aplicabilidad (EUR/m2 <= P99 real) ---
    cap = _eur_m2_cap()
    kept = [it for it in in_city if _est_eur_m2(it) <= cap]
    out_extrap = [it for it in in_city if _est_eur_m2(it) > cap]

    # --- Reescribir el pool filtrado ---
    data["items"] = kept
    data["n"] = len(kept)
    data["scope"] = "municipio_madrid_21_distritos"
    data["max_est_eur_m2"] = cap
    data["restricted_at"] = datetime.now(timezone.utc).isoformat()
    POOL.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    # --- Regenerar los tres rankings desde el pool saneado ---
    def discount_m2(it):
        m2 = it.get("m2") or 0
        return ((it.get("estimated", 0) - it.get("published", 0)) / m2) if m2 else 0.0

    by_score = sorted(kept, key=lambda it: it.get("score", 0), reverse=True)
    by_score_m2 = sorted(kept, key=discount_m2, reverse=True)

    pr_score = _pct_rank([it.get("score", 0) for it in kept])
    pr_m2 = _pct_rank([discount_m2(it) for it in kept])
    mixed_key = {id(it): (pr_score[i] + pr_m2[i]) / 2 for i, it in enumerate(kept)}
    by_mixed = sorted(kept, key=lambda it: mixed_key[id(it)], reverse=True)

    mixed = [_row(it, i + 1) for i, it in enumerate(by_mixed[:10])]
    score = [_row(it, i + 1) for i, it in enumerate(by_score[:10])]
    score_m2 = [_row(it, i + 1) for i, it in enumerate(by_score_m2[:10])]

    block = (
        "const OPPORTUNITIES = {\n"
        "  mixed: [\n" + _js_array(mixed) + "\n  ],\n"
        "  score: [\n" + _js_array(score) + "\n  ],\n"
        "  score_m2: [\n" + _js_array(score_m2) + "\n  ]\n"
        "};"
    )

    # --- Sustituir el bloque OPPORTUNITIES en app.js ---
    src = APPJS.read_text(encoding="utf-8")
    new_src, n_sub = re.subn(
        r"const OPPORTUNITIES = \{.*?\n\};",
        lambda _m: block,
        src,
        count=1,
        flags=re.DOTALL,
    )
    if n_sub != 1:
        raise RuntimeError("No se encontro el bloque 'const OPPORTUNITIES = {...};' en app.js")
    APPJS.write_text(new_src, encoding="utf-8")

    print(f"Pool inicial: {len(items)} items")
    print(f"  - Filtro geografico: -{len(out_city)} fuera del municipio")
    print(f"  - Filtro EUR/m2 (cap P99 = {cap} EUR/m2): -{len(out_extrap)} extrapolaciones")
    if out_extrap:
        for it in sorted(out_extrap, key=_est_eur_m2, reverse=True):
            print(f"      drop  {it.get('district')}/{it.get('barrio')}  "
                  f"{it.get('m2')} m2  est={it.get('estimated')}  ({_est_eur_m2(it):.0f} EUR/m2)")
    print(f"  = Pool final: {len(kept)} items")
    print("app.js: bloque OPPORTUNITIES regenerado (top-10 saneado)")


if __name__ == "__main__":
    main()
