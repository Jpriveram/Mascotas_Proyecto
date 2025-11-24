import filtrarMascotasPorRaza from '../../filtrar-mascota-raza.js';
import data from '../../backend/data/mascotas.json';

describe('filtrarMascotasPorRaza', () => {

  it('debería devolver el array correcto para las mascotas que coincidan con la raza', () => {
      const raza = "Angora";

      const resultado = filtrarMascotasPorRaza(raza, data.mascotas);

      const esperado = data.mascotas.filter(
          (m) => m.raza.toLowerCase() === raza.toLowerCase()
      );

      expect(resultado).toEqual(esperado);
  });

  it('debería devolver un array vacío si no se ingresa una raza', () => {
      const resultado = filtrarMascotasPorRaza('', data.mascotas);
      expect(resultado).toEqual([]);
  });

  it('debería devolver un array vacío si no existen mascotas con la raza buscada', () => {
      const resultado = filtrarMascotasPorRaza('Schnauzer', data.mascotas);
      expect(resultado).toEqual([]);
  });

});