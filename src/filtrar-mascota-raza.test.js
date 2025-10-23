import filtrarMascotasPorRaza from './filtrar-mascota-raza.js';
import data from './mascotas.json';

describe('filtrarMascotasPorRaza', () => {
  it('debería devolver el HTML correcto para las mascotas que coincidan con la raza', () => {
    const raza = 'Angora'; // Raza a buscar

    const resultado = filtrarMascotasPorRaza(raza);

    const filtradas = data.mascotas.filter(
      (m) => m.raza.toLowerCase() === raza.toLowerCase() // Comparación sin case sensitive
    );

    let htmlEsperado = '';
    filtradas.forEach((m) => {
      htmlEsperado +=
        '<div class="mascota-item">' +
        `<h3>${m.nombre}</h3>` +
        `<p>Especie: ${m.especie}</p>` +
        `<p>Raza: ${m.raza}</p>` +
        `<p>Edad: ${m.edad} meses</p>` +
        `<img src="${m.foto}" alt="Foto de ${m.nombre}">` +
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
