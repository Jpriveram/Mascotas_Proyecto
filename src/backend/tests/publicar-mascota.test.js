import publicarMascota from '../../publicar-mascota.js'; 

describe('publicarMascota', () => {  
  it('debería publicar una mascota y devolver el HTML de éxito correcto', () => {
    const div = document.createElement('div');
    const nombre = 'Firulais';
    const raza = 'Salchicha';
    const edad = 6;
    const especie = 'Perro';
    const foto = 'foto.png';
    
    const resultado = publicarMascota(div, nombre, raza, edad, especie, foto);
    const expectedHtml = `
        <div class="success-message">
            <p>¡Mascota Publicada con Éxito!</p>
            <p><strong>${nombre}</strong> (${especie}) ha sido añadida a la lista.</p>
        </div>
    `;
    expect(resultado.trim()).toEqual(expectedHtml.trim());
    expect(div.innerHTML.trim()).toEqual(expectedHtml.trim());
  });
});