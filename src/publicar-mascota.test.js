import publicarMascota from './publicar-mascota';

describe('publicarMascota ', () => {
  it('debería publicar una mascota', () => {
    const div = document.createElement('div');
    const resultado = publicarMascota(div, 'Firulais', 'Salchicha', 6, 'Perro', 'foto.png');
    expect(resultado).toEqual('<p>Firulais, Salchicha, 6, Perro, foto.png</p>');
  });
});