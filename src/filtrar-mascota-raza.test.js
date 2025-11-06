import filtrarMascotasPorRaza from './filtrar-mascota-raza.js';
import data from './mascotas.json';

describe('filtrarMascotasPorRaza', () => {
  it('debería devolver el HTML correcto para las mascotas que coincidan con la raza', () => {
    const raza = 'Angora'; // Raza a buscar

    const resultado = filtrarMascotasPorRaza(raza);

    const filtradas = data.mascotas.filter(
      (mascota) => mascota.raza.toLowerCase() === raza.toLowerCase() // Comparación sin case sensitive
    );

    let htmlEsperado = '';
    filtradas.forEach((mascota) => {
      htmlEsperado +=
        '<div class="mascota-item">' +
        `<h3>${mascota.nombre}</h3>` +
        `<p>Especie: ${mascota.especie}</p>` +
        `<p>Raza: ${mascota.raza}</p>` +
        `<p>Edad: ${mascota.edad}</p>` +
        `<img src="${mascota.foto}" alt="Foto de ${mascota.nombre}">` +
        '</div>';
    });

    expect(resultado).toEqual(htmlEsperado);
  });

  it('debería devolver un mensaje si no se ingresa una raza', () => {
    const resultado = filtrarMascotasPorRaza('');
    expect(resultado).toEqual('<p>Por favor, ingrese una raza para buscar.</p>');
  });

  it('debería devolver un mensaje si no existen mascotas con la raza buscada', () => {
    const resultado = filtrarMascotasPorRaza('Schnauzer');
    expect(resultado).toEqual('<p>No existen mascotas con esa raza.</p>');
  });
});
