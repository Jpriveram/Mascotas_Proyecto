import mostrarMascota from "../../mostrar-mascota.js";

describe('mostrarMascota', () => {
    test('debería devolver un HTML válido con los datos de la mascota', () => {
        const mascota = {
            id: 1,
            nombre: 'Luna',
            especie: 'Perro',
            raza: 'Labrador Retriever',
            edad: 24,
            foto: 'https://example.com/fotos/luna.jpg'
        };

        const resultado = mostrarMascota(mascota);
        expect(resultado).toContain('<div class="mascota-card">'); 
        expect(resultado).toContain('<h3>Luna</h3>');
        expect(resultado).toContain('<p>Especie: Perro</p>');
        expect(resultado).toContain('<p>Raza: Labrador Retriever</p>');
        expect(resultado).toContain('<p>Edad: 24 años</p>'); 
        expect(resultado).toContain('src="https://example.com/fotos/luna.jpg"');
        expect(resultado).toContain('data-id="1"');
    });
});
