import filtrarMascotasPorRaza from './filtrar-mascota-raza.js';

jest.mock("@supabase/supabase-js");

describe('filtrarMascotasPorRaza', () => {

  it('debería devolver el HTML correcto para las mascotas que coincidan con la raza', async () => {
    const resultado = await filtrarMascotasPorRaza('Angora');

    expect(resultado).toContain("<h3>Nube</h3>");
    expect(resultado).toContain("Especie: Gato");
    expect(resultado).toContain("Raza: Angora");
  });

  it('debería devolver un mensaje si no se ingresa una raza', async () => {
    const resultado = await filtrarMascotasPorRaza('');
    expect(resultado).toContain('Por favor, ingrese una raza');
  });

  it('debería devolver un mensaje si no existen mascotas con la raza buscada', async () => {

    // Sobrescribir mock para este test
    const { createClient } = require('@supabase/supabase-js');
    createClient().from().select().ilike = () => ({
      data: [],
      error: null
    });

    const resultado = await filtrarMascotasPorRaza('Schnauzer');
    expect(resultado).toContain('No existen mascotas');
  });
});