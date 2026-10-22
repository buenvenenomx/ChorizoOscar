# Oscar's Chorizo

Sitio estático (HTML + CSS + JS plano, sin build ni dependencias) de Oscar's Chorizo, chorizo norteño artesanal de Meoqui, Chihuahua.

**Guía de marca:** https://claude.ai/artifact/Suywat4MXURY8r7sSgjiva (privado; paleta medida del empaque real, componentes con vista previa, logos, fotografía y reglas de uso).

## Estructura

| Ruta | Qué es |
|---|---|
| `index.html`, `tiendas.html` | Páginas |
| `css/styles.css` | Sistema visual; los tokens viven en `:root` |
| `js/datos.js` | **Contenido editable**: tiendas, presentaciones, contacto, redes |
| `js/main.js` | Menú móvil, render de productos y tiendas, filtros, revelado al scroll |
| `assets/brand/svg/` | Logo vectorial: `logo-oro` (principal), `logo-crema`, `logo-vino`, `logo-rojo` (secundario), `logo` (`currentColor`) |
| `assets/brand/png/` | El mismo logo en PNG (512, 1024, 2000 px) |
| `assets/brand/` | Favicon, icono de app e imagen para compartir (`og-image.jpg`) |
| `assets/img/` | Fotografía real del producto y de las tiendas (WebP optimizado) |
| `meta_ads_campaign/` | Estrategia y flyers de Meta Ads (pendientes de rehacer con la identidad actual) |

## Editar contenido

Todo se captura en `js/datos.js`. Los registros con `ejemplo: true` se muestran con la etiqueta "Ejemplo": bórralos o quita esa línea al capturar datos reales. Las redes (`instagram`, `facebook`) no se muestran mientras estén vacías.

## Probar en local

```bash
npx http-server . -p 4173
```

## Pendientes

- Capturar dirección, horario y teléfono de cada tienda en `js/datos.js` (hoy solo hay nombre y ciudad).
- Confirmar nombres y pesos de las presentaciones (bola, rollo, paquete) en `js/datos.js`.
- Añadir fotos a las tiendas que aún no la tienen (campo `foto`); mientras tanto muestran el sello.
- Confirmar con el etiquetado real las afirmaciones "100% cerdo" y "sin conservadores ni colorantes" antes de publicar.
- Rehacer `meta_ads_campaign/` (logo, idioma y nombre de marca).
- Páginas de Privacidad y Términos, si se necesitan.
- Al publicar, usar URL absoluta del dominio en `og:image`.

## Precios

No se publican precios en el sitio. El distribuidor compra a un precio menor para dejarle margen, y la venta directa al público cambia según la ciudad (más alta en Chihuahua capital que en Cárdenas o Meoqui). Cada presentación lleva a WhatsApp con un mensaje que pregunta la ciudad, y el precio se cotiza ahí.
