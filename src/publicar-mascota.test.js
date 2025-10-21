import publicarMascota from './publicar-mascota';

describe('publicarMascota ', () => {
  it('debería publicar una mascota', () => {
    expect(publicarMascota({
      nombre: 'Firulais',
      raza: 'Salchicha',
      edad: '6 meses',
      especie: 'Perro',
      foto: 'foto.png'
    })).toEqual('Firulais, Salchicha, 6 meses, Perro, foto.png');   
    });
});