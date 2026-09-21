# Tarjetas digitales Toyota · V1

Proyecto de tarjetas digitales para empleados Toyota, publicado como sitio estático mediante GitHub Pages.

Repositorio: `toyotsatelite/Tarjeta_Digital`  
Rama principal: `main`

La solución utiliza una sola plantilla HTML para todos los empleados, sin dependencias ni compilación. Los datos viven en `empleados.json`; los recursos generales se comparten entre las tarjetas y cada empleado mantiene su propia fotografía.

## Tarjeta inicial

`?id=fernando-diaz` carga a Fernando Diaz, Gerente de Ventas de Toyota Satélite.

Si no se proporciona `id`, se carga el empleado definido en `defaultEmployee`. Un identificador desconocido muestra un aviso y nunca carga a otra persona como reemplazo.

Ejemplo:

`https://toyotsatelite.github.io/Tarjeta_Digital/?id=fernando-diaz`

## Agregar empleados

1. Sube la fotografía a `assets/empleados/` con un nombre único, en minúsculas y sin espacios.
2. Agrega un registro en `employees` de `empleados.json`, con una clave única como `nombre-apellido` y los campos `name`, `role`, `agencyId`, `phone`, `whatsapp`, `email` y `photo`.
3. Usa `agencyId: "toyota-satelite"` para reutilizar los recursos generales de Toyota Satélite.
4. Los números se guardan como texto de 10 dígitos. El prefijo mexicano `52` está definido en la agencia y se añade automáticamente a llamadas y WhatsApp.
5. Comparte la tarjeta con la estructura:

   `https://toyotsatelite.github.io/Tarjeta_Digital/?id=nombre-apellido`

No copies ni dupliques `index.html`. Cambiar la plantilla actualiza todas las tarjetas.

Para agregar otra agencia, crea una entrada en `agencies` dentro de `empleados.json`, define sus recursos compartidos y asóciala a cada empleado mediante `agencyId`.

## Estructura principal

- `index.html`: plantilla única de todas las tarjetas.
- `styles.css`: diseño visual y comportamiento responsive.
- `app.js`: carga dinámica de empleados, generación de enlaces de contacto, validaciones y manejo de errores.
- `empleados.json`: información de agencias y empleados.
- `assets/generales/`: imágenes y recursos compartidos.
- `assets/empleados/`: fotografías individuales.
- `tests/cards.test.js`: pruebas automáticas de selección de empleados, rutas, recursos y enlaces.

## Pendientes actuales

- Google Reviews: `agencies.toyota-satelite.reviewsUrl` está en `null`. Mientras no exista una URL oficial, se muestra «Enlace de reseñas pendiente». Un empleado puede tener su propia `reviewsUrl` para sobrescribir la URL general de la agencia.
- Los datos de teléfono, WhatsApp y correo registrados deben confirmarse antes de uso oficial.
- No se han agregado horarios, dirección, teléfonos de servicio ni enlaces de facturación que no hayan sido proporcionados.
- La sección de facturación es informativa.
- La sección de cuentas bancarias utiliza la imagen oficial disponible y permite ampliarla.

## Publicar en GitHub Pages

1. Revisa e integra el cambio correspondiente a `main`.
2. En **Settings → Pages → Build and deployment**, selecciona **Deploy from a branch**.
3. Selecciona la rama **main** y la carpeta **/(root)**.
4. Guarda la configuración y espera a que GitHub complete el despliegue.

La URL del proyecto será:

`https://toyotsatelite.github.io/Tarjeta_Digital/`

Y cada empleado puede abrirse mediante su identificador:

`https://toyotsatelite.github.io/Tarjeta_Digital/?id=fernando-diaz`

Las rutas del proyecto son relativas para conservar correctamente la subruta `/Tarjeta_Digital/` de GitHub Pages. No se requiere dominio propio, backend ni claves para ejecutar el sitio.

## Verificación local

Ejecuta:

`npm test`

Esto valida la selección dinámica de empleados, enlaces, recursos y comportamiento de rutas.

Para visualizar el proyecto localmente, sirve la carpeta mediante un servidor HTTP, por ejemplo:

`python -m http.server 8000`

Después abre:

`http://localhost:8000/?id=fernando-diaz`

No abras directamente `index.html` mediante `file://`, ya que el navegador puede impedir la carga de `empleados.json`.

Antes de publicar cambios, comprueba también:

- Un `id` válido.
- Un `id` inexistente.
- Visualización móvil.
- Visualización de escritorio.
- Que las imágenes y rutas referenciadas existan.
- Que no haya errores JavaScript en la consola.

Todos los datos incluidos en el sitio serán públicos una vez publicados mediante GitHub Pages.
