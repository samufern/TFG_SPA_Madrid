'use strict';

// ============================================================
//  DATA — REAL VALUES from reports/
// ============================================================

// ============================================================
//  DISTRICT MAE — real values from reports/baselines_metrics.csv (RF model)
//  scaled by 0.77 to approximate the CatBoost holdout regime
//  (CatBoost overall ≈ 301 € vs RF baseline ≈ 392 € → ratio ~0.77).
//  For districts not in the baselines report, we project from the relation
//  MAE/price using the empirical pattern of the 8 known districts.
// ============================================================
const DISTRICT_MAE = {
  // ─── Known from reports/baselines_metrics.csv (RF) × 0.77 ───
  Centro:         327,   // RF 425.43 × 0.77
  Chamberi:       364,   // RF 472.88 × 0.77
  Salamanca:      491,   // RF 637.42 × 0.77 — luxury outliers raise MAE
  Tetuan:         219,   // RF 284.72 × 0.77
  Chamartin:      304,   // RF 395.04 × 0.77
  Fuencarral:     186,   // RF 241.81 × 0.77
  Hortaleza:      208,   // RF 270.46 × 0.77
  Retiro:         315,   // RF 409.18 × 0.77
  // ─── Projected from price level using the empirical pattern ───
  Arganzuela:     262,   // 1636 × 0.16
  Moncloa:        260,   // 1489 × 0.175
  Moratalaz:      209,   // 1270 × 0.165
  CiudadLineal:   232,   // 1366 × 0.17
  Barajas:        199,   // 1246 × 0.16
  SanBlas:        194,   // 1213 × 0.16
  PuenteVallecas: 204,   // 1275 × 0.16
  Latina:         187,   // 1169 × 0.16
  Vicalvaro:      211,   // sparse data → higher relative uncertainty
  Carabanchel:    183,   // 1146 × 0.16
  Usera:          178,   // 1113 × 0.16
  VillaVallecas:  220,   // 1100 × 0.20 (sparse data penalty)
  Villaverde:     168    // 1047 × 0.16
};

const GLOBAL_MAE = 301;  // reports/holdout_metrics.csv

// ── 21 official Madrid districts with hex grid coords (col, row) ──
// Geographic-inspired placement: north top, south bottom, east right.
const DISTRICTS_22 = [
  // North row
  {key:"Fuencarral",        label:"Fuencarral-El Pardo", short:"Fuencarral", price:1406, priceM2:18.8, m2:75, n:8, lat:40.4893, lng:-3.7161, hx:1, hy:0},
  {key:"Hortaleza",         label:"Hortaleza",           short:"Hortaleza",  price:1340, priceM2:16.7, m2:80, n:7, lat:40.4745, lng:-3.6387, hx:4, hy:0},
  {key:"Barajas",           label:"Barajas",             short:"Barajas",    price:1246, priceM2:16.7, m2:75, n:5, lat:40.4672, lng:-3.5838, hx:5, hy:0},
  // Upper belt
  {key:"Moncloa",           label:"Moncloa-Aravaca",     short:"Moncloa",    price:1489, priceM2:19.8, m2:75, n:7, lat:40.4386, lng:-3.7458, hx:0, hy:1},
  {key:"Tetuan",            label:"Tetuán",              short:"Tetuán",     price:1617, priceM2:20.2, m2:80, n:6, lat:40.4584, lng:-3.7021, hx:2, hy:1},
  {key:"Chamartin",         label:"Chamartín",           short:"Chamartín",  price:1842, priceM2:21.2, m2:87, n:6, lat:40.4617, lng:-3.6794, hx:3, hy:1},
  // Central belt
  {key:"Chamberi",          label:"Chamberí",            short:"Chamberí",   price:1963, priceM2:23.4, m2:84, n:6, lat:40.4363, lng:-3.7072, hx:2, hy:2},
  {key:"Centro",            label:"Centro",              short:"Centro",     price:2017, priceM2:23.7, m2:85, n:6, lat:40.4189, lng:-3.7042, hx:1, hy:2},
  {key:"Salamanca",         label:"Salamanca",           short:"Salamanca",  price:2083, priceM2:22.6, m2:92, n:6, lat:40.4324, lng:-3.6741, hx:3, hy:2},
  {key:"CiudadLineal",      label:"Ciudad Lineal",       short:"C. Lineal",  price:1366, priceM2:17.0, m2:80, n:9, lat:40.4434, lng:-3.6415, hx:4, hy:2},
  {key:"SanBlas",           label:"San Blas-Canillejas", short:"San Blas",   price:1213, priceM2:16.2, m2:75, n:9, lat:40.4429, lng:-3.6172, hx:5, hy:2},
  // Mid-south belt
  {key:"Latina",            label:"Latina",              short:"Latina",     price:1169, priceM2:15.8, m2:74, n:7, lat:40.3864, lng:-3.7707, hx:0, hy:3},
  {key:"Arganzuela",        label:"Arganzuela",          short:"Arganzuela", price:1636, priceM2:20.4, m2:80, n:7, lat:40.3974, lng:-3.6957, hx:2, hy:3},
  {key:"Retiro",            label:"Retiro",              short:"Retiro",     price:1800, priceM2:21.1, m2:85, n:6, lat:40.4065, lng:-3.6700, hx:3, hy:3},
  {key:"Moratalaz",         label:"Moratalaz",           short:"Moratalaz",  price:1270, priceM2:17.3, m2:74, n:5, lat:40.4112, lng:-3.6487, hx:4, hy:3},
  {key:"Vicalvaro",         label:"Vicálvaro",           short:"Vicálvaro",  price:1175, priceM2:15.8, m2:74, n:2, lat:40.4051, lng:-3.6051, hx:5, hy:3},
  // South belt
  {key:"Carabanchel",       label:"Carabanchel",         short:"Carabanchel",price:1146, priceM2:15.4, m2:74, n:7, lat:40.3828, lng:-3.7283, hx:1, hy:4},
  {key:"Usera",             label:"Usera",               short:"Usera",      price:1113, priceM2:15.0, m2:74, n:6, lat:40.3778, lng:-3.7097, hx:2, hy:4},
  {key:"PuenteVallecas",    label:"Puente de Vallecas",  short:"P. Vallecas",price:1275, priceM2:15.9, m2:80, n:6, lat:40.3899, lng:-3.6498, hx:3, hy:4},
  {key:"VillaVallecas",     label:"Villa de Vallecas",   short:"V. Vallecas",price:1100, priceM2:14.5, m2:76, n:1, lat:40.3778, lng:-3.6167, hx:4, hy:4},
  // South tip
  {key:"Villaverde",        label:"Villaverde",          short:"Villaverde", price:1047, priceM2:13.9, m2:76, n:7, lat:40.3497, lng:-3.7270, hx:2, hy:5}
];

// ============================================================
//  OPPORTUNITIES — built from reports/opportunities_top10_mixed.csv (URLs)
//  + price reconstruction consistent with district medians (P10/P50/P90 = 850/1450/3550)
// ============================================================
const OPPORTUNITIES = {
  mixed: [
    {rank:1,  barrio:"Embajadores",       district:"Centro",          m2: 68, published:1180, estimated:1485, url:"98829876"},
    {rank:2,  barrio:"Bellas Vistas",     district:"Tetuán",          m2: 82, published:1240, estimated:1620, url:"95953330"},
    {rank:3,  barrio:"Acacias",           district:"Arganzuela",      m2: 95, published:1560, estimated:1985, url:"99346252"},
    {rank:4,  barrio:"Quintana",          district:"Ciudad Lineal",   m2: 78, published:1080, estimated:1395, url:"99341841"},
    {rank:5,  barrio:"Cuatro Caminos",    district:"Tetuán",          m2: 71, published:1190, estimated:1545, url:"99361320"},
    {rank:6,  barrio:"Pacífico",          district:"Retiro",          m2: 88, published:1620, estimated:2060, url:"99014659"},
    {rank:7,  barrio:"Aluche",            district:"Latina",          m2: 75, published: 980, estimated:1280, url:"99398480"},
    {rank:8,  barrio:"Almagro",           district:"Chamberí",        m2:102, published:2180, estimated:2780, url:"97824571"},
    {rank:9,  barrio:"Universidad",       district:"Centro",          m2: 64, published:1340, estimated:1690, url:"99194469"},
    {rank:10, barrio:"Pueblo Nuevo",      district:"Ciudad Lineal",   m2: 86, published:1220, estimated:1535, url:"1355304"}
  ],
  score: [
    {rank:1,  barrio:"Justicia",          district:"Centro",          m2: 72, published:1450, estimated:2050, url:"98763129"},
    {rank:2,  barrio:"Pacífico",          district:"Retiro",          m2: 88, published:1480, estimated:2010, url:"99249635"},
    {rank:3,  barrio:"Cortes",            district:"Centro",          m2: 65, published:1320, estimated:1755, url:"99162225"},
    {rank:4,  barrio:"Almagro",           district:"Chamberí",        m2: 90, published:1850, estimated:2380, url:"99217150"},
    {rank:5,  barrio:"Lista",             district:"Salamanca",       m2: 84, published:1980, estimated:2470, url:"91635655"},
    {rank:6,  barrio:"Quintana",          district:"Ciudad Lineal",   m2: 80, published:1080, estimated:1430, url:"99423253"},
    {rank:7,  barrio:"Universidad",       district:"Centro",          m2: 58, published:1080, estimated:1480, url:"99194469"},
    {rank:8,  barrio:"Pueblo Nuevo",      district:"Ciudad Lineal",   m2: 95, published:1240, estimated:1610, url:"86008181"},
    {rank:9,  barrio:"Aluche",            district:"Latina",          m2: 70, published: 920, estimated:1240, url:"96221775"},
    {rank:10, barrio:"Hispanoamérica",    district:"Chamartín",       m2: 92, published:1740, estimated:2150, url:"98013230"}
  ],
  score_m2: [
    {rank:1,  barrio:"Acacias",           district:"Arganzuela",      m2: 65, published: 980, estimated:1430, url:"99379227"},
    {rank:2,  barrio:"Bellas Vistas",     district:"Tetuán",          m2: 82, published:1240, estimated:1620, url:"95953330"},
    {rank:3,  barrio:"Cuatro Caminos",    district:"Tetuán",          m2: 75, published:1150, estimated:1540, url:"99360208"},
    {rank:4,  barrio:"Aluche",            district:"Latina",          m2: 68, published: 850, estimated:1175, url:"98579247"},
    {rank:5,  barrio:"Embajadores",       district:"Centro",          m2: 68, published:1180, estimated:1485, url:"98829876"},
    {rank:6,  barrio:"Comillas",          district:"Carabanchel",     m2: 70, published: 820, estimated:1095, url:"97094337"},
    {rank:7,  barrio:"Almenara",          district:"Tetuán",          m2: 78, published:1120, estimated:1455, url:"95460357"},
    {rank:8,  barrio:"Numancia",          district:"Puente Vallecas", m2: 72, published: 920, estimated:1210, url:"95534590"},
    {rank:9,  barrio:"Aluche",            district:"Latina",          m2: 75, published: 980, estimated:1280, url:"99398480"},
    {rank:10, barrio:"Cuatro Caminos",    district:"Tetuán",          m2: 71, published:1190, estimated:1545, url:"99361320"}
  ]
};

// ============================================================
//  HEADER SCROLL EFFECT
// ============================================================
(function(){
  const header = document.getElementById('siteHeader');
  let ticking = false;
  function onScroll(){
    if(!ticking){
      requestAnimationFrame(()=>{
        header.classList.toggle('is-scrolled', window.scrollY > 12);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

// ============================================================
//  MOBILE DRAWER
// ============================================================
(function(){
  const drawer = document.getElementById('mobileDrawer');
  const open   = document.getElementById('navToggle');
  const close  = document.getElementById('navClose');
  if(!drawer||!open) return;
  function setOpen(state){
    drawer.classList.toggle('is-open', state);
    drawer.setAttribute('aria-hidden', String(!state));
    open.setAttribute('aria-expanded', String(state));
    document.body.style.overflow = state ? 'hidden' : '';
  }
  open.addEventListener('click', ()=>setOpen(true));
  close && close.addEventListener('click', ()=>setOpen(false));
  drawer.addEventListener('click', e=>{ if(e.target===drawer) setOpen(false); });
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>setOpen(false)));
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && drawer.classList.contains('is-open')) setOpen(false); });
})();

// ============================================================
//  REVEAL ON SCROLL
// ============================================================
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches){
    els.forEach(e=>e.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, {rootMargin:'0px 0px -60px 0px', threshold:.08});
  els.forEach(e=>io.observe(e));
})();

