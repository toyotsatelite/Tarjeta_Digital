const $ = (id) => document.getElementById(id);
const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

// Relative URLs preserve /tdg_Toyo/ on GitHub Pages and work under any project name.
export function assetUrl(path, base = document.baseURI) {
  if (typeof path !== 'string' || !/^assets\/[a-zA-Z0-9_./-]+$/.test(path) || path.split('/').includes('..')) {
    throw new Error('Ruta de imagen inválida.');
  }
  return new URL(path, base).href;
}

export function selectEmployee(data, search) {
  if (data.schemaVersion !== 1 || !data.employees || !data.agencies) throw new Error('Base de empleados inválida.');
  const params = new URLSearchParams(search);
  const id = params.has('id') ? params.get('id') : data.defaultEmployee;
  if (!id || !own(data.employees, id)) throw new Error('No encontramos esta tarjeta. Revisa el enlace con tu asesor.');
  const employee = data.employees[id];
  if (!own(data.agencies, employee.agencyId)) throw new Error('La agencia de esta tarjeta no está disponible.');
  return { employee, agency: data.agencies[employee.agencyId] };
}

export function contactLinks(employee, agency) {
  const international = (number) => {
    if (!/^\d{10}$/.test(number) || !/^\d{1,3}$/.test(agency.countryCode)) throw new Error('Teléfono inválido.');
    return agency.countryCode + number;
  };
  if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(employee.email)) throw new Error('Correo inválido.');
  return { phone: 'tel:+' + international(employee.phone), whatsapp: 'https://wa.me/' + international(employee.whatsapp), email: 'mailto:' + employee.email };
}

export function reviewUrl(value) {
  if (!value) return null;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Enlace de reseñas inválido.');
  return url.href;
}

async function init() {
  try {
    const response = await fetch(new URL('./empleados.json', document.baseURI), { cache: 'no-cache' });
    if (!response.ok) throw new Error('No pudimos cargar la tarjeta. Intenta nuevamente más tarde.');
    const { employee, agency } = selectEmployee(await response.json(), location.search);
    const links = contactLinks(employee, agency);
    const review = reviewUrl(employee.reviewsUrl ?? agency.reviewsUrl);
    for (const [id, value] of Object.entries({ 'employee-name': employee.name, 'employee-role': employee.role, 'agency-name': agency.name, 'footer-agency': agency.name })) $(id).textContent = value;
    const images = { 'hero-image': agency.hero, 'agency-logo': agency.logo, portrait: employee.photo, 'bank-image': agency.bankImage, 'billing-image': agency.billingImage, 'reviews-image': agency.reviewsImage, 'alden-logo': agency.footerLogo };
    for (const [id, path] of Object.entries(images)) {
      $(id).addEventListener('error', () => {
        if (!$('asset-warning')) {
          const warning = document.createElement('p');
          warning.id = 'asset-warning'; warning.className = 'asset-warning'; warning.setAttribute('role', 'status');
          warning.textContent = 'Una imagen no está disponible. Intenta recargar la página.';
          $('profile').append(warning);
        }
      }, { once: true });
      $(id).src = assetUrl(path);
    }
    $('portrait').alt = 'Fotografía de ' + employee.name;
    $('agency-logo').alt = agency.name;
    $('bank-link').href = assetUrl(agency.bankImage);
    for (const [id, href] of Object.entries(links)) $(id).href = href;
    if (review) { $('reviews-link').href = review; $('reviews-link').hidden = false; $('reviews-pending').hidden = true; }
    document.title = employee.name + ' | ' + agency.name;
    $('profile').hidden = false;
    $('status').hidden = true;
  } catch (error) {
    $('status').textContent = error instanceof TypeError || error instanceof SyntaxError ? 'No pudimos cargar la tarjeta. Comprueba tu conexión e intenta recargar la página.' : error.message;
  }
}

if (typeof document !== 'undefined') init();
