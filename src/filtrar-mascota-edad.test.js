import filtrarMascotasPorEdad from './filtrar-mascota-edad.js';
import data from './mascotas.json';

describe('filtrarMascotasPorEdad', () => {
it('debería devolver el HTML correcto para las mascotas dentro del rango de edad', () => {
  const desde = 8;
  const hasta = 20;

  const resultado = filtrarMascotasPorEdad(desde, hasta);

  const filtradas = data.mascotas.filter(
    (m) => m.edad >= desde && m.edad <= hasta
  );

  let htmlEsperado = '';
  filtradas.forEach((m) => {
    htmlEsperado +=
      '<div class="mascota-item">' +
      `<h3>${m.nombre}</h3>` +
      `<p>Especie: ${m.especie}</p>` +
      `<p>Raza: ${m.raza}</p>` +
      `<p>Edad: ${m.edad}</p>` +
      `<img src="${m.foto}" alt="Foto de ${m.nombre}">` +
      '</div>';
  });

  expect(resultado).toEqual(htmlEsperado);
});

  it('debería devolver un mensaje si no se ingresan valores', () => {
    const resultado = filtrarMascotasPorEdad('', '');
    expect(resultado).toEqual('<p>Por favor, ingrese un rango de edad de mascotas para buscar.</p>');
  });

  it('debería devolver un mensaje si no existen mascotas en el rango', () => {
    const resultado = filtrarMascotasPorEdad(100, 200);
    expect(resultado).toEqual('<p>No existen mascotas con ese rango de edad.</p>');
  });
});