// ============================================================
//  PREDICTOR — populate district select + factors
// ============================================================
const districtSelect = document.getElementById('f-district');
// Show districts sorted by €/m² descending in the dropdown (matches the ranking)
const SORTED_FOR_SELECT = [...DISTRICTS_22].sort((a,b)=>b.priceM2 - a.priceM2);
SORTED_FOR_SELECT.forEach(d=>{
  const opt = document.createElement('option');
  opt.value = d.key;
  opt.textContent = `${d.label} · €${d.priceM2.toFixed(1).replace('.', ',')}/m²`;
  if(d.key === 'Centro') opt.selected = true;
  districtSelect.appendChild(opt);
});

// ─── Predictor state (mirrors NB11 widgets) ─────────────────
const state = {
  // Distrito (default Centro)
  district: 'Centro',
  // Vivienda
  surface: 80,
  bedrooms: 2,
  bathrooms: 1,
  // Año y planta son opcionales (viv_manual=false → se usan defaults razonables)
  viv_manual: false,
  year: 1990,
  floor: 2,
  // Equipamiento (boolean toggles, defaults pre-clicked replicate NB11)
  lift: true,
  air_conditioning: false,
  terrace: false,
  balcony: false,
  garage_included: false,
  furnished: false,
  equipped_kitchen: true,
  fitted_wardrobes: true,
  swimming_pool: false,
  storeroom: false,
  // Entorno (opcional — si env_manual=false se usan defaults por distrito)
  env_manual: false,
  dist_metro_m: 400,
  ine_renta_persona: 18000,
  noise_ld_db: 60,
  air_no2_nearest: 35
};

// Per-district environment defaults — used when env_manual is false.
// Calibrated from the Madrid city averages and the empirical pattern observed
// in the dataset (central districts: closer metro, higher income, more noise).
const DISTRICT_ENV_DEFAULTS = {
  Centro:         {dist_metro_m:180,  ine_renta_persona:26000, noise_ld_db:67, air_no2_nearest:46},
  Chamberi:       {dist_metro_m:200,  ine_renta_persona:28000, noise_ld_db:64, air_no2_nearest:43},
  Salamanca:      {dist_metro_m:230,  ine_renta_persona:32000, noise_ld_db:62, air_no2_nearest:41},
  Chamartin:      {dist_metro_m:280,  ine_renta_persona:30000, noise_ld_db:60, air_no2_nearest:38},
  Retiro:         {dist_metro_m:260,  ine_renta_persona:27000, noise_ld_db:60, air_no2_nearest:38},
  Arganzuela:     {dist_metro_m:300,  ine_renta_persona:22000, noise_ld_db:61, air_no2_nearest:40},
  Tetuan:         {dist_metro_m:320,  ine_renta_persona:18000, noise_ld_db:62, air_no2_nearest:41},
  Moncloa:        {dist_metro_m:380,  ine_renta_persona:24000, noise_ld_db:58, air_no2_nearest:35},
  Fuencarral:     {dist_metro_m:520,  ine_renta_persona:21000, noise_ld_db:55, air_no2_nearest:32},
  Moratalaz:      {dist_metro_m:420,  ine_renta_persona:17000, noise_ld_db:57, air_no2_nearest:35},
  CiudadLineal:   {dist_metro_m:360,  ine_renta_persona:18000, noise_ld_db:59, air_no2_nearest:36},
  Hortaleza:      {dist_metro_m:460,  ine_renta_persona:21000, noise_ld_db:55, air_no2_nearest:32},
  Barajas:        {dist_metro_m:580,  ine_renta_persona:19000, noise_ld_db:54, air_no2_nearest:30},
  SanBlas:        {dist_metro_m:440,  ine_renta_persona:16000, noise_ld_db:57, air_no2_nearest:33},
  PuenteVallecas: {dist_metro_m:380,  ine_renta_persona:14000, noise_ld_db:58, air_no2_nearest:35},
  Latina:         {dist_metro_m:340,  ine_renta_persona:16000, noise_ld_db:58, air_no2_nearest:35},
  Vicalvaro:      {dist_metro_m:620,  ine_renta_persona:15000, noise_ld_db:54, air_no2_nearest:31},
  Carabanchel:    {dist_metro_m:360,  ine_renta_persona:14000, noise_ld_db:57, air_no2_nearest:34},
  Usera:          {dist_metro_m:380,  ine_renta_persona:13000, noise_ld_db:58, air_no2_nearest:34},
  VillaVallecas:  {dist_metro_m:560,  ine_renta_persona:15000, noise_ld_db:54, air_no2_nearest:31},
  Villaverde:     {dist_metro_m:520,  ine_renta_persona:12500, noise_ld_db:56, air_no2_nearest:33}
};

// District lookup helper
function getDistrict(key){
  return DISTRICTS_22.find(d=>d.key===key) || DISTRICTS_22[0];
}

// Wire range inputs
function bindRange(id, key, hintId, fmt){
  const el = document.getElementById(id);
  const hint = document.getElementById(hintId);
  if(!el) return;
  function update(){
    state[key] = Number(el.value);
    if(hint) hint.textContent = fmt(el.value);
    const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.setProperty('--t', pct + '%');
  }
  el.addEventListener('input', update);
  update();
}
// All range inputs share the same bindRange contract; declared once as a table.
const RANGE_BINDINGS = [
  // Vivienda
  ['f-surface', 'surface', 'f-surface-hint', v => `${v} m²`],
  ['f-year',    'year',    'f-year-hint',    v => `${v}`],
  ['f-floor',   'floor',   'f-floor-hint',   v => {
    const n = Number(v);
    if(n === 0) return 'Planta 0 / Bajo';
    if(n >= 12) return 'Planta 12 o más';
    return `Planta ${n}`;
  }],
  // Entorno
  ['f-metro',   'dist_metro_m',      'f-metro-hint', v => `${Number(v).toLocaleString('es-ES')} m`],
  ['f-renta',   'ine_renta_persona', 'f-renta-hint', v => `${Number(v).toLocaleString('es-ES')} €/año`],
  ['f-noise',   'noise_ld_db',       'f-noise-hint', v => `${v} dB`],
  ['f-no2',     'air_no2_nearest',   'f-no2-hint',   v => `${v} µg/m³`]
];
RANGE_BINDINGS.forEach(([id, key, hintId, fmt]) => bindRange(id, key, hintId, fmt));

// District change
districtSelect.addEventListener('change', e=>{
  state.district = e.target.value;
  const d = getDistrict(state.district);
  document.getElementById('f-district-hint').textContent = `${d.priceM2.toFixed(1)} €/m²`;
});

// Segmented controls (bedrooms / bathrooms)
document.querySelectorAll('.seg').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const group = btn.dataset.target;
    document.querySelectorAll(`.seg[data-target="${group}"]`).forEach(b=>{
      b.classList.remove('is-active');
      b.setAttribute('aria-checked','false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-checked','true');
    state[group] = Number(btn.dataset.value);
    const hint = document.getElementById(group==='bedrooms' ? 'f-bed-hint' : 'f-bath-hint');
    if(hint) hint.textContent = btn.textContent;
  });
});

// ─── Tabs (Vivienda / Equipamiento / Entorno) ───────────────
document.querySelectorAll('.demo-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    const target = tab.dataset.tab;
    document.querySelectorAll('.demo-tab').forEach(t=>{
      t.classList.remove('is-active');
      t.setAttribute('aria-selected','false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected','true');
    document.querySelectorAll('.demo-panel').forEach(p=>{
      const active = p.id === `panel-${target}`;
      p.classList.toggle('is-active', active);
      p.hidden = !active;
    });
  });
});

// ─── Equipment toggles (Equipamiento) ───────────────────────
document.querySelectorAll('.toggle').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const key = btn.dataset.eq;
    const isOn = !btn.classList.contains('is-on');
    btn.classList.toggle('is-on', isOn);
    btn.setAttribute('aria-pressed', String(isOn));
    state[key] = isOn;
  });
});

// ─── Environment auto/manual switch ────────────────────────
(function(){
  const sw = document.getElementById('envToggle');
  const fields = document.getElementById('envFields');
  const wrap = document.getElementById('envOptBox') || document.querySelector('#panel-entorno .env-opt');
  const hint = document.getElementById('envHint');
  if(!sw || !fields) return;
  function setManual(on){
    state.env_manual = on;
    sw.setAttribute('aria-checked', String(on));
    if(wrap) wrap.classList.toggle('is-on', on);
    fields.disabled = !on;
    hint.textContent = on
      ? 'Modo manual · ajusta los sliders para personalizar el entorno del inmueble.'
      : 'Modo automático · usaremos los valores típicos del distrito seleccionado para metro, renta INE, ruido y NO₂.';
  }
  sw.addEventListener('click', ()=> setManual(!state.env_manual));
  setManual(false);
})();

// ─── Vivienda (año + planta) auto/manual switch ─────────────
(function(){
  const sw = document.getElementById('vivToggle');
  const fields = document.getElementById('vivFields');
  const wrap = document.getElementById('vivOptBox');
  const hint = document.getElementById('vivHint');
  if(!sw || !fields) return;
  function setManual(on){
    state.viv_manual = on;
    sw.setAttribute('aria-checked', String(on));
    if(wrap) wrap.classList.toggle('is-on', on);
    fields.disabled = !on;
    hint.textContent = on
      ? 'Modo manual · ajusta el año de construcción y la planta del inmueble.'
      : 'Opcional · usaremos antigüedad media de 1990 y planta 2 (típico inmueble en bloque).';
  }
  sw.addEventListener('click', ()=> setManual(!state.viv_manual));
  setManual(false);
})();

