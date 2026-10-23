# Vica Floristería: sitio estático

HTML + CSS + JS puro, sin build. Se publica tal cual en GitHub Pages / Netlify / Cloudflare Pages.

## Probar en local
`fetch` no funciona con doble clic (`file://`). Usar un servidor local:

```
npx serve .
```
y abrir la URL que muestre (o usar la extensión Live Server de VS Code).

## Estructura
- `index.html`: landing (5 secciones). `catalogo.html`: catálogo. `producto.html?id=...`: detalle (una sola plantilla para todos los productos).
- `data/productos.json`: **todos los productos**. Para agregar uno, añadir un bloque y subir su foto.
- `js/config.js`: teléfono, código de país (supuesto 503, verificar), Facebook e Instagram.
- `assets/img/productos/`: fotos del catálogo, nombre = lo indicado en `imagenes` del JSON.
- `assets/img/secciones/`: fotos de la landing (ver lista abajo).
- `assets/img/ornamentos/`: ornamentos SVG aproximados; reemplazar por los originales conservando el nombre.
- `plans/`: imágenes de referencia del diseño.

## Imágenes
WebP, máx. ~1200 px de ancho, ~150 KB. Mientras falte una imagen se muestra un arco color nude.

Landing (`assets/img/secciones/`): `ramo-buchon.webp` (fondo transparente), `mini-ramo.webp`, `ramo-mediano.webp`, `ramo-primavera.webp`, `aniversario.webp` (transparente), `aniversario-1.webp`, `aniversario-2.webp`, `amor-eterno.webp`, `juntos-por-siempre.webp`, `sentido-pesame.webp`.

## Agregar un producto
```json
{ "id": "ramo-rosas", "nombre": "Ramo de rosas", "categoria": "ramos",
  "descripcion": "...", "imagenes": ["ramo-rosas.webp", "ramo-rosas-2.webp"] }
```
`id` en minúsculas con guiones. `categoria` debe existir en `categorias`.

## Publicar en GitHub Pages
Subir el repo → Settings → Pages → Branch `main` / root. Todas las rutas son relativas.
