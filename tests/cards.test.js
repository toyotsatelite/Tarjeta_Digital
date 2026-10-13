import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { assetUrl, selectEmployee, contactLinks, footerDetails, reviewUrl } from '../app.js';
const data = JSON.parse(readFileSync(new URL('../empleados.json', import.meta.url)));
test('Default, explicit employee and safe unknown IDs', () => {
  assert.equal(selectEmployee(data, '').employee.name, 'Fernando Diaz');
  assert.equal(selectEmployee(data, '?id=fernando-diaz').employee.role, 'Gerente de Ventas');
  for (const id of ['missing', '', '__proto__', 'constructor']) assert.throws(() => selectEmployee(data, '?id=' + id));
});
test('Additional employees use the same template and shared agency', () => {
  const fixture = structuredClone(data);
  fixture.employees['test-only'] = { ...fixture.employees['fernando-diaz'], name: 'TEST ONLY' };
  assert.equal(selectEmployee(fixture, '?id=test-only').employee.name, 'TEST ONLY');
  assert.equal(selectEmployee(fixture, '?id=test-only').agency, fixture.agencies['toyota-satelite']);
});
test('All seven image paths exist and preserve Pages project subpath', () => {
  const a = data.agencies['toyota-satelite'];
  const paths = [a.logo,a.hero,a.bankImage,a.billingImage,a.reviewsImage,a.footerLogo,data.employees['fernando-diaz'].photo];
  assert.equal(new Set(paths).size, 7);
  for (const path of paths) {
    assert.ok(existsSync(new URL('../' + path, import.meta.url)), path);
    assert.equal(assetUrl(path, 'https://example.github.io/tdg_Toyo/?id=fernando-diaz'), 'https://example.github.io/tdg_Toyo/' + path);
  }
  for (const path of ['/assets/a.png','assets/../a.png','https://evil.example/a.png']) assert.throws(() => assetUrl(path));
});
test('Contact destinations and configured review link', () => {
  const { employee, agency } = selectEmployee(data, '');
  assert.deepEqual(contactLinks(employee, agency), {
    phone:'tel:+525579030264',
    whatsapp:'https://wa.me/525579030264?text=Hola%20Fernando%20Diaz%2C%20te%20estoy%20escribiendo%20desde%20tu%20tarjeta%20digital%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n',
    email:'mailto:nombre@toyotasatelite.mx'
  });
  assert.deepEqual(footerDetails(agency), {
    agencyPhone:'tel:+525553210550',
    customerServicePhone:'tel:+525579000949',
    servicePhone:'tel:+525546041865',
    salesHours:['Lunes a Viernes: 09:00 a 20:00 hrs','Sábados: 09:00 a 18:00 hrs','Domingos: 10:00 a 18:00 hrs']
  });
  assert.equal(reviewUrl(agency.reviewsUrl), 'https://search.google.com/local/writereview?placeid=ChIJfyasQNQC0oURVqSF9-1A3hM&source=g.page.m._&laa=merchant-review-solicitation');
  assert.equal(reviewUrl('https://example.com/review'), 'https://example.com/review');
  assert.throws(() => reviewUrl('javascript:alert(1)'));
});