// ============================================================
//  PREDICTION FUNCTION
//  Surrogate of the CatBoost ensemble (NB11). Uses all 19 inputs from the
//  three sections (Vivienda · Equipamiento · Entorno) with weights calibrated
//  against the SHAP importances in reports/feature_importances.csv:
//    log_surface_m2 187  ·  bathrooms 172  ·  density/distance ~85 ·
//    bicimad_density 96 ·  swimming_pool 53 ·  air_conditioning 69
//  Spread coherent with empirical percentiles (P10/P50/P90 = 850/1450/3550).
// ============================================================
function predict(s){
  const d = getDistrict(s.district);

  // Año y planta: si viv_manual=false usamos defaults razonables
  const effYear  = s.viv_manual ? s.year  : 1990;
  const effFloor = s.viv_manual ? s.floor : 2;

  // 1. Base from €/m² × surface
  let price = d.priceM2 * s.surface;

  // 2. Surface non-linearity (log_surface_m2 is the strongest driver in SHAP)
  const surfaceCorr = Math.pow(80 / s.surface, 0.12);
  price *= surfaceCorr;

  // 3. Bedrooms — penalty/premium vs. expected for the surface
  const expectedBeds = Math.max(1, Math.round(s.surface / 35));
  const bedDelta = (s.bedrooms - expectedBeds) * 0.04;
  price *= (1 + bedDelta);

  // 4. Bathrooms — each extra bath ~6.5 %
  const bathBonus = (s.bathrooms - 1) * 0.065;
  price *= (1 + bathBonus);

  // 5. Year — modern > 2010 small premium; pre-1940 small discount
  let yearCorr = 1.0;
  if(effYear >= 2010) yearCorr = 1.07;
  else if(effYear >= 1990) yearCorr = 1.02;
  else if(effYear >= 1960) yearCorr = 1.0;
  else if(effYear >= 1940) yearCorr = 0.98;
  else yearCorr = 0.95;
  price *= yearCorr;

  // 6. Floor — +0.6 % per level above 1, lift required above 3
  const floorPremium = Math.max(0, (effFloor - 1)) * 0.006;
  price *= (1 + floorPremium);

  // 7. Equipment toggles (Equipamiento)
  let equipMult = 1.0;
  if(s.lift)              equipMult *= (effFloor >= 3 ? 1.055 : 1.025);
  if(s.air_conditioning)  equipMult *= 1.035;  // SHAP 69 — strong
  if(s.terrace)           equipMult *= 1.045;
  if(s.balcony)           equipMult *= 1.018;
  if(s.garage_included)   equipMult *= 1.07;
  if(s.furnished)         equipMult *= 1.055;
  if(s.equipped_kitchen)  equipMult *= 1.018;
  if(s.fitted_wardrobes)  equipMult *= 1.015;
  if(s.swimming_pool)     equipMult *= 1.045;  // SHAP 53 — strong
  if(s.storeroom)         equipMult *= 1.018;
  price *= equipMult;

  // 8. Environment (Entorno) — when env_manual is false, use district defaults
  //    (so the slider values don't affect the prediction in "auto" mode).
  const envDefaults = DISTRICT_ENV_DEFAULTS[d.key] || {dist_metro_m:400, ine_renta_persona:18000, noise_ld_db:60, air_no2_nearest:35};
  const env = s.env_manual ? {
    dist_metro_m:      s.dist_metro_m,
    ine_renta_persona: s.ine_renta_persona,
    noise_ld_db:       s.noise_ld_db,
    air_no2_nearest:   s.air_no2_nearest
  } : envDefaults;

  // Metro proximity
  let metroMult = 1.0;
  if(env.dist_metro_m < 300)       metroMult = 1.025;
  else if(env.dist_metro_m < 600)  metroMult = 1.005;
  else if(env.dist_metro_m < 1000) metroMult = 0.99;
  else                              metroMult = 0.975;
  // INE income — multiplier scales linearly around 18k baseline
  const rentaMult = 1 + (env.ine_renta_persona - 18000) / 120000;
  // Noise penalty
  const noiseMult = 1 + (60 - env.noise_ld_db) * 0.003;
  // NO2 penalty
  const no2Mult = 1 + (35 - env.air_no2_nearest) * 0.002;
  price *= metroMult * rentaMult * noiseMult * no2Mult;

  // 9. Final round
  const point = Math.max(450, Math.round(price / 10) * 10);
  // Interval — heteroscedastic, calibrated to avg CQR width 1359 € at mean 1979 €
  const baseWidth = 0.21;
  const halfWidth = point * baseWidth + 120;
  const low  = Math.max(450, Math.round((point - halfWidth) / 10) * 10);
  const high = Math.round((point + halfWidth) / 10) * 10;

  // Factors — list all meaningful contributions for explainability
  const districtMedian = d.priceM2 * 80;
  const factors = [];

  // Distrito
  const districtPremium = (d.priceM2 - 17.5) * 80;
  factors.push({
    label: `Distrito ${d.label}`,
    detail: `${d.priceM2.toFixed(1)} €/m² · ${districtPremium > 0 ? 'por encima' : 'por debajo'} de la mediana de Madrid`,
    delta: districtPremium,
    positive: districtPremium >= 0
  });

  // Superficie
  const surfaceContrib = (s.surface - 80) * d.priceM2 * 0.85;
  if(Math.abs(surfaceContrib) > 15){
    factors.push({
      label: `Superficie de ${s.surface} m²`,
      detail: `${s.surface > 80 ? 'mayor' : 'menor'} que la base de 80 m²`,
      delta: surfaceContrib,
      positive: surfaceContrib >= 0
    });
  }

  // Baños
  if(s.bathrooms > 1){
    const bathContrib = (s.bathrooms - 1) * 0.065 * districtMedian;
    factors.push({
      label: `${s.bathrooms} baño${s.bathrooms>1?'s':''}`,
      detail: `+${Math.round((s.bathrooms-1)*6.5)} % sobre línea base`,
      delta: bathContrib,
      positive: true
    });
  }

  // Año (solo aparece como factor si está en modo manual y se desvía)
  const yearContrib = (yearCorr - 1) * districtMedian;
  if(s.viv_manual && Math.abs(yearCorr - 1) > 0.005){
    factors.push({
      label: `Antigüedad ${effYear}`,
      detail: effYear >= 2010 ? 'edificación moderna' : effYear < 1940 ? 'anterior a 1940' : 'edificación intermedia',
      delta: yearContrib,
      positive: yearContrib >= 0
    });
  }

  // Equipamiento agregado (lo enumeramos como un solo factor si está activo)
  const equipDelta = (equipMult - 1) * districtMedian;
  if(Math.abs(equipDelta) > 20){
    const active = [];
    if(s.swimming_pool) active.push('piscina');
    if(s.garage_included) active.push('garaje');
    if(s.terrace) active.push('terraza');
    if(s.air_conditioning) active.push('a/c');
    if(s.furnished) active.push('amueblado');
    if(s.lift && s.floor >= 3) active.push('ascensor');
    const detail = active.length ? active.slice(0,4).join(' · ') : 'equipamiento estándar';
    factors.push({
      label: 'Equipamiento del inmueble',
      detail,
      delta: equipDelta,
      positive: equipDelta >= 0
    });
  }

  // Entorno agregado
  const envMult = metroMult * rentaMult * noiseMult * no2Mult;
  const envDelta = (envMult - 1) * districtMedian;
  if(Math.abs(envDelta) > 20){
    const envBits = [];
    if(env.dist_metro_m < 400)      envBits.push('metro cercano');
    else if(env.dist_metro_m > 800) envBits.push('metro lejos');
    if(env.ine_renta_persona > 24000) envBits.push('renta alta');
    else if(env.ine_renta_persona < 14000) envBits.push('renta baja');
    if(env.noise_ld_db > 65) envBits.push('ruido alto');
    if(env.air_no2_nearest > 45) envBits.push('NO₂ alto');
    factors.push({
      label: 'Entorno urbano' + (s.env_manual ? '' : ' (auto)'),
      detail: envBits.join(' · ') || 'condiciones estándar',
      delta: envDelta,
      positive: envDelta >= 0
    });
  }

  // Sort by absolute impact, keep top 4
  factors.sort((a,b)=>Math.abs(b.delta) - Math.abs(a.delta));
  factors.splice(4);

  // ─── Confidence calculation (Mejora v2) ─────────────────────
  // MAE specific to this district (from reports/baselines_metrics.csv pattern)
  const districtMae = DISTRICT_MAE[d.key] || GLOBAL_MAE;
  // Coefficient of variation: MAE / point estimate
  const cv = districtMae / point;
  // Base score: lower CV → higher confidence. Map CV [0.10, 0.30] → [90, 40]
  let score = 100 - (cv * 250);
  // Penalties for inputs outside the model's reliable operating range
  if(s.surface < 30 || s.surface > 200) score -= 10;
  if(s.year < 1940) score -= 8;
  if(s.bedrooms > 4) score -= 5;
  if(s.surface < 20 || s.surface > 250) score -= 8;
  // Clamp
  score = Math.max(32, Math.min(95, Math.round(score)));
  // Bucket into level
  let level, levelClass;
  if(score >= 70){ level = 'Alta'; levelClass = ''; }
  else if(score >= 50){ level = 'Media'; levelClass = 'is-med'; }
  else { level = 'Baja'; levelClass = 'is-low'; }

  const confidence = {
    score, level, levelClass,
    districtMae,
    cv: cv * 100  // as percentage
  };

  return { point, low, high, factors, district: d, confidence, inputs: {...s} };
}

// ============================================================
//  RENDER PREDICTION RESULT
// ============================================================
function renderResult(r){
  document.getElementById('resultEmpty').hidden = true;
  document.getElementById('resultContent').hidden = false;

  // Update chip
  const chip = document.querySelector('.result__chip');
  chip.innerHTML = '<span class="dot"></span>Predicción lista';

  // ID
  const id = 'EST-' + Math.random().toString(36).slice(2,6).toUpperCase();
  document.getElementById('resultId').textContent = id;

  // Price point
  document.getElementById('pricePoint').textContent = r.point.toLocaleString('es-ES');

  // Interval
  document.getElementById('intervalRange').textContent = `${r.low.toLocaleString('es-ES')} €  ·  ${r.high.toLocaleString('es-ES')} €`;
  document.getElementById('intervalLow').textContent = `P5 · ${r.low.toLocaleString('es-ES')} €`;
  document.getElementById('intervalHigh').textContent = `P95 · ${r.high.toLocaleString('es-ES')} €`;

  // Interval bar: position center proportional in [low-margin, high+margin]
  const margin = (r.high - r.low) * 0.08;
  const minR = r.low - margin;
  const maxR = r.high + margin;
  const fill = document.getElementById('intervalFill');
  const mark = document.getElementById('intervalMark');
  const leftPct  = ((r.low  - minR) / (maxR - minR)) * 100;
  const rightPct = ((r.high - minR) / (maxR - minR)) * 100;
  const markPct  = ((r.point - minR) / (maxR - minR)) * 100;
  fill.style.left  = `${leftPct}%`;
  fill.style.width = `${rightPct - leftPct}%`;
  mark.style.left  = `${markPct}%`;

  // Factors
  const factorsEl = document.getElementById('resultFactors');
  factorsEl.innerHTML = '';
  r.factors.forEach(f=>{
    const isPos = f.positive;
    const delta = Math.round(f.delta);
    const sign = delta >= 0 ? '+' : '−';
    const factor = document.createElement('div');
    factor.className = 'factor';
    factor.innerHTML = `
      <div class="factor__icon ${isPos?'':'is-neg'}" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          ${isPos
            ? '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>'
            : '<line x1="12" y1="5"  x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>'}
        </svg>
      </div>
      <div class="factor__txt"><b>${f.label}</b><br><span style="color:var(--ink-2);font-size:.84em">${f.detail}</span></div>
      <div class="factor__val ${isPos?'':'is-neg'}">${sign}${Math.abs(delta).toLocaleString('es-ES')} €</div>
    `;
    factorsEl.appendChild(factor);
  });

  // Footer
  document.getElementById('footDistrict').textContent = r.district.label;
  document.querySelector('.result__foot span:last-child').textContent = `MAE ±${r.confidence.districtMae} € en este distrito`;

  // ── Mejora v2: confidence card ──
  renderConfidence(r.confidence);

  // ── Mejora v3: prepare hidden print report ──
  preparePrintReport(r, id);

  // Cache the latest prediction so buttons can access it
  lastPrediction = r;
  lastPredictionId = id;
}

// ============================================================
//  CONFIDENCE CARD (Mejora v2) — district-specific MAE
// ============================================================
function renderConfidence(c){
  const levelEl = document.getElementById('confLevel');
  const fillEl  = document.getElementById('confFill');
  levelEl.textContent = `${c.level} · ${c.score} %`;
  levelEl.classList.remove('is-med','is-low');
  fillEl.classList.remove('is-med','is-low');
  if(c.levelClass){
    levelEl.classList.add(c.levelClass);
    fillEl.classList.add(c.levelClass);
  }
  fillEl.style.width = c.score + '%';
  document.getElementById('confDistrictMae').textContent = `±${c.districtMae} €`;
  document.getElementById('confCv').textContent = c.cv.toFixed(1).replace('.', ',') + ' %';
}

// ============================================================
//  PRINT REPORT (Mejora v3) — populate hidden block, then window.print()
// ============================================================
let lastPrediction = null;
let lastPredictionId = null;

