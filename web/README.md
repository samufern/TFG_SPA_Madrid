# RentIA · Guía de ejecución

Web pública del Trabajo Fin de Grado **Sistema de Predicción y Análisis del alquiler en Madrid**, desarrollada por Samuel Fernández Fernández.

---

## 1. Servidor local

Desbloquea Service Worker, portapapeles, headers correctos y permite probar la web tal y como la verá un usuario final.

**Con Python** (ya instalado en el sistema):

```powershell
python -m http.server 8000 --directory web
```

Después abre **http://localhost:8000** en el navegador. Para detener el servidor: `Ctrl+C` en la terminal.

**Con Node.js** (alternativa si lo prefieres):

```powershell
npx serve web
```

---

## 2. Estructura del proyecto

```
web/
├── index.html              Landing principal (predictor, mapa, oportunidades)
├── styles.css              Todo el CSS (incluye dark mode y print)
├── app.js                  Toda la lógica JavaScript (54 listeners)
├── sw.js                   Service Worker (cache offline)
├── og-image.svg            Imagen social 1200×630 para LinkedIn/X/Slack
├── metodologia.html        Documento técnico completo
├── sobre.html              Quiénes somos
├── contacto.html           Canales de contacto
├── aviso-legal.html        Información legal
├── privacidad.html         Política de privacidad (RGPD)
├── terminos.html           Términos de servicio
├── cookies.html            Política de cookies
└── README.md               Esta guía
```

---

## 3. Funcionalidades principales

### Predictor de precio (sección Demo)
- Tres tabs: **Vivienda · Equipamiento · Entorno**
- 19 variables totales: superficie, dormitorios, baños, año (opcional), planta (opcional), 10 toggles de equipamiento, 4 sliders de entorno (opcionales)
- Resultado: estimación puntual, intervalo P5–P95, factores SHAP, tarjeta de confianza con MAE específico del distrito
- 4 atajos "presets" para rellenar el formulario con un clic

### Acciones tras una predicción
| Botón | Función |
|---|---|
| **Informe PDF** | Genera un informe profesional via `window.print()` → "Guardar como PDF" |
| **Copiar resumen** | Copia un resumen en texto plano al portapapeles |
| **Compartir** | Copia un permalink que reconstruye la predicción al abrirlo |
| **Comparar** | Añade la predicción a un comparador inferior (hasta 3) |

### Mapa cartograma
- 21 distritos como hexágonos coloreados por €/m² mediano
- Ranking ordenado a la derecha, sincronizado con el mapa al pasar el ratón
- Sparkline 24 meses + formulario de alertas por email en el panel de detalle
- Navegación por teclado: flechas ↑↓←→

### Top-10 oportunidades
- 3 rankings (mixto, descuento absoluto, descuento €/m²)
- 3 filtros adicionales (distrito, precio publicado, superficie)
- Modal de detalle al pulsar "Ver detalle →"

### Comparador de distritos
- Hasta 3 distritos lado a lado con 9 métricas
- ▲ destaca el mejor, ámbar destaca el peor

### Otros
- **Modo oscuro** con icono sol/luna (persiste en localStorage)
- **Onboarding tour** 4 pasos la primera visita
- **Live toasts** (max 3 por sesión)
- **Newsletter** en el footer
- **Service Worker** offline cache (segunda visita carga instantánea)

---

## 4. Parámetros de URL útiles

### Permalink de predicción
Cuando pulsas **Calcular precio estimado**, la URL se actualiza con todos los parámetros del estado. Copiar esa URL permite a otra persona ver exactamente la misma predicción. Ejemplo:

```
http://localhost:8000/?district=Centro&surface=80&bedrooms=2&bathrooms=1&...
```
