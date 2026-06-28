# Estructura — Petit Caprice

**Fecha:** 2026-06-28
**Basado en:** `investigacion.md` + `diseno.md`

---

## 1. Mapa del sitio

**Decisión: web de una sola página (one-pager) con anclas**

Petit Caprice es una tienda de barrio pequeña que necesita presencia digital básica pero efectiva. Una web multi-página añadiría complejidad de mantenimiento sin beneficio real. El objetivo es capturar búsquedas locales y convertir visitas a WhatsApp o visitas físicas.

| Sección (ancla) | Incluida | Justificación |
|---|---|---|
| Hero (`#inicio`) | Sí | Siempre — impacto inmediato, CTA directo |
| Qué tenemos (`#productos`) | Sí | Sus categorías de producto son variadas y necesitan presentación clara |
| Eventos (`#eventos`) | Sí | Diferenciador clave — mesas de chuches para comuniones y cumpleaños |
| Cómo pedir (`#pedir`) | Sí | El proceso de pedido por WhatsApp debe ser explícito |
| Galería (`#galeria`) | Sí | El producto es visual — globos y mesas de chuches se venden con la imagen |
| Dónde estamos (`#contacto`) | Sí | Esencial para negocio local — mapa, horario, dirección |
| Blog | No | No hay intención ni capacidad de mantenerlo |
| Tienda online | No | Innecesaria — el canal es WhatsApp, más ágil y personal |
| Página Nosotros | No | Para este tipo de negocio, una sección breve en el hero es suficiente |

---

## 2. Arquitectura de navegación

### Menú principal (sticky, compacto)

```
[Logo Petit Caprice]    Productos  Eventos  Galería  Dónde estamos    [Pedir por WhatsApp ↗]
```

- Máximo 4 links de navegación + 1 CTA botón
- En móvil: hamburger → menú desplegable con los mismos items
- El botón "Pedir por WhatsApp" siempre visible en desktop

### Footer

```
Logo + tagline
─────────────────────────────────────────
Dirección          Horario            Síguenos
Beraun, Errenteria L-V 9:00–20:00    Instagram
Gipuzkoa           S 9:00–14:00       Facebook
─────────────────────────────────────────
Pedir por WhatsApp — [número]
─────────────────────────────────────────
© 2024 Petit Caprice · Aviso legal · Política de privacidad
```

---

## 3. Llamadas a la acción (CTAs)

### Hero
- **CTA principal:** "Pedir por WhatsApp" → abre wa.me con mensaje predefinido
- **CTA secundario:** "Ver qué tenemos" → ancla a #productos

### Sección Productos
- **CTA:** "¿Quieres este artículo? Escríbenos" → WhatsApp

### Sección Eventos
- **CTA principal:** "Pide tu mesa de chuches" → WhatsApp con mensaje predefinido para eventos
- **Formulario alternativo:** Formulario sencillo (nombre, fecha del evento, tipo de evento, número de personas) que envía por email/WhatsApp

### Sección Cómo pedir
- **CTA:** Botón WhatsApp grande + número de teléfono visible

### Sección Galería
- Sin CTA propio — el CTA flotante de WhatsApp siempre visible

### Sección Contacto
- **CTA:** "¿Cómo llego?" → enlace Google Maps
- **CTA secundario:** "Llámanos" → tel: link
- **CTA terciario:** "Escríbenos" → WhatsApp

### CTA flotante (siempre visible)
Botón flotante de WhatsApp en esquina inferior derecha — icono + "Pedir" — presente en toda la página en móvil y desktop.

---

## 4. SEO Local

### Palabras clave principales

| Keyword | Intención | Volumen estimado | Página |
|---|---|---|---|
| tienda de chuches Errenteria | Transaccional + local | Bajo-medio | Inicio (hero + meta) |
| globos Errenteria | Transaccional + local | Bajo | Inicio + sección Productos |
| mesa de chuches comunión Errenteria | Transaccional + alta conversión | Muy bajo, alta intención | Sección Eventos + meta |
| golosinas Rentería | Transaccional + local | Bajo | Inicio |
| tienda regalos Beraun | Transaccional + barrio | Muy bajo, sin competencia | Inicio |

### Palabras clave secundarias (long-tail y apoyo)

- "chuches para cumpleaños Errenteria"
- "mesa dulce comunión Gipuzkoa"
- "globos decoración cumpleaños Errenteria"
- "artículos de regalo Errenteria"
- "tienda golosinas barrio Beraun"
- "mesas de chuches para eventos País Vasco"
- "pedidos globos WhatsApp Errenteria"
- "prensa Beraun Errenteria"
- "detalles para comunión Errenteria"
- "petit caprice errenteria" (búsqueda de marca)

### Meta datos por página/sección

La web es una sola página — los meta datos corresponden a la URL raíz + posibles URL canónicas si se crean anclas indexables.

**Página principal (index)**

- **Meta título:** `Petit Caprice — Chuches, Globos y Regalos en Errenteria` *(60 chars)*
- **Meta descripción:** `Tienda de golosinas, globos y artículos de regalo en Beraun, Errenteria. Mesas de chuches para comuniones y cumpleaños. Pide por WhatsApp.` *(141 chars)*