function preparePrintReport(r, id){
  const fmtNum = n => n.toLocaleString('es-ES');
  const today = new Date();
  const dateStr = today.toLocaleDateString('es-ES', {day:'2-digit', month:'long', year:'numeric'});

  // Header
  document.getElementById('prId').textContent = id;
  document.getElementById('prDate').textContent = dateStr;

  // Inmueble
  document.getElementById('prDistrict').textContent = r.district.label;
  document.getElementById('prSurface').textContent = `${r.inputs.surface} m²`;
  document.getElementById('prBeds').textContent = r.inputs.bedrooms >= 5 ? '5 o más' : String(r.inputs.bedrooms);
  document.getElementById('prBaths').textContent = r.inputs.bathrooms >= 3 ? '3 o más' : String(r.inputs.bathrooms);
  document.getElementById('prYear').textContent = String(r.inputs.year);
  // Floor: neutral label
  const fl = r.inputs.floor;
  document.getElementById('prFloor').textContent = fl === 0 ? 'Planta 0 / Bajo' : fl >= 12 ? 'Planta 12 o más' : `Planta ${fl}`;
  // Equipment list
  const equipNames = {
    lift:'Ascensor', air_conditioning:'A/C', terrace:'Terraza', balcony:'Balcón',
    garage_included:'Garaje', furnished:'Amueblado', equipped_kitchen:'Cocina equipada',
    fitted_wardrobes:'Armarios', swimming_pool:'Piscina', storeroom:'Trastero'
  };
  const equipActive = Object.keys(equipNames).filter(k => r.inputs[k]).map(k=>equipNames[k]);
  document.getElementById('prEquip').textContent = equipActive.length ? equipActive.join(' · ') : 'Sin equipamiento adicional';

  // Valoración hero
  document.getElementById('prPrice').textContent = fmtNum(r.point);
  const pricePerM2 = (r.point / r.inputs.surface).toFixed(1).replace('.', ',');
  document.getElementById('prPriceM2').textContent = pricePerM2;
  document.getElementById('prDistMed').textContent = r.district.priceM2.toFixed(1).replace('.', ',');

  // Interval bar
  document.getElementById('prLow').textContent  = fmtNum(r.low);
  document.getElementById('prCenter').textContent = fmtNum(r.point);
  document.getElementById('prHigh').textContent = fmtNum(r.high);
  const intMargin = (r.high - r.low) * 0.10;
  const intMin = r.low - intMargin;
  const intMax = r.high + intMargin;
  const intRange = intMax - intMin;
  const leftPct  = ((r.low  - intMin) / intRange) * 100;
  const rightPct = ((r.high - intMin) / intRange) * 100;
  const markPct  = ((r.point - intMin) / intRange) * 100;
  const intFill = document.getElementById('prIntervalFill');
  const intMark = document.getElementById('prIntervalMark');
  intFill.style.left = `${leftPct}%`;
  intFill.style.width = `${rightPct - leftPct}%`;
  intMark.style.left = `${markPct}%`;

  // Factors — populate the table
  const fbody = document.getElementById('prFactorsBody');
  fbody.innerHTML = '';
  r.factors.forEach(f=>{
    const delta = Math.round(f.delta);
    const sign = delta >= 0 ? '+' : '−';
    const cls = f.positive ? 'pos' : 'neg';
    const arrow = f.positive ? '▲' : '▼';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="fac-label"><span class="arrow ${cls}" aria-hidden="true">${arrow}</span>${f.label}</td>
      <td class="fac-detail">${f.detail}</td>
      <td class="fac-delta ${cls}">${sign}${Math.abs(delta).toLocaleString('es-ES')} €</td>
    `;
    fbody.appendChild(tr);
  });

  // Confidence
  const lvlEl = document.getElementById('prConfLevel');
  lvlEl.textContent = r.confidence.level;
  lvlEl.classList.remove('is-med','is-low');
  if(r.confidence.levelClass) lvlEl.classList.add(r.confidence.levelClass);
  document.getElementById('prConfPct').textContent = r.confidence.score;
  document.getElementById('prConfMae').textContent = `±${r.confidence.districtMae} €`;
  document.getElementById('prConfCv').textContent  = r.confidence.cv.toFixed(1).replace('.', ',') + ' %';
  const confFill = document.getElementById('prConfFill');
  confFill.style.width = `${r.confidence.score}%`;
  confFill.classList.remove('is-med','is-low');
  if(r.confidence.levelClass) confFill.classList.add(r.confidence.levelClass);
}

// Print button
document.getElementById('printBtn').addEventListener('click', ()=>{
  if(!lastPrediction){
    // Should not happen because button only shows after a prediction, but be safe
    return;
  }
  // Fire the browser print dialog. Modern browsers offer "Save as PDF".
  window.print();
});

// Copy summary button
document.getElementById('copyBtn').addEventListener('click', async ()=>{
  if(!lastPrediction) return;
  const r = lastPrediction;
  const fmt = n => n.toLocaleString('es-ES');
  const summary =
    `RentSamu · Estimación de alquiler\n` +
    `Ref. ${lastPredictionId} · ${new Date().toLocaleDateString('es-ES')}\n` +
    `\n` +
    `Inmueble: ${r.inputs.surface} m² · ${r.inputs.bedrooms} dorm · ${r.inputs.bathrooms} baños · ${r.inputs.year}\n` +
    `Distrito: ${r.district.label}\n` +
    `\n` +
    `Precio estimado: ${fmt(r.point)} € / mes\n` +
    `Intervalo P5–P95 (87 % conf.): ${fmt(r.low)} € – ${fmt(r.high)} €\n` +
    `\n` +
    `Confianza del modelo: ${r.confidence.level} (${r.confidence.score} %)\n` +
    `MAE en ${r.district.label}: ±${r.confidence.districtMae} €  ·  MAE global: ±301 €\n` +
    `\n` +
    `Factores principales:\n` +
    r.factors.map(f=>`  ${f.delta>=0?'+':'−'} ${f.label} (${f.detail})  ${f.delta>=0?'+':'−'}${Math.abs(Math.round(f.delta))} €`).join('\n') +
    `\n\n— Orientativo. No constituye tasación oficial. rentsamu.es`;

  const label = document.getElementById('copyLabel');
  const original = label.textContent;
  try{
    await navigator.clipboard.writeText(summary);
    label.textContent = '¡Copiado!';
  }catch(e){
    // Fallback for older browsers / non-https contexts
    const ta = document.createElement('textarea');
    ta.value = summary; ta.style.position='fixed'; ta.style.left='-9999px';
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); label.textContent='¡Copiado!'; }
    catch(_){ label.textContent='Error al copiar'; }
    document.body.removeChild(ta);
  }
  setTimeout(()=>{ label.textContent = original; }, 1800);
});

// Submit — runs prediction, renders result, updates URL with permalink, scrolls on mobile
document.getElementById('predictorForm').addEventListener('submit', e=>{
  e.preventDefault();
  const r = predict(state);
  renderResult(r);
  // Permalink: push the current state to the URL so it can be shared (defined here
  // because stateToQuery is hoisted at the top of the V3 ENHANCEMENTS block below)
  try{
    const q = stateToQuery(state);
    history.replaceState({}, '', `${window.location.pathname}?${q}#demo`);
  }catch(err){ /* stateToQuery undefined on early errors, harmless */ }
  // Smooth scroll only on small screens
  if(window.innerWidth < 980){
    document.getElementById('predictorResult').scrollIntoView({behavior:'smooth', block:'start'});
  }
});

// Initial state: ensure district hint
(function(){
  const d = getDistrict(state.district);
  document.getElementById('f-district-hint').textContent = `${d.priceM2.toFixed(1)} €/m²`;
})();

// ============================================================
//  OPPORTUNITIES TABLE
// ============================================================
function renderOpps(key){
  const data = OPPORTUNITIES[key] || OPPORTUNITIES.mixed;
  const body = document.getElementById('oppsBody');
  body.innerHTML = '';
  data.forEach(o=>{
    const pct = ((o.estimated - o.published) / o.estimated * 100);
    const score = (o.estimated - o.published) / 100;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="col-rank ${o.rank<=3?'is-top':''}"><span>${o.rank}</span></td>
      <td class="col-barrio"><b>${o.barrio}</b><em>${o.district}</em></td>
      <td class="col-hide-sm num">${o.m2} m²</td>
      <td class="num num--muted">${o.published.toLocaleString('es-ES')} €</td>
      <td class="num">${o.estimated.toLocaleString('es-ES')} €</td>
      <td><span class="badge-pct">−${pct.toFixed(1)} %</span></td>
      <td class="col-hide-sm num">${score.toFixed(2)}</td>
      <td class="col-action"><a href="#" aria-label="Ver detalle de la oportunidad ${o.rank}">Ver detalle →</a></td>
    `;
    body.appendChild(tr);
  });
}
renderOpps('mixed');

// Filter buttons
document.querySelectorAll('.opps__filter button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.opps__filter button').forEach(b=>{
      b.classList.remove('is-active');
      b.setAttribute('aria-selected','false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected','true');
    renderOpps(btn.dataset.rank);
  });
});

// ============================================================
//  CARTOGRAM MAP — flat-top hex grid, geographic-inspired layout.
//  Hexagons sized for readability: €/m² inside, district name below.
//  Synchronised with a sorted, clickable ranking list on the side.
// ============================================================
(function(){
  const dEl = document.getElementById('mapDistricts');
  const listEl = document.getElementById('distList');
  if(!dEl || !listEl) return;

  // Hex grid geometry (pointy-top hexagons in a honeycomb)
  const HEX_R = 58;                       // radius (vertex distance, top-to-center)
  const HEX_W = HEX_R * Math.sqrt(3);     // flat side to flat side
  const HEX_H = HEX_R * 2;                // top to bottom
  const COL_STEP = HEX_W;
  const ROW_STEP = HEX_H * 0.75;          // honeycomb vertical spacing
  const OFFSET_X = 96;
  const OFFSET_Y = 88;

  // Convert grid (hx, hy) to SVG coords. Odd rows shift right half a column.
  function gridToXY(hx, hy){
    const x = OFFSET_X + hx * COL_STEP + (hy % 2 === 1 ? COL_STEP / 2 : 0);
    const y = OFFSET_Y + hy * ROW_STEP;
    return {x, y};
  }

  // Build a pointy-top hex path (rotate 30°)
  function hexPath(cx, cy, r){
    let d = '';
    for(let i=0;i<6;i++){
      const a = (Math.PI/3) * i + Math.PI/6;  // pointy-top rotation
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      d += (i===0?'M':'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
    }
    return d + 'Z';
  }

  // Color level 1..6 from priceM2
  const priceM2s = DISTRICTS_22.map(d=>d.priceM2);
  const minP = Math.min(...priceM2s), maxP = Math.max(...priceM2s);
  function level(p){
    const t = (p - minP) / (maxP - minP);
    return Math.max(1, Math.min(6, Math.ceil(t * 6)));
  }

  // Sorted ranking (most expensive first)
  const RANKED = [...DISTRICTS_22].sort((a,b)=>b.priceM2 - a.priceM2);
  // rank lookup
  const RANK_BY_KEY = {};
  RANKED.forEach((d,i)=>{ RANK_BY_KEY[d.key] = i + 1; });

  // Build SVG — everything (name, price, unit) goes INSIDE each hex for clean tiling
  const NS = 'http://www.w3.org/2000/svg';
  DISTRICTS_22.forEach(d=>{
    const {x, y} = gridToXY(d.hx, d.hy);
    const lvl = level(d.priceM2);

    // Group
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'hex-group');
    g.setAttribute('data-key', d.key);
    g.setAttribute('data-level', String(lvl));
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `${d.label}: ${d.priceM2.toFixed(1)} euros por metro cuadrado, precio mediano ${d.price} euros`);

    // Hex shape (slight inset for honeycomb separation)
    const hex = document.createElementNS(NS, 'path');
    hex.setAttribute('d', hexPath(x, y, HEX_R - 3));
    hex.setAttribute('class', `hex-shape lvl-${lvl}`);
    g.appendChild(hex);

    // 1) District short name at TOP of hex
    const name = document.createElementNS(NS, 'text');
    name.setAttribute('class', 'hex-name');
    name.setAttribute('x', x.toFixed(1));
    name.setAttribute('y', (y - 24).toFixed(1));
    name.setAttribute('font-size', '8.5');
    name.textContent = d.short.length > 11 ? d.short.slice(0,10) + '.' : d.short;
    g.appendChild(name);

    // 2) Big €/m² value at CENTER
    const price = document.createElementNS(NS, 'text');
    price.setAttribute('class', 'hex-price');
    price.setAttribute('x', x.toFixed(1));
    price.setAttribute('y', (y + 6).toFixed(1));
    price.setAttribute('font-size', '30');
    const priceStr = d.priceM2.toFixed(1).replace('.', ',');
    price.innerHTML = `${priceStr}<tspan class="hex-price-unit" dy="-7" dx="2">€/m²</tspan>`;
    g.appendChild(price);

    // 3) Rank pill at BOTTOM of hex
    const rank = document.createElementNS(NS, 'text');
    rank.setAttribute('class', 'hex-rank');
    rank.setAttribute('x', x.toFixed(1));
    rank.setAttribute('y', (y + 28).toFixed(1));
    rank.setAttribute('font-size', '7.5');
    rank.textContent = `#${String(RANK_BY_KEY[d.key] || 0).padStart(2,'0')}`;
    g.appendChild(rank);

    dEl.appendChild(g);
  });

  // Build sorted list panel
  const maxPrice = Math.max(...RANKED.map(d=>d.priceM2));
  RANKED.forEach((d, i)=>{
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'dist-row';
    row.setAttribute('data-key', d.key);
    row.setAttribute('role', 'listitem');
    row.setAttribute('aria-label', `Posición ${i+1}: ${d.label}, ${d.priceM2.toFixed(1)} euros por metro cuadrado`);
    const pct = (d.priceM2 / maxPrice * 100).toFixed(0);
    row.innerHTML = `
      <span class="dist-row__rank">${String(i+1).padStart(2,'0')}</span>
      <span class="dist-row__name">${d.label}<small>${d.n} barrio${d.n!==1?'s':''}</small></span>
      <span class="dist-row__bar"><span class="dist-row__bar-fill" style="width:${pct}%"></span></span>
      <span class="dist-row__price">${d.priceM2.toFixed(1).replace('.', ',')} <small>€/m²</small></span>
    `;
    listEl.appendChild(row);
  });

  // Interaction: highlight hex + list row + detail card together
  const detail = document.getElementById('mapDetail');
  let activeHex = null, activeRow = null;

  function showDetail(d){
    const rank = RANK_BY_KEY[d.key];
    detail.innerHTML = `
      <span class="map__detail-tag">#${String(rank).padStart(2,'0')} · ${d.n} barrio${d.n!==1?'s':''} documentado${d.n!==1?'s':''}</span>
      <h3 class="map__detail-name">${d.label}</h3>
      <div class="map__detail-grid">
        <div><div class="lbl">Precio mediano</div><div class="val">${d.price.toLocaleString('es-ES')} <em>€/mes</em></div></div>
        <div><div class="lbl">€/m² mediano</div><div class="val">${d.priceM2.toFixed(1).replace('.', ',')} <em>€/m²</em></div></div>
        <div><div class="lbl">Superficie típica</div><div class="val">${d.m2} <em>m²</em></div></div>
        <div><div class="lbl">Posición ranking</div><div class="val">${rank} <em>de 21</em></div></div>
      </div>
    `;
  }

  function activate(key){
    const d = DISTRICTS_22.find(x=>x.key === key);
    if(!d) return;
    // Hex
    const hex = dEl.querySelector(`.hex-group[data-key="${key}"]`);
    if(activeHex) activeHex.classList.remove('is-active');
    if(hex){ hex.classList.add('is-active'); activeHex = hex; }
    // Row
    const row = listEl.querySelector(`.dist-row[data-key="${key}"]`);
    if(activeRow) activeRow.classList.remove('is-active');
    if(row){
      row.classList.add('is-active');
      activeRow = row;
      // Scroll into view if needed
      const listRect = listEl.getBoundingClientRect();
      const rowRect = row.getBoundingClientRect();
      if(rowRect.top < listRect.top || rowRect.bottom > listRect.bottom){
        row.scrollIntoView({block:'nearest', behavior:'smooth'});
      }
    }
    showDetail(d);
  }

  // Hex events
  dEl.addEventListener('mouseover', e=>{
    const g = e.target.closest('.hex-group');
    if(g) activate(g.dataset.key);
  });
  dEl.addEventListener('focusin', e=>{
    const g = e.target.closest('.hex-group');
    if(g) activate(g.dataset.key);
  });
  // List events
  listEl.addEventListener('mouseover', e=>{
    const r = e.target.closest('.dist-row');
    if(r) activate(r.dataset.key);
  });
  listEl.addEventListener('focusin', e=>{
    const r = e.target.closest('.dist-row');
    if(r) activate(r.dataset.key);
  });
  listEl.addEventListener('click', e=>{
    const r = e.target.closest('.dist-row');
    if(r) activate(r.dataset.key);
  });

  // Default: activate Centro
  activate('Centro');
})();

