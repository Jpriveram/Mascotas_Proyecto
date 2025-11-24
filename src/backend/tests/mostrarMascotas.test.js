import mostrarMascota from '../../mostrar-mascota.js';

describe('mostrarMascota', () => {
  it('debería devolver un HTML válido con los datos de la mascota', () => {

    const mascota = {
      id: 1,
      nombre: "Luna",
      raza: "Labrador Retriever",
      edad: 24,
      especie: "Perro",
      foto: "https://example.com/fotos/luna.jpg"
    };

    const resultado = mostrarMascota(mascota);

    expect(resultado).toContain('<div class="mascota-item">');
    expect(resultado).toContain('<h3>Luna</h3>');
    expect(resultado).toContain('<p>Especie: Perro</p>');
    expect(resultado).toContain('<p>Raza: Labrador Retriever</p>');
    expect(resultado).toContain('<p>Edad: 24</p>');
    expect(resultado).toContain('src="https://example.com/fotos/luna.jpg"');
    expect(resultado).toContain('class="ver-detalle-btn"');
    expect(resultado).toContain('Ver detalles');
  });
});
