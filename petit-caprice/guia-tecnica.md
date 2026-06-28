# Guía Técnica — Petit Caprice

**Fecha:** 2026-06-28

---

## Stack recomendado

**HTML + CSS + JS vanilla. Sin frameworks. Sin CMS.**

### Justificación

Petit Caprice es una tienda de barrio pequeña que necesita una landing page efectiva, no un sistema complejo. El propietario no tiene perfil técnico — un CMS o framework añadiría fricción sin beneficio real. Esta web:

- No necesita actualizarse frecuentemente (el catálogo no cambia cada semana)
- Cuando cambie algo (horario, teléfono), basta con editar el HTML
- El tiempo de carga será óptimo sin JavaScript de framework
- El coste de hosting es mínimo: cualquier hosting estático (GitHub Pages, Netlify, Hostinger) sirve

Si en el futuro el cliente quiere actualizar el catálogo de forma autónoma, se puede migrar la sección de productos a un JSON y añadir un CMS headless (Decap CMS) sin reescribir nada más.

### Dependencias externas (mínimas)

| Dependencia | URL | Propósito |
|---|---|---|
| Google Fonts | fonts.googleapis.com | Fraunces + DM Sans |
| Lucide Icons | unpkg.com/lucide@latest | Iconografía |
| Google Maps Embed | maps.google.com | Mapa en sección contacto |

---

## Componentes

### 1. Header / Navegación
- **Función:** Menú sticky con logo, links de ancla y CTA de WhatsApp
- **Inputs:** Links de navegación, número de WhatsApp, nombre del negocio
- **Notas:** En móvil, los links se colapsan en hamburger menu. El CTA "Pedir por WhatsApp" siempre visible en desktop. En móvil se muestra solo el icono de hamburger.

### 2. Hero
- **Función:** Primera pantalla de impacto con H1, subtítulo y CTAs principales
- **Inputs:** H1, subtítulo, texto CTA1, texto CTA2, URL WhatsApp, imagen de fondo
- **Notas:** Altura mínima 90vh en desktop. La imagen de fondo debe ser de alta calidad (mesa de chuches o globos). Overlay vainilla semitransparente si la imagen es muy oscura.

### 3. Propuesta de valor
- **Función:** 3 puntos de diferenciación bajo el hero
- **Inputs:** 3 × (icono Lucide, titular, descripción)
- **Notas:** Grid de 3 columnas en desktop, 1 en móvil. Sin background propio — fondo vainilla heredado del body.

### 4. Sección Productos
- **Función:** Grid de 4 categorías de producto con icono, nombre y descripción
- **Inputs:** 4 × (icono, titular, descripción), CTA de sección
- **Notas:** Grid 2×2 en tablet, 4 en desktop, 1 en móvil. Cards con box-shadow suave y border-radius 16px.