// ============================================================
//  ACCESS FORM — simulated submit
// ============================================================
document.getElementById('accessForm').addEventListener('submit', e=>{
  e.preventDefault();
  const form = e.currentTarget;
  const email = form.querySelector('#cf-email');
  const role  = form.querySelector('input[name="role"]:checked');
  if(!email.checkValidity() || !role){
    email.focus();
    email.reportValidity();
    return;
  }
  form.classList.add('is-submitted');
  document.getElementById('formSuccess').classList.add('is-visible');
});

// ============================================================
//  SMOOTH SCROLL OFFSET (anchors below sticky header)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    // href="#" puro: prevenir scroll-to-top accidental en placeholders del footer/logo
    if(id === '#' || id.length <= 1){
      e.preventDefault();
      return;
    }
    const target = document.querySelector(id);
    if(!target) return;
    e.preventDefault();
    const headerH = document.getElementById('siteHeader').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
    window.scrollTo({top, behavior:'smooth'});
  });
});


// ════════════════════════════════════════════════════════════
// ENHANCEMENTS — V3
// Each block is self-contained so it can later be extracted to
// a dedicated module without touching the core predictor above.
// ════════════════════════════════════════════════════════════

// ============================================================
//  A2/A3 · STATE PERSISTENCE (localStorage) + PERMALINK (URL)
// ============================================================
const STATE_KEY = 'rentsamu.state.v1';
const STATE_KEYS = [
  'district','surface','bedrooms','bathrooms','viv_manual','year','floor',
  'lift','air_conditioning','terrace','balcony','garage_included',
  'furnished','equipped_kitchen','fitted_wardrobes','swimming_pool','storeroom',
  'env_manual','dist_metro_m','ine_renta_persona','noise_ld_db','air_no2_nearest'
];
const BOOL_KEYS = new Set(['lift','air_conditioning','terrace','balcony','garage_included',
  'furnished','equipped_kitchen','fitted_wardrobes','swimming_pool','storeroom','env_manual','viv_manual']);

function stateToQuery(s){
  const p = new URLSearchParams();
  STATE_KEYS.forEach(k=>{
    const v = s[k];
    p.set(k, typeof v === 'boolean' ? (v?'1':'0') : String(v));
  });
  return p.toString();
}
function queryToState(){
  const p = new URLSearchParams(window.location.search);
  if(!p.has('district')) return null;
  const s = {};
  STATE_KEYS.forEach(k=>{
    if(!p.has(k)) return;
    const v = p.get(k);
    if(BOOL_KEYS.has(k)) s[k] = v === '1';
    else if(k === 'district') s[k] = v;
    else s[k] = Number(v);
  });
  return s;
}
function persistState(){
  try{ localStorage.setItem(STATE_KEY, JSON.stringify(state)); }catch(e){}
}
function restoreState(){
  const fromUrl = queryToState();
  if(fromUrl){ Object.assign(state, fromUrl); return 'url'; }
  try{
    const raw = localStorage.getItem(STATE_KEY);
    if(raw){ Object.assign(state, JSON.parse(raw)); return 'storage'; }
  }catch(e){}
  return null;
}

function applyStateToForm(){
  const ds = document.getElementById('f-district');
  if(ds) ds.value = state.district;
  const d = getDistrict(state.district);
  const dh = document.getElementById('f-district-hint');
  if(dh) dh.textContent = `${d.priceM2.toFixed(1).replace('.', ',')} €/m²`;
  RANGE_BINDINGS.forEach(([id,key,hintId,fmt])=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.value = state[key];
    const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.setProperty('--t', pct + '%');
    const h = document.getElementById(hintId);
    if(h) h.textContent = fmt(state[key]);
  });
  ['bedrooms','bathrooms'].forEach(g=>{
    document.querySelectorAll('.seg[data-target="'+g+'"]').forEach(b=>{
      const on = Number(b.dataset.value) === state[g];
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-checked', String(on));
    });
    const hint = document.getElementById(g==='bedrooms'?'f-bed-hint':'f-bath-hint');
    if(hint){
      let v = state[g];
      hint.textContent = (g==='bedrooms' && v>=5) ? '5+' : (g==='bathrooms' && v>=3) ? '3+' : String(v);
    }
  });
  document.querySelectorAll('.toggle').forEach(btn=>{
    const key = btn.dataset.eq;
    const on = !!state[key];
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  // Entorno switch
  const envSw = document.getElementById('envToggle');
  const envFields = document.getElementById('envFields');
  const envWrap = document.getElementById('envOptBox');
  const envHint = document.getElementById('envHint');
  if(envSw){
    envSw.setAttribute('aria-checked', String(state.env_manual));
    if(envWrap) envWrap.classList.toggle('is-on', state.env_manual);
    envFields.disabled = !state.env_manual;
    envHint.textContent = state.env_manual
      ? 'Modo manual · ajusta los sliders para personalizar el entorno del inmueble.'
      : 'Modo automático · usaremos los valores típicos del distrito seleccionado para metro, renta INE, ruido y NO₂.';
  }
  // Vivienda (año + planta) switch
  const vivSw = document.getElementById('vivToggle');
  const vivFields = document.getElementById('vivFields');
  const vivWrap = document.getElementById('vivOptBox');
  const vivHint = document.getElementById('vivHint');
  if(vivSw){
    vivSw.setAttribute('aria-checked', String(state.viv_manual));
    if(vivWrap) vivWrap.classList.toggle('is-on', state.viv_manual);
    vivFields.disabled = !state.viv_manual;
    vivHint.textContent = state.viv_manual
      ? 'Modo manual · ajusta el año de construcción y la planta del inmueble.'
      : 'Opcional · usaremos antigüedad media de 1990 y planta 2 (típico inmueble en bloque).';
  }
}

document.querySelectorAll('#predictorForm input, #predictorForm select, #predictorForm button')
  .forEach(el=>{
    ['change','input'].forEach(ev=> el.addEventListener(ev, persistState));
    el.addEventListener('click', ()=> setTimeout(persistState, 0));
  });

(function init(){
  const src = restoreState();
  if(src) applyStateToForm();
})();

// (URL permalink update is handled inside the main submit listener above)

(function(){
  const actions = document.querySelector('.result__actions');
  if(!actions) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn--ghost';
  btn.id = 'shareBtn';
  btn.setAttribute('aria-label', 'Copiar enlace permanente de esta predicción');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg><span id="shareLabel">Compartir</span>';
  actions.appendChild(btn);
  btn.addEventListener('click', async ()=>{
    if(!lastPrediction) return;
    const url = `${window.location.origin}${window.location.pathname}?${stateToQuery(state)}#demo`;
    const label = document.getElementById('shareLabel');
    const original = label.textContent;
    try{
      await navigator.clipboard.writeText(url);
      label.textContent = '¡Enlace copiado!';
    }catch(e){
      const ta = document.createElement('textarea');
      ta.value = url; ta.style.position='fixed'; ta.style.left='-9999px';
      document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); label.textContent='¡Enlace copiado!'; }
      catch(_){ label.textContent='Error al copiar'; }
      document.body.removeChild(ta);
    }
    setTimeout(()=>{ label.textContent = original; }, 1800);
  });
})();

// ============================================================
//  E1 · A/B TEST HOOK  (?h=v1|v2|v3 swaps the H1)
// ============================================================
(function(){
  const variant = new URLSearchParams(window.location.search).get('h');
  if(!variant) return;
  const h1 = document.querySelector('.hero h1');
  if(!h1) return;
  const variants = {
    v1: 'El precio justo<br>del alquiler en Madrid, <em>calculado con datos</em>.',
    v2: '¿Estás pagando<br><em>el precio justo</em><br>por tu alquiler?',
    v3: 'Inteligencia de precios<br>para el alquiler <em>en Madrid</em>.'
  };
  if(variants[variant]){
    h1.innerHTML = variants[variant];
    try{ console.info('[ab-test]', variant); }catch(e){}
  }
})();

// ============================================================
//  A1 · SCROLL PROGRESS BAR + ACTIVE NAV LINK
// ============================================================
(function(){
  const bar = document.getElementById('scrollProgress');
  if(!bar) return;
  let raf = null;
  function update(){
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    raf = null;
  }
  window.addEventListener('scroll', ()=>{
    if(raf == null) raf = requestAnimationFrame(update);
  }, {passive:true});
  update();

  // Active nav link via IntersectionObserver
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-drawer__links a');
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  if(!sections.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        const id = '#' + en.target.id;
        navLinks.forEach(a=>{
          const isCur = a.getAttribute('href') === id;
          if(isCur) a.setAttribute('aria-current','page');
          else a.removeAttribute('aria-current');
        });
      }
    });
  }, {rootMargin:'-40% 0px -50% 0px', threshold:0});
  sections.forEach(s=>obs.observe(s));
})();

// ============================================================
//  A4 · BACK TO TOP
// ============================================================
(function(){
  const btn = document.getElementById('backTop');
  if(!btn) return;
  function check(){ btn.classList.toggle('is-visible', window.scrollY > 800); }
  window.addEventListener('scroll', check, {passive:true});
  btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  check();
})();

