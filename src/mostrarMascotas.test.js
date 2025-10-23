import mostrarMascota from './mostrar-mascota';

describe('mostrarMascota', () => {
  it('debería tomar un objeto mascota y devolver un string HTML formateado', () => {

    const mascota = {
      "nombre": "Luna",
      "raza": "Labrador Retriever",
      "edad": 24,
      "especie": "Perro",
      "foto": "https://example.com/fotos/luna.jpg"
    };
    const resultadoEsperado = '<div class="mascota-item">' +
                                '<h3>Luna</h3>' +
                                '<p>Especie: Perro</p>' +
                                '<p>Raza: Labrador Retriever</p>' +
                                '<p>Edad: 24 </p>' +
                                '<img src="https://example.com/fotos/luna.jpg" alt="Foto de Luna">' +
                              '</div>';

    expect(mostrarMascota(mascota)).toEqual(resultadoEsperado);
  });
});