### 5. Sección Eventos
- **Función:** Destacar el servicio de mesas de chuches para eventos
- **Inputs:** H2, subtítulo, cuerpo, lista de tipos de evento, CTA WhatsApp eventos
- **Notas:** Fondo rosa chicle (#F9C8D8). Diseño en 2 columnas en desktop (texto | visual). El CTA abre WhatsApp con mensaje predefinido para eventos.

### 6. Sección Cómo pedir
- **Función:** Explicar el proceso en 3 pasos
- **Inputs:** H2, subtítulo, 3 × (número/icono, titular, descripción), CTA
- **Notas:** Layout horizontal en desktop, vertical en móvil. Numeración o iconos grandes.

### 7. Sección Galería
- **Función:** Grid visual de fotos de producto y mesas de chuches
- **Inputs:** 6–9 imágenes (fotos reales del cliente), subtítulo, enlace Instagram
- **Notas:** Grid masonry o 3×3 en desktop. Imágenes cuadradas o 4:3. Lazy loading obligatorio. Las imágenes se añaden manualmente tras la entrega.

### 8. Sección Contacto
- **Función:** Información del negocio + mapa
- **Inputs:** Dirección, horario, teléfono, WhatsApp, iframe de Google Maps
- **Notas:** Layout 2 columnas desktop (mapa | info). Stack vertical en móvil. El iframe del mapa se actualiza cuando el cliente confirme la dirección exacta.

### 9. Footer
- **Función:** Logo, tagline, datos de contacto, redes sociales, legal
- **Inputs:** Logo, tagline, dirección, horario, redes sociales, links legales
- **Notas:** Fondo cacao (#2C1B1E), texto vainilla.

### 10. Botón flotante WhatsApp
- **Función:** CTA permanente visible en toda la página
- **Inputs:** Número de WhatsApp, mensaje predefinido
- **Notas:** Fixed, bottom-right, z-index alto. Verde WhatsApp (#25D366) para reconocimiento inmediato. Icono + texto "Pedir" en desktop, solo icono en móvil.

---

## Diseño responsive

**Estrategia: mobile-first**

### Mobile (< 640px) — base
- Nav: logo + botón hamburger. Links ocultos en menú desplegable
- Hero: texto centrado, H1 36px, sin imagen de fondo (o imagen como elemento aparte)
- Grid productos: 1 columna
- Sección eventos: 1 columna (texto encima, visual debajo)
- Galería: 2 columnas
- Contacto: mapa arriba, info abajo
- Footer: stack vertical

### Tablet (640px – 1024px)
- Nav: logo + links visibles + CTA
- Hero: H1 44px
- Grid productos: 2×2
- Galería: 3 columnas
- Contacto: 2 columnas

### Desktop (> 1024px) — diseño base en CSS
- Nav: completo, sticky
- Hero: H1 56px, altura 90vh
- Grid productos: 4 columnas
- Sección eventos: 2 columnas (60/40)
- Galería: 3×3
- Contacto: 2 columnas (50/50)
- Max-width contenido: 1200px, centrado

---

## Rendimiento y accesibilidad

### Imágenes
- Formato WebP para todas las imágenes
- Atributo `loading="lazy"` en todas excepto la imagen del hero
- Atributo `width` y `height` explícitos para evitar layout shift (CLS)
- `alt` descriptivo en cada imagen (no "imagen1", sino "Mesa de chuches para comunión preparada en Petit Caprice")

### Fuentes
- Preload de Google Fonts con `<link rel="preconnect">`
- Solo cargar los pesos necesarios: Fraunces 400i + 700, DM Sans 400 + 500

### Core Web Vitals
- **LCP (Largest Contentful Paint):** La imagen del hero es el elemento LCP — debe tener `loading="eager"` y estar optimizada (< 200KB en WebP)
- **CLS (Cumulative Layout Shift):** Definir `width` y `height` en todas las imágenes. El mapa de Google Maps necesita un contenedor con altura fija
- **FID/INP:** JS mínimo, sin bloqueo del hilo principal

### Accesibilidad
- `lang="es"` en el HTML
- Estructura de headings correcta: 1 × H1, H2 por sección, H3 para subtítulos de tarjetas
- Todos los iconos de Lucide deben tener `aria-hidden="true"` si son decorativos
- Links con texto descriptivo (`aria-label` en iconos solitarios)
- Contraste: cacao (#2C1B1E) sobre vainilla (#FFF8F0) → ratio > 15:1 ✓. Texto blanco sobre frambuesa (#E03F6A) → ratio ~4.5:1 ✓
- Botón hamburger con `aria-label="Abrir menú"` y `aria-expanded`
- Formulario de eventos (si se implementa) con `<label>` asociado a cada `<input>`

---

## Imágenes necesarias

El cliente debe proporcionar estas imágenes (o se toman de su Instagram @petitcapriceventos):

| Archivo | Descripción | Dimensiones recomendadas |
|---|---|---|
| `hero.webp` | Mesa de chuches o globos — imagen principal | 1600×900px |
| `eventos-bg.webp` | Mesa de chuches para evento | 800×600px |
| `galeria-1.webp` a `galeria-6.webp` | Fotos de producto / mesas / globos | 600×600px (cuadradas) |
| `og-image.webp` | Para Open Graph (compartir en redes) | 1200×630px |

---

## Hosting recomendado

**Netlify (gratis)** — la opción más sencilla para un sitio estático:
1. Crear cuenta en netlify.com
2. Arrastrar la carpeta `web/` al panel de Netlify
3. Asignar dominio personalizado (petitcaprice.es o similar)

Alternativas: GitHub Pages (gratis), Hostinger (desde ~3€/mes con dominio incluido).

**Dominio recomendado:** `petitcaprice.es` o `petitcapriceberaun.com`

---

## Prompt IA para regenerar la web

Usa este prompt en cualquier agente de IA para generar o regenerar la web completa:

```
Genera una landing page completa (HTML + CSS + JS vanilla) para una tienda de barrio llamada Petit Caprice, ubicada en el barrio de Beraun, Errenteria (Gipuzkoa). La web es un one-pager con las siguientes secciones: Hero, Productos, Eventos, Cómo pedir, Galería y Contacto.

IDENTIDAD VISUAL:
- Paleta: Frambuesa #E03F6A (primario/CTA), Caramelo #F5A623 (secundario), Rosa chicle #F9C8D8 (fondos alternos), Vainilla #FFF8F0 (fondo principal), Cacao #2C1B1E (textos)
- Tipografía principal (titulares): Fraunces (Google Fonts), peso 700 y 400 italic
- Tipografía secundaria (cuerpo): DM Sans (Google Fonts), peso 400 y 500
- Botones: estilo pill (border-radius: 50px), fondo frambuesa, texto blanco
- Cards: border-radius 16px, sombra suave 0 4px 20px rgba(44,27,30,0.08)
- Iconos: biblioteca Lucide (CDN unpkg)
- Estilo: colorido pero ordenado, confitería de barrio, mobile-first

CONTENIDO:
- Hero H1: "Para cada capricho, estamos en Beraun"
- Hero subtítulo: "Chuches, globos y artículos de regalo para el día a día y para tus fiestas más especiales. Pide lo que necesites por WhatsApp — lo preparamos con cariño."
- CTAs hero: "Pedir por WhatsApp" (primario) + "Ver qué tenemos" (secundario)
- Trust bajo CTAs: "Tu tienda de barrio en Beraun, Errenteria"
- Propuesta de valor (3 puntos): 1) "Tu tienda de siempre" (icono map-pin) 2) "Mesas de chuches a tu medida" (icono party-popper) 3) "Pide sin complicaciones" (icono message-circle)
- Sección productos (H2: "Para cada capricho, tenemos algo"): 4 tarjetas: Golosinas y chuches (candy), Globos y decoración (sparkles), Artículos de regalo (gift), Prensa y revistas (book-open)
- Sección eventos (fondo #F9C8D8, H2: "Mesas de chuches para tus fiestas"): comuniones, cumpleaños, bodas, bautizos, graduaciones, eventos de empresa
- Sección cómo pedir (H2: "Pedir es fácil"): 3 pasos: Escríbenos por WhatsApp → Lo preparamos con cariño → Recógelo en la tienda
- Sección galería (H2: "Así quedan nuestras creaciones"): grid 3x2 de placeholders con enlace a @petitcapriceventos
- Sección contacto (H2: "Estamos en el barrio"): iframe Google Maps + dirección/horario/teléfono (placeholders)

SEO:
- Meta title: "Petit Caprice — Chuches, Globos y Regalos en Errenteria"
- Meta description: "Tienda de golosinas, globos y regalos en Beraun, Errenteria. Mesas de chuches para comuniones y cumpleaños. Pide por WhatsApp fácil y rápido."
- Schema LocalBusiness con datos de Errenteria
- Open Graph tags completos

FUNCIONALIDADES JS:
- Menú hamburger en móvil
- Scroll suave a anclas
- Fade-in animaciones con IntersectionObserver
- Botón flotante WhatsApp (fijo, esquina inferior derecha)
- Links WhatsApp con mensajes predefinidos distintos para pedido general vs. eventos
```