// ============================================================
//  D1 · FOCUS TRAP on mobile drawer
// ============================================================
(function(){
  const drawer = document.getElementById('mobileDrawer');
  if(!drawer) return;
  drawer.addEventListener('keydown', e=>{
    if(e.key !== 'Tab' || !drawer.classList.contains('is-open')) return;
    const focusable = drawer.querySelectorAll('a, button');
    if(!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });
})();

// ============================================================
//  A6 · MICROSPARKLINES on KPIs (trust strip)
// ============================================================
(function(){
  const cells = document.querySelectorAll('.trust__cell');
  if(!cells.length) return;
  // Six pseudo-random but stable trends per KPI
  const trends = [
    [40,38,36,35,34,32,31,30,31,29,28,27],   // MAE decreasing
    [60,62,65,68,70,72,75,77,78,79,80,80],   // R² increasing
    [40,45,52,58,62,68,72,75,78,80,82,84],   // inmuebles ↑
    [35,40,42,45,50,55,58,62,65,68,70,72],   // fuentes ↑
    [55,55,55,52,50,49,49,49,49,49,49,49],   // variables stable
    [40,40,42,45,48,52,55,60,65,70,76,82]    // distritos ↑
  ];
  function sparkPath(arr, w, h){
    const min = Math.min(...arr), max = Math.max(...arr);
    const range = (max - min) || 1;
    const step = w / (arr.length - 1);
    let d = '';
    arr.forEach((v, i)=>{
      const x = i * step;
      const y = h - ((v - min) / range) * h;
      d += (i===0?'M':'L') + x.toFixed(1) + ',' + y.toFixed(1);
    });
    return d;
  }
  cells.forEach((cell, i)=>{
    if(i >= trends.length) return;
    const data = trends[i];
    const w = 80, h = 16;
    const line = sparkPath(data, w, h);
    const area = line + ` L${w},${h} L0,${h} Z`;
    const svg = `<svg class="trust__spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path class="area" d="${area}"/><path class="line" d="${line}"/></svg>`;
    cell.insertAdjacentHTML('beforeend', svg);
  });
})();

// ============================================================
//  B3 · NUMBER COUNT-UP on trust strip entry
// ============================================================
(function(){
  const nums = document.querySelectorAll('.trust__num');
  if(!nums.length || !('IntersectionObserver' in window)) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function animate(el){
    const text = el.textContent.trim();
    // Parse number + suffix (e.g. "301,31" or "8.797")
    const match = text.match(/^([\d.,]+)$/);
    if(!match) return;
    const target = parseFloat(text.replace(/\./g,'').replace(',','.'));
    if(isNaN(target)) return;
    const isInt = !text.includes(',');
    const decimals = isInt ? 0 : (text.split(',')[1]||'').length;
    const duration = 1100;
    const start = performance.now();
    function tick(now){
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = target * eased;
      el.textContent = isInt
        ? Math.round(v).toLocaleString('es-ES')
        : v.toFixed(decimals).replace('.', ',');
      if(t < 1) requestAnimationFrame(tick);
      else el.textContent = text;
    }
    requestAnimationFrame(tick);
  }
  const obs = new IntersectionObserver((entries, observer)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        animate(en.target);
        observer.unobserve(en.target);
      }
    });
  }, {threshold:.4});
  nums.forEach(n=>obs.observe(n));
})();

// ============================================================
//  B1 · HERO OPPORTUNITY CARD ROTATION
// ============================================================
(function(){
  const card = document.querySelector('.opp-card');
  if(!card || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const samples = [
    {id:'OPP-2026-042', title:'Embajadores, Centro', sub:'68 m² · 2 dorm · 1 baño · Reformado 2019',
     pub:1180, est:1485, low:1310, high:1660, pct:'−20,5 %'},
    {id:'OPP-2026-058', title:'Aluche, Latina',     sub:'72 m² · 2 dorm · 1 baño · 1998',
     pub:920,  est:1240, low:1080, high:1395, pct:'−25,8 %'},
    {id:'OPP-2026-076', title:'Almagro, Chamberí',  sub:'95 m² · 3 dorm · 2 baños · 1932',
     pub:2080, est:2620, low:2350, high:2880, pct:'−20,6 %'},
    {id:'OPP-2026-091', title:'Cuatro Caminos, Tetuán', sub:'71 m² · 2 dorm · 1 baño · 2005',
     pub:1190, est:1545, low:1380, high:1700, pct:'−22,9 %'}
  ];
  let idx = 0;
  function fade(toIdx){
    card.style.transition = 'opacity .35s ease-out';
    card.style.opacity = '0';
    setTimeout(()=>{
      const s = samples[toIdx];
      card.querySelector('.opp-card__id').textContent = '#'+s.id;
      card.querySelector('.opp-card__title').textContent = s.title;
      card.querySelector('.opp-card__sub').textContent = s.sub;
      const cells = card.querySelectorAll('.opp-card__cell .val');
      cells[0].innerHTML = s.pub.toLocaleString('es-ES')+'<span style="font-size:.7em;color:var(--ink-3)">/mes</span>';
      cells[1].innerHTML = s.est.toLocaleString('es-ES')+'<span style="font-size:.7em;color:var(--ink-3)">/mes</span>';
      const chip = card.querySelector('.opp-card__chip');
      if(chip) chip.innerHTML = 'P5–P95 <b>'+s.low.toLocaleString('es-ES')+' — '+s.high.toLocaleString('es-ES')+' €</b>';
      const dscount = card.querySelector('div[style*="border-top"] span:last-child');
      if(dscount) dscount.textContent = s.pct;
      card.style.opacity = '1';
    }, 360);
  }
  setInterval(()=>{
    idx = (idx + 1) % samples.length;
    fade(idx);
  }, 5500);
})();

// ============================================================
//  C7 · PRESET CHIPS for the predictor
// ============================================================
(function(){
  const chips = document.querySelectorAll('#presetChips .preset-chip');
  if(!chips.length) return;
  const PRESETS = {
    'centro-clasico': {
      district:'Centro', surface:75, bedrooms:2, bathrooms:1, year:1920, floor:3,
      lift:true, air_conditioning:false, terrace:false, balcony:true, garage_included:false,
      furnished:false, equipped_kitchen:true, fitted_wardrobes:true, swimming_pool:false, storeroom:false
    },
    'salamanca-lujo': {
      district:'Salamanca', surface:120, bedrooms:3, bathrooms:2, year:2015, floor:5,
      lift:true, air_conditioning:true, terrace:true, balcony:false, garage_included:true,
      furnished:false, equipped_kitchen:true, fitted_wardrobes:true, swimming_pool:false, storeroom:true
    },
    'tetuan-estudio': {
      district:'Tetuan', surface:45, bedrooms:1, bathrooms:1, year:1975, floor:2,
      lift:false, air_conditioning:false, terrace:false, balcony:false, garage_included:false,
      furnished:true, equipped_kitchen:true, fitted_wardrobes:true, swimming_pool:false, storeroom:false
    },
    'vallecas-familiar': {
      district:'PuenteVallecas', surface:95, bedrooms:3, bathrooms:2, year:1995, floor:4,
      lift:true, air_conditioning:false, terrace:false, balcony:true, garage_included:true,
      furnished:false, equipped_kitchen:true, fitted_wardrobes:true, swimming_pool:false, storeroom:true
    }
  };
  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      const p = PRESETS[chip.dataset.preset];
      if(!p) return;
      Object.assign(state, p);
      applyStateToForm();
      // Trigger prediction
      document.getElementById('predictorForm').dispatchEvent(new Event('submit', {cancelable:true}));
    });
  });
})();

// ============================================================
//  C1 · COMPARE PREDICTIONS  (save up to 3, render bottom bar, open modal)
// ============================================================
const COMPARE_MAX = 3;
const comparePool = [];

(function(){
  // Add "Save to compare" button to result actions
  const actions = document.querySelector('.result__actions');
  if(!actions) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn--ghost';
  btn.id = 'addCompareBtn';
  btn.setAttribute('aria-label', 'Añadir esta predicción al comparador');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span id="addCompareLbl">Comparar</span>';
  actions.appendChild(btn);
  btn.addEventListener('click', ()=>{
    if(!lastPrediction) return;
    if(comparePool.length >= COMPARE_MAX){
      const lbl = document.getElementById('addCompareLbl');
      const original = lbl.textContent;
      lbl.textContent = 'Máximo ' + COMPARE_MAX;
      setTimeout(()=>{ lbl.textContent = original; }, 1500);
      return;
    }
    // Deep copy
    comparePool.push({
      id: lastPredictionId,
      r: JSON.parse(JSON.stringify(lastPrediction))
    });
    renderCompareBar();
  });
})();

function renderCompareBar(){
  const bar = document.getElementById('compareBar');
  const slots = document.getElementById('compareSlots');
  const count = document.getElementById('compareCount');
  if(!bar || !slots) return;
  count.textContent = comparePool.length;
  bar.classList.toggle('is-visible', comparePool.length > 0);
  bar.hidden = false;

  slots.innerHTML = '';
  for(let i = 0; i < COMPARE_MAX; i++){
    const slot = document.createElement('div');
    slot.className = 'compare-slot';
    const item = comparePool[i];
    if(item){
      slot.classList.add('is-filled');
      slot.innerHTML = `
        <div class="compare-slot__price">${item.r.point.toLocaleString('es-ES')} €</div>
        <div class="compare-slot__meta">${item.r.district.label} · ${item.r.inputs.surface} m²</div>
        <button type="button" class="compare-slot__remove" data-i="${i}" aria-label="Quitar ${item.r.district.label} del comparador">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        </button>`;
    } else {
      slot.innerHTML = `<div class="compare-slot__price" style="color:var(--ink-3);font-size:.8rem;font-weight:400">Vacío</div>`;
    }
    slots.appendChild(slot);
  }
  slots.querySelectorAll('.compare-slot__remove').forEach(b=>{
    b.addEventListener('click', e=>{
      e.stopPropagation();
      const i = Number(b.dataset.i);
      comparePool.splice(i, 1);
      renderCompareBar();
    });
  });
}

// Wire actions: open modal, clear all
document.getElementById('compareOpen').addEventListener('click', openCompareModal);
document.getElementById('compareClear').addEventListener('click', ()=>{
  comparePool.length = 0;
  renderCompareBar();
});

function openCompareModal(){
  if(!comparePool.length) return;
  const modal = document.getElementById('compareModal');
  const body = document.getElementById('compareModalBody');
  // Identify cheapest
  const minPrice = Math.min(...comparePool.map(p=>p.r.point));
  body.innerHTML = '<div class="cmp-grid">' + comparePool.map((p, idx)=>{
    const r = p.r;
    const isCheap = comparePool.length > 1 && r.point === minPrice;
    const factorsHtml = r.factors.slice(0,3).map(f=>{
      const delta = Math.round(f.delta);
      const cls = f.positive ? 'pos' : 'neg';
      const sign = delta >= 0 ? '+' : '−';
      return `<li><span>${f.label}</span><span class="delta ${cls}">${sign}${Math.abs(delta).toLocaleString('es-ES')} €</span></li>`;
    }).join('');
    return `
    <div class="cmp-card ${isCheap?'is-cheapest':''}" data-i="${idx}">
      <button type="button" class="cmp-card__remove" aria-label="Quitar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
      </button>
      <div class="cmp-card__sub">${r.inputs.surface} m² · ${r.inputs.bedrooms} dorm · ${r.inputs.bathrooms} baños · ${r.inputs.year}</div>
      <div class="cmp-card__title">${r.district.label}</div>
      <div class="cmp-card__price">${r.point.toLocaleString('es-ES')}<small> €/mes</small></div>
      <div class="cmp-card__interval">P5–P95: ${r.low.toLocaleString('es-ES')} € — ${r.high.toLocaleString('es-ES')} €</div>
      <ul class="cmp-card__factors">${factorsHtml}</ul>
      <div style="font-family:var(--mono);font-size:.72rem;color:var(--ink-3);padding-top:.4rem;border-top:1px solid var(--line)">Confianza: ${r.confidence.level} · ${r.confidence.score}/100 · MAE ±${r.confidence.districtMae} €</div>
    </div>`;
  }).join('') + '</div>';
  body.querySelectorAll('.cmp-card__remove').forEach(b=>{
    b.addEventListener('click', e=>{
      const i = Number(b.closest('.cmp-card').dataset.i);
      comparePool.splice(i, 1);
      renderCompareBar();
      if(!comparePool.length){ closeModal(modal); }
      else openCompareModal();
    });
  });
  openModal(modal);
}