**Open Graph (para redes sociales)**
- `og:title` — Petit Caprice | Errenteria
- `og:description` — Tu tienda de chuches y globos en Beraun. Hacemos mesas de chuches para tus fiestas.
- `og:image` — Foto de producto/mesa de chuches (colorida, cuadrada, 1200×630)

### Datos estructurados recomendados

#### LocalBusiness schema (obligatorio)
```json
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Petit Caprice",
  "description": "Tienda de golosinas, globos y artículos de regalo en Beraun, Errenteria",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[COMPLETAR]",
    "addressLocality": "Errenteria",
    "addressRegion": "Gipuzkoa",
    "postalCode": "20100",
    "addressCountry": "ES"
  },
  "telephone": "[COMPLETAR]",
  "openingHours": "[COMPLETAR]",
  "url": "[URL de la web]",
  "sameAs": [
    "https://www.instagram.com/petitcapriceventos/",
    "https://www.facebook.com/p/Petitcaprice-100057438198250/"
  ]
}
```

#### FAQPage schema (recomendado para eventos)
Preguntas como: "¿Hacéis mesas de chuches para comuniones?", "¿Cómo puedo pedir?", "¿Cuánto cuesta una mesa de golosinas?"

#### Product schema (opcional, para mesa de chuches si se define precio)

### Google Business Profile

**Categorías recomendadas:**
- Categoría principal: `Tienda de golosinas`
- Categorías secundarias: `Tienda de artículos de fiesta`, `Tienda de regalos`

**Atributos relevantes:**
- Pedidos en tienda
- Pedidos a través de mensajes (WhatsApp)
- Accesible en silla de ruedas (verificar)
- Pago con tarjeta (verificar)

**Fotos que subir al GBP:**
1. Escaparate / fachada de la tienda (exterior, con el nombre visible)
2. Interior del local con los productos expuestos
3. Mesa de chuches completa preparada para un evento
4. Globos decorados / ramos de globos
5. Primer plano de productos (caramelos, golosinas)
6. Logo de la marca

---

## 5. Estructura del homepage (one-pager)

### Sección 1 — Hero
- **Tagline H1:** "El capricho que estabas buscando" *(o variante del copy — pendiente Fase 5)*
- **Subtítulo:** Golosinas, globos y regalos en Beraun, Errenteria
- **Imagen:** Foto de mesa de chuches colorida o globos en primer plano
- **CTA 1:** "Pedir por WhatsApp" (botón pill, frambuesa)
- **CTA 2:** "Ver productos" (botón secundario, borde frambuesa)
- **Elemento de confianza bajo los CTAs:** "En el barrio de Beraun · Pedidos por WhatsApp"

### Sección 2 — Qué tenemos (#productos)
- **Título H2:** "Para cada capricho, tenemos algo"
- **4 tarjetas de categoría:**
  1. Golosinas y chuches — icono `candy` — descripción breve
  2. Globos y decoración — icono `circle-dot` — descripción breve
  3. Artículos de regalo — icono `gift` — descripción breve
  4. Prensa y revistas — icono `book-open` — descripción breve
- **CTA bajo las tarjetas:** "¿Buscas algo concreto? Escríbenos"

### Sección 3 — Eventos (#eventos)
- **Fondo:** Rosa chicle (#F9C8D8) — sección destacada
- **Título H2:** "Mesas de chuches para tus fiestas"
- **Subtítulo:** Comuniones, cumpleaños, bodas — lo preparamos todo
- **Lista visual de tipos de evento:** con iconos pequeños
- **Imagen:** Mesa de chuches decorada (si disponible) o ilustración
- **CTA:** "Cuéntanos tu fiesta" → WhatsApp con texto predefinido

### Sección 4 — Cómo pedir (#pedir)
- **Título H2:** "Pedir es fácil"
- **3 pasos visuales:**
  1. Escríbenos por WhatsApp — icono `message-circle`
  2. Te preparamos el pedido — icono `package`
  3. Recógelo en la tienda — icono `map-pin`
- **CTA:** Botón WhatsApp grande con número

### Sección 5 — Galería (#galeria)
- **Título H2:** "Así quedan nuestras creaciones"
- **Grid de imágenes** (6–9 fotos) — mesas de chuches, globos, artículos
- Enlace a Instagram (@petitcapriceventos) al final
- Sin CTA propio — el botón flotante está siempre visible

### Sección 6 — Dónde estamos (#contacto)
- **Dos columnas:**
  - Izquierda: mapa Google Maps embebido del local
  - Derecha:
    - Dirección (Beraun, Errenteria)
    - Horario (completar con datos reales)
    - Teléfono (completar)
    - WhatsApp (completar)
    - Redes sociales
- **CTA:** "¿Cómo llego?" → Google Maps

---

## Notas técnicas

- ⚠️ Los datos de contacto (dirección exacta, teléfono, horario) están pendientes de confirmar con el cliente
- El número de WhatsApp debe configurarse en los enlaces `wa.me/34XXXXXXXXX` con mensajes predefinidos según sección
- La galería puede conectarse al feed de Instagram mediante API o simplemente con fotos descargadas manualmente (más estable)
- La web debe ser mobile-first — el 80%+ del tráfico local vendrá de móvil
