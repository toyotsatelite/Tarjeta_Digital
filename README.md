# Tarjetas digitales Toyota · V1

Una plantilla HTML para todos los empleados, sin dependencias ni compilación. Los datos viven en `empleados.json`; las seis imágenes generales se comparten y cada empleado tiene su propia foto.

## Tarjeta inicial

`?id=fernando-diaz` carga a Fernando Diaz, Gerente de Ventas de Toyota Satélite. Sin `id`, se carga `defaultEmployee`. Un identificador desconocido muestra un aviso y nunca carga a otra persona como reemplazo.

## Agregar empleados

1. Sube la foto a `assets/empleados/` con un nombre único, en minúsculas y sin espacios.
2. Agrega un registro en `employees` de `empleados.json`, con una clave única como `nombre-apellido` y los campos `name`, `role`, `agencyId`, `phone`, `whatsapp`, `email`, `photo`.
3. Usa `agencyId: "toyota-satelite"` para reutilizar sus recursos. Los números se guardan como texto de 10 dígitos; el prefijo mexicano `52` está en la agencia y se añade a llamadas y WhatsApp.
4. Comparte `https://fvgvisualink-debug.github.io/tdg_Toyo/?id=nombre-apellido` después de activar Pages.

No copies `index.html`. Cambiar la plantilla actualiza todas las tarjetas. Para otra agencia, agrega una entrada en `agencies` con sus recursos y asóciala al empleado.

## Pendientes reales

- Google Reviews: `agencies.toyota-satelite.reviewsUrl` queda en `null`. Se muestra «Enlace de reseñas pendiente», sin enlace falso. Sustituye por una URL HTTPS cuando esté disponible. Un empleado puede tener su propia `reviewsUrl` para sobrescribir la URL general.
- Teléfono, WhatsApp y correo son exactamente los datos proporcionados para este ensayo; deben confirmarse antes de uso oficial.
- No se inventaron horarios, dirección, teléfonos de servicio ni enlaces de facturación. La sección de facturación es informativa. Bancos utiliza la imagen original, que se puede ampliar.

## Publicar en GitHub Pages

1. Revisa e integra el PR a `main`.
2. En **Settings → Pages → Build and deployment**, selecciona **Deploy from a branch**, rama **main**, carpeta **/(root)** y guarda.
3. Espera a que GitHub termine el despliegue. La tarjeta será `https://fvgvisualink-debug.github.io/tdg_Toyo/?id=fernando-diaz`.

Las rutas son relativas y funcionan bajo `/tdg_Toyo/`; `.nojekyll` permite servir los archivos estáticos. No se requiere dominio propio ni claves. La configuración de Pages no se activa por crear esta rama.

## Verificación local

Ejecuta `npm test` con Node.js para validar selección dinámica, enlaces, recursos y subrutas. Sirve la carpeta con un servidor HTTP local (por ejemplo, `python -m http.server 8000`) y abre `http://localhost:8000/?id=fernando-diaz`. Abrir el HTML con `file://` no permite cargar el JSON correctamente.

Comprueba también un `id` inexistente, móvil y escritorio. Los archivos de imágenes conservan los originales proporcionados. Todos los datos de este sitio son públicos al publicarlo.