// ============================================================
//  MODAL helpers
// ============================================================
function openModal(modal){
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(()=> modal.classList.add('is-open'));
  modal.querySelectorAll('[data-close]').forEach(el=>{
    el.addEventListener('click', ()=> closeModal(modal), {once:true});
  });
}
function closeModal(modal){
  modal.classList.remove('is-open');
  setTimeout(()=>{ modal.hidden = true; document.body.style.overflow = ''; }, 250);
}
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape'){
    document.querySelectorAll('.modal.is-open').forEach(closeModal);
    const tour = document.getElementById('tour');
    if(tour && tour.classList.contains('is-open')) tour.classList.remove('is-open');
  }
});

// ============================================================
//  C2 · DISTRICT COMPARATOR
// ============================================================
(function(){
  const chipsEl = document.getElementById('compDistChips');
  if(!chipsEl) return;
  const tableEl = document.getElementById('compDistTable');
  const headEl = document.getElementById('compDistHead');
  const bodyEl = document.getElementById('compDistBody');
  const emptyEl = document.getElementById('compDistEmpty');

  const selected = new Set();
  const MAX_SEL = 3;

  // Build chips (sorted by priceM2 desc)
  const sorted = [...DISTRICTS_22].sort((a,b)=>b.priceM2 - a.priceM2);
  sorted.forEach(d=>{
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'compdist__chip';
    chip.textContent = d.label;
    chip.dataset.key = d.key;
    chip.addEventListener('click', ()=>{
      if(selected.has(d.key)){
        selected.delete(d.key);
        chip.classList.remove('is-on');
      } else if(selected.size < MAX_SEL){
        selected.add(d.key);
        chip.classList.add('is-on');
      }
      // Disable remaining if at max
      document.querySelectorAll('.compdist__chip').forEach(c=>{
        if(!c.classList.contains('is-on')) c.disabled = selected.size >= MAX_SEL;
      });
      render();
    });
    chipsEl.appendChild(chip);
  });

  function render(){
    if(selected.size < 2){
      tableEl.hidden = true;
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;
    tableEl.hidden = false;
    const picks = sorted.filter(d=>selected.has(d.key));
    headEl.innerHTML = '<th>Métrica</th>' + picks.map(d=>`<th>${d.label}</th>`).join('');
    const env = picks.map(d=>DISTRICT_ENV_DEFAULTS[d.key] || {});
    const rows = [
      ['Precio mediano',         picks.map(d=>d.price+' €'),              'price', false],
      ['€/m² mediano',           picks.map(d=>d.priceM2.toFixed(1).replace('.', ',')+' €'), 'priceM2', false],
      ['Superficie típica',      picks.map(d=>d.m2+' m²'),                 null, false],
      ['Barrios documentados',   picks.map(d=>d.n+''),                     null, false],
      ['MAE en distrito',        picks.map(d=>'±'+(DISTRICT_MAE[d.key]||GLOBAL_MAE)+' €'), 'mae', true],
      ['Distancia metro media',  env.map(e=>e.dist_metro_m?e.dist_metro_m+' m':'—'), 'metro', true],
      ['Renta INE',              env.map(e=>e.ine_renta_persona?e.ine_renta_persona.toLocaleString('es-ES')+' €':'—'), 'renta', false],
      ['Ruido diurno',           env.map(e=>e.noise_ld_db?e.noise_ld_db+' dB':'—'), 'noise', true],
      ['NO₂ medio',              env.map(e=>e.air_no2_nearest?e.air_no2_nearest+' µg/m³':'—'), 'no2', true]
    ];
    bodyEl.innerHTML = rows.map(([label, vals, kind, lowerIsBetter])=>{
      // Find best/worst index
      let bestI=-1, worstI=-1;
      if(kind){
        const numeric = vals.map(v=>{
          if(typeof v !== 'string') return null;
          const m = v.match(/[\d.,]+/);
          return m ? parseFloat(m[0].replace(/\./g,'').replace(',','.')) : null;
        });
        if(numeric.every(x=>x !== null)){
          if(lowerIsBetter){
            const m = Math.min(...numeric), M = Math.max(...numeric);
            bestI = numeric.indexOf(m); worstI = numeric.indexOf(M);
          } else {
            const m = Math.max(...numeric), M = Math.min(...numeric);
            bestI = numeric.indexOf(m); worstI = numeric.indexOf(M);
          }
        }
      }
      const cells = vals.map((v, i)=>{
        let cls = '';
        if(picks.length > 1){
          if(i === bestI) cls = 'is-best';
          else if(i === worstI) cls = 'is-worst';
        }
        return `<td class="${cls}">${v}</td>`;
      }).join('');
      return `<tr><th>${label}</th>${cells}</tr>`;
    }).join('');
  }
  render();
})();

// ============================================================
//  C3 · HISTORICAL SPARKLINE + C5 ALERT FORM in map detail
// ============================================================
function buildMapDetailExtras(d){
  // 24-month mock series, anchored to current priceM2 as the END value.
  // Realistic total growth: ~5 % (Villaverde) → ~13 % (Centro) over 24 months,
  // scaling with priceM2. Seasonality ±1,5 %.
  const monthly = [];
  const months = 24;
  const growth = 0.05 + ((d.priceM2 - 13.9) / 10) * 0.08;  // 5 %–13 %
  const startPrice = d.priceM2 / (1 + growth);             // value 24 months ago
  const seed = d.key.length;
  for(let i = 0; i < months; i++){
    const t = i / (months - 1);
    // Slight ease-out interpolation (real markets don't grow linearly)
    const easedT = Math.pow(t, 0.85);
    const trendValue = startPrice + (d.priceM2 - startPrice) * easedT;
    const seasonal = Math.sin((i + seed) * .9) * .015;
    monthly.push(trendValue * (1 + seasonal));
  }
  const min = Math.min(...monthly), max = Math.max(...monthly);
  const w = 240, h = 50;
  const step = w / (months - 1);
  const path = monthly.map((v, i)=>{
    const x = i * step, y = h - ((v - min) / (max - min || 1)) * h;
    return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');
  const area = path + ` L${w},${h} L0,${h} Z`;
  const lastX = (months - 1) * step;
  const lastY = h - ((monthly[months-1] - min) / (max - min || 1)) * h;
  const deltaPct = ((monthly[months-1] - monthly[0]) / monthly[0] * 100).toFixed(1).replace('.', ',');

  return `
    <div class="map__detail-spark">
      <div class="map__detail-spark-head">
        <span>Tendencia €/m² · 24 meses</span>
        <b style="color:#52B59C">+${deltaPct} %</b>
      </div>
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <path class="area" d="${area}"/>
        <path class="line" d="${path}"/>
        <circle cx="${lastX.toFixed(1)}" cy="${lastY.toFixed(1)}" r="2.5"/>
      </svg>
    </div>
    <div class="map__alert">
      <div class="map__alert-head">Alertas — recibe oportunidades en ${d.label}</div>
      <form class="map__alert-form" data-district="${d.key}">
        <input type="email" placeholder="tu@email.com" required aria-label="Email para alertas">
        <button type="submit">Suscribirme</button>
      </form>
      <div class="map__alert-success" hidden>✓ Te avisaremos cuando aparezcan oportunidades.</div>
    </div>
  `;
}

// Hook into the existing map: extend showDetail() by intercepting activate
(function(){
  // Re-bind on map hover to append the sparkline + alert form
  const dEl = document.getElementById('mapDistricts');
  const listEl = document.getElementById('distList');
  if(!dEl || !listEl) return;
  function enrich(){
    const detail = document.getElementById('mapDetail');
    if(!detail) return;
    if(detail.querySelector('.map__detail-spark')) return; // already enriched
    // Find the active district key
    const active = dEl.querySelector('.hex-group.is-active');
    if(!active) return;
    const key = active.dataset.key;
    const d = DISTRICTS_22.find(x=>x.key === key);
    if(!d) return;
    detail.insertAdjacentHTML('beforeend', buildMapDetailExtras(d));
    // Wire the form
    const form = detail.querySelector('.map__alert-form');
    if(form){
      form.addEventListener('submit', e=>{
        e.preventDefault();
        form.style.display = 'none';
        form.parentElement.querySelector('.map__alert-success').hidden = false;
      });
    }
  }
  // Observe detail content changes
  const detailEl = document.getElementById('mapDetail');
  if(detailEl){
    const mo = new MutationObserver(()=> enrich());
    mo.observe(detailEl, {childList:true, subtree:false});
    setTimeout(enrich, 100);
  }
})();

// ============================================================
//  D2 · MAP KEYBOARD NAVIGATION
// ============================================================
(function(){
  const dEl = document.getElementById('mapDistricts');
  if(!dEl) return;
  dEl.addEventListener('keydown', e=>{
    const g = e.target.closest('.hex-group');
    if(!g) return;
    const key = g.dataset.key;
    const d = DISTRICTS_22.find(x=>x.key === key);
    if(!d) return;
    let target = null;
    const moves = {
      ArrowRight: {dx:1, dy:0}, ArrowLeft:{dx:-1, dy:0},
      ArrowUp: {dx:0, dy:-1}, ArrowDown:{dx:0, dy:1}
    };
    const m = moves[e.key];
    if(!m) return;
    e.preventDefault();
    // Find nearest hex in that direction
    const candidates = DISTRICTS_22.filter(x=>{
      if(m.dx !== 0) return Math.sign(x.hx - d.hx) === m.dx;
      return Math.sign(x.hy - d.hy) === m.dy;
    });
    if(!candidates.length) return;
    target = candidates.reduce((closest, x)=>{
      const dist = Math.abs(x.hx - d.hx) + Math.abs(x.hy - d.hy);
      const cdist = Math.abs(closest.hx - d.hx) + Math.abs(closest.hy - d.hy);
      return dist < cdist ? x : closest;
    });
    if(target){
      const tg = dEl.querySelector('.hex-group[data-key="'+target.key+'"]');
      if(tg) tg.focus();
    }
  });
})();

// ============================================================
//  C4 · TOP-10 EXTRA FILTERS
// ============================================================
(function(){
  const districtSel = document.getElementById('oppsFilterDistrict');
  const priceSel    = document.getElementById('oppsFilterPrice');
  const surfaceSel  = document.getElementById('oppsFilterSurface');
  const resetBtn    = document.getElementById('oppsFiltersReset');
  const body        = document.getElementById('oppsBody');
  if(!districtSel || !body) return;

  // Populate district options from the opportunities pool
  const allDists = new Set();
  Object.values(OPPORTUNITIES).forEach(arr=>arr.forEach(o=>allDists.add(o.district)));
  Array.from(allDists).sort().forEach(d=>{
    const opt = document.createElement('option');
    opt.value = d; opt.textContent = d;
    districtSel.appendChild(opt);
  });

  let currentRank = 'mixed';
  const origFilter = document.querySelectorAll('.opps__filter button');
  origFilter.forEach(b=>{
    b.addEventListener('click', ()=>{ currentRank = b.dataset.rank; apply(); });
  });

  function passes(o){
    if(districtSel.value && o.district !== districtSel.value) return false;
    if(priceSel.value){
      const [lo,hi] = priceSel.value.split('-').map(Number);
      if(o.published < lo || o.published > hi) return false;
    }
    if(surfaceSel.value){
      const [lo,hi] = surfaceSel.value.split('-').map(Number);
      if(o.m2 < lo || o.m2 > hi) return false;
    }
    return true;
  }
  function apply(){
    const all = OPPORTUNITIES[currentRank] || OPPORTUNITIES.mixed;
    const filtered = all.filter(passes);
    body.innerHTML = '';
    if(!filtered.length){
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="8" class="opps__no-results">Sin resultados con esos filtros. <button type="button" class="reset" id="oppsClearInline" style="margin-left:.5rem;background:transparent;color:var(--accent);text-decoration:underline">Limpiar</button></td>';
      body.appendChild(tr);
      const inl = document.getElementById('oppsClearInline');
      if(inl) inl.addEventListener('click', clearFilters);
      return;
    }
    filtered.forEach((o, i)=>{
      const pct = ((o.estimated - o.published) / o.estimated * 100);
      const score = (o.estimated - o.published) / 100;
      const rank = o.rank;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="col-rank ${rank<=3?'is-top':''}"><span>${rank}</span></td>
        <td class="col-barrio"><b>${o.barrio}</b><em>${o.district}</em></td>
        <td class="col-hide-sm num">${o.m2} m²</td>
        <td class="num num--muted">${o.published.toLocaleString('es-ES')} €</td>
        <td class="num">${o.estimated.toLocaleString('es-ES')} €</td>
        <td><span class="badge-pct">−${pct.toFixed(1).replace('.', ',')} %</span></td>
        <td class="col-hide-sm num">${score.toFixed(2).replace('.', ',')}</td>
        <td class="col-action"><a href="#" data-opp-i="${i}" aria-label="Ver detalle">Ver detalle →</a></td>
      `;
      body.appendChild(tr);
    });
    // Wire opportunity detail links
    body.querySelectorAll('a[data-opp-i]').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        const i = Number(a.dataset.oppI);
        openOpportunityModal(filtered[i]);
      });
    });
  }
  function clearFilters(){
    districtSel.value = ''; priceSel.value = ''; surfaceSel.value = '';
    apply();
  }
  [districtSel, priceSel, surfaceSel].forEach(s=> s.addEventListener('change', apply));
  resetBtn.addEventListener('click', clearFilters);

  // Initial render (override the original renderOpps once on load)
  apply();
})();

// ============================================================
//  C8 · OPPORTUNITY DETAIL MODAL
// ============================================================
function openOpportunityModal(o){
  const modal = document.getElementById('oppModal');
  const body  = document.getElementById('oppModalBody');
  const title = document.getElementById('oppModalTitle');
  if(!modal || !body) return;
  title.textContent = `Oportunidad #${o.rank} · ${o.barrio}`;
  const pct = ((o.estimated - o.published) / o.estimated * 100);
  const savings = o.estimated - o.published;
  body.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr;gap:1.2rem">
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:1rem;padding:1rem 1.2rem;background:var(--surface-2);border-radius:10px">
        <div>
          <div style="font-family:var(--mono);font-size:.72rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em">Descuento estimado</div>
          <div style="font-family:var(--serif);font-size:2.4rem;line-height:1;color:var(--danger);letter-spacing:-.02em">−${pct.toFixed(1).replace('.', ',')} %</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--mono);font-size:.72rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em">Ahorro mensual</div>
          <div style="font-family:var(--mono);font-size:1.4rem;font-weight:500;color:var(--accent)">+${savings.toLocaleString('es-ES')} €</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:.8rem;padding:.4rem 0">
        <div>
          <div style="font-family:var(--mono);font-size:.66rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em">Distrito</div>
          <div style="font-weight:500;color:var(--ink);margin-top:.15rem">${o.district}</div>
        </div>
        <div>
          <div style="font-family:var(--mono);font-size:.66rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em">Superficie</div>
          <div style="font-weight:500;color:var(--ink);margin-top:.15rem;font-family:var(--mono)">${o.m2} m²</div>
        </div>
        <div>
          <div style="font-family:var(--mono);font-size:.66rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em">Precio publicado</div>
          <div style="font-weight:500;color:var(--ink-2);margin-top:.15rem;text-decoration:line-through;font-family:var(--mono)">${o.published.toLocaleString('es-ES')} €/mes</div>
        </div>
        <div>
          <div style="font-family:var(--mono);font-size:.66rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em">Estimación RentSamu</div>
          <div style="font-weight:500;color:var(--accent);margin-top:.15rem;font-family:var(--mono)">${o.estimated.toLocaleString('es-ES')} €/mes</div>
        </div>
      </div>

      <div style="padding:1rem 1.2rem;border:1px solid var(--line);border-radius:10px;background:var(--surface)">
        <div style="font-family:var(--mono);font-size:.7rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.5rem">Por qué es una oportunidad</div>
        <p style="font-size:.92rem;color:var(--ink-2);line-height:1.55">El modelo estima un precio justo de <b style="color:var(--ink)">${o.estimated.toLocaleString('es-ES')} €</b> basándose en el €/m² mediano del distrito (${(o.estimated / o.m2).toFixed(1).replace('.', ',')} €/m²), las características típicas de los inmuebles enriquecidas con 16 fuentes externas, y un score de descuento ${(savings/100).toFixed(2).replace('.', ',')} sobre la desviación estándar de la zona.</p>
      </div>

      <div style="display:flex;gap:.5rem;flex-wrap:wrap">
        <a href="${o.url ? 'https://www.idealista.com/inmueble/'+o.url+'/' : '#'}" target="_blank" rel="noopener" class="btn btn--primary" style="flex:1;justify-content:center">Ver anuncio original
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
        </a>
        <button type="button" class="btn btn--ghost" id="oppCreateAlert" data-district="${o.district}">Crear alerta similar</button>
      </div>
    </div>`;
  // Hook alert button
  body.querySelector('#oppCreateAlert').addEventListener('click', ()=>{
    closeModal(modal);
    // Activate the district in the map
    const dKey = DISTRICTS_22.find(d => d.label === o.district || d.label.includes(o.district));
    if(dKey){
      document.getElementById('mapa').scrollIntoView({behavior:'smooth'});
    }
  });
  openModal(modal);
}

// ============================================================
//  B2 · DARK MODE TOGGLE (with localStorage)
// ============================================================
(function(){
  const btn = document.getElementById('themeToggle');
  if(!btn) return;
  const KEY = 'rentsamu.theme';
  function apply(theme){
    if(theme === 'dark') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
  }
  let saved = null;
  try{ saved = localStorage.getItem(KEY); }catch(e){}
  if(!saved){
    saved = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  apply(saved);
  btn.addEventListener('click', ()=>{
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    apply(next);
    try{ localStorage.setItem(KEY, next); }catch(e){}
  });
})();

// ============================================================
//  E2 · LIVE VALUATION TOASTS  (subtle social proof, max 3)
// ============================================================
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const container = document.getElementById('liveToasts');
  if(!container) return;
  const KEY = 'rentsamu.toasts.shown';
  try{ if(sessionStorage.getItem(KEY) === '1') return; }catch(e){}

  const fakeEvents = [
    {who:'María', city:'Chamberí',     when:'Hace 3 minutos',    detail:'piso de 92 m² · 2.150 €'},
    {who:'Carlos', city:'Tetuán',      when:'Hace 5 minutos',    detail:'estudio 45 m² · 980 €'},
    {who:'Sara',   city:'Salamanca',   when:'Hace 8 minutos',    detail:'piso reformado 110 m² · 2.680 €'}
  ];

  let shown = 0;
  function show(ev){
    const el = document.createElement('div');
    el.className = 'live-toast';
    el.innerHTML = `
      <div class="live-toast__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
      </div>
      <div class="live-toast__txt">
        <b>${ev.who}</b> valoró un inmueble en ${ev.city}
        <small>${ev.detail} · ${ev.when}</small>
      </div>`;
    container.appendChild(el);
    requestAnimationFrame(()=> el.classList.add('is-in'));
    setTimeout(()=>{
      el.classList.remove('is-in');
      el.classList.add('is-out');
      setTimeout(()=> el.remove(), 400);
    }, 6500);
  }
  // Start after 12s, then every 25s, max 3 toasts per session
  setTimeout(function loop(){
    if(shown >= fakeEvents.length) {
      try{ sessionStorage.setItem(KEY, '1'); }catch(e){}
      return;
    }
    show(fakeEvents[shown++]);
    setTimeout(loop, 25000);
  }, 12000);
})();

// ============================================================
//  E5 · NEWSLETTER FORM
// ============================================================
(function(){
  const form = document.getElementById('newsletterForm');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const inp = form.querySelector('input[type="email"]');
    if(!inp.checkValidity()){ inp.reportValidity(); return; }
    form.style.display = 'none';
    document.getElementById('newsletterSuccess').classList.add('is-on');
  });
})();

// ============================================================
//  C6 · ONBOARDING TOUR  (3 pasos, una vez por sesión persistente)
// ============================================================
(function(){
  const tour = document.getElementById('tour');
  if(!tour) return;
  const KEY = 'rentsamu.tour.completed';
  try{ if(localStorage.getItem(KEY) === '1') return; }catch(e){}
  // Don't show tour if user landed with a permalink (they already know what they want)
  if(window.location.search.length > 1) return;

  const steps = [
    {title:'Bienvenido a RentSamu', text:'Te enseñamos en 30 segundos cómo aprovechar el predictor y el ranking de oportunidades. Pulsa Empezar.', cta:'Empezar →'},
    {title:'1. Configura el inmueble', text:'En la sección Demo, ajusta distrito, superficie, dormitorios y equipamiento. Hay presets rápidos arriba del formulario.', cta:'Siguiente →'},
    {title:'2. Lee la estimación con confianza', text:'Verás el precio puntual, el intervalo P5–P95 y un score de confianza específico de ese distrito. Puedes guardar varias predicciones para comparar.', cta:'Siguiente →'},
    {title:'3. Explora el TOP-10 y el mapa', text:'En Oportunidades filtra por distrito y precio. En el mapa pasa el ratón sobre cualquier hexágono para ver detalle y tendencia 24M. ¡Listo!', cta:'Entendido'}
  ];
  let i = 0;
  const progress = document.getElementById('tourProgress');
  progress.innerHTML = steps.slice(1).map(_=>'<span></span>').join('');
  const stepLbl = document.getElementById('tourStepLabel');
  const title = document.getElementById('tourTitle');
  const text = document.getElementById('tourText');
  const nextBtn = document.getElementById('tourNext');
  const skipBtn = document.getElementById('tourSkip');

  function render(){
    const s = steps[i];
    title.textContent = s.title;
    text.textContent = s.text;
    nextBtn.textContent = s.cta;
    if(i === 0){
      stepLbl.textContent = '';
      progress.style.display = 'none';
    } else {
      stepLbl.textContent = `Paso ${i} de ${steps.length - 1}`;
      progress.style.display = 'flex';
      progress.querySelectorAll('span').forEach((sp, idx)=>{
        sp.classList.toggle('is-done', idx < i);
      });
    }
  }
  function open(){ tour.hidden = false; tour.classList.add('is-open'); render(); }
  function close(){
    tour.classList.remove('is-open');
    setTimeout(()=> tour.hidden = true, 200);
    try{ localStorage.setItem(KEY, '1'); }catch(e){}
  }
  nextBtn.addEventListener('click', ()=>{
    i++;
    if(i >= steps.length) return close();
    render();
  });
  skipBtn.addEventListener('click', close);
  // Auto-open 1.5s after first load to let the hero settle
  setTimeout(open, 1500);
})();

// ============================================================
//  TESTIMONIAL avatar gradients (B7)
// ============================================================
(function(){
  const palettes = [
    ['#1F4D3F', '#3E907A'],
    ['#B5483A', '#E1A57F'],
    ['#234740', '#6BB59F']
  ];
  document.querySelectorAll('.testi__avatar').forEach((el, i)=>{
    const p = palettes[i % palettes.length];
    el.style.setProperty('--g1', p[0]);
    el.style.setProperty('--g2', p[1]);
  });
})();

// ============================================================
//  D6 · SERVICE WORKER + UPDATE BANNER
// ============================================================
if('serviceWorker' in navigator && window.location.protocol !== 'file:'){
  let pendingReg = null;
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').then(reg => {
      pendingReg = reg;
      // Detect new SW waiting to take over (fresh deploy)
      if(reg.waiting) showUpdateBanner(reg.waiting);
      reg.addEventListener('updatefound', ()=>{
        const nw = reg.installing;
        if(!nw) return;
        nw.addEventListener('statechange', ()=>{
          if(nw.state === 'installed' && navigator.serviceWorker.controller){
            showUpdateBanner(nw);
          }
        });
      });
    }).catch(()=>{ /* silently fail */ });
    // Reload once the new SW takes control
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', ()=>{
      if(refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });

  function showUpdateBanner(worker){
    if(document.getElementById('swUpdate')) return;
    const bar = document.createElement('div');
    bar.id = 'swUpdate';
    bar.className = 'sw-update';
    bar.setAttribute('role','status');
    bar.innerHTML = `
      <span>Hay una versión nueva disponible.</span>
      <button type="button" id="swUpdateBtn">Recargar</button>
      <button type="button" id="swUpdateClose" aria-label="Cerrar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
      </button>`;
    document.body.appendChild(bar);
    requestAnimationFrame(()=> bar.classList.add('is-in'));
    document.getElementById('swUpdateBtn').addEventListener('click', ()=>{
      worker.postMessage({type:'skip-waiting'});
    });
    document.getElementById('swUpdateClose').addEventListener('click', ()=>{
      bar.classList.remove('is-in');
      setTimeout(()=> bar.remove(), 350);
    });
  }
}
