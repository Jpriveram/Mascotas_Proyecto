import filtrarMascotasPorEdad from './filtrar-mascota-edad.js';
import data from './mascotas.json';

describe('filtrarMascotasPorEdad', () => {
    it('debería devolver el array correcto para las mascotas dentro del rango de edad', () => {
        const desde = 1;
        const hasta = 3;

        const resultado = filtrarMascotasPorEdad(desde, hasta, data.mascotas);

        const esperado = data.mascotas.filter(
            (mascota) => mascota.edad >= desde && mascota.edad <= hasta
        );

        expect(resultado).toEqual(esperado);
    });

    it('debería devolver un array vacío si no se ingresan valores', () => {
        const resultado = filtrarMascotasPorEdad('', '', data.mascotas);
        expect(resultado).toEqual([]);
    });

    it('debería devolver un array vacío si no existen mascotas en el rango', () => {
        const resultado = filtrarMascotasPorEdad(100, 200, data.mascotas);
        expect(resultado).toEqual([]);
    });
});