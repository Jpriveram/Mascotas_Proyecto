import filtrarMascotasPorRaza from './filtrar-mascota-raza.js';
import data from './mascotas.json';

describe('filtrarMascotasPorRaza', () => {
  it('debería devolver el HTML correcto para las mascotas que coincidan con la raza', () => {
    const raza = 'Angora'; 
    const resultado = filtrarMascotasPorRaza(raza);
    const mascotasFiltradas = data.mascotas.filter(
      (mascota) => mascota.raza.toLowerCase() === raza.toLowerCase()
    );

    mascotasFiltradas.forEach((mascota) => {
      expect(resultado).toContain(`<h3>${mascota.nombre}</h3>`);
      expect(resultado).toContain(`<p>Especie: ${mascota.especie}</p>`);
      expect(resultado).toContain(`<p>Raza: ${mascota.raza}</p>`);
      expect(resultado).toContain(`<p>Edad: ${mascota.edad}</p>`);
      expect(resultado).toContain(`src="${mascota.foto}"`);
      expect(resultado).toContain(`data-id="${mascota.id}"`);
    });
  });

  it('debería devolver un mensaje si no se ingresa una raza', () => {
    const resultado = filtrarMascotasPorRaza('');
    expect(resultado).toContain('Por favor, ingrese una raza');
  });

  it('debería devolver un mensaje si no existen mascotas con la raza buscada', () => {
    const resultado = filtrarMascotasPorRaza('Schnauzer');
    expect(resultado).toContain('No existen mascotas');
  });
});
