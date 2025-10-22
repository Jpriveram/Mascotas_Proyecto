import publicarMascota from './publicar-mascota';

describe('publicarMascota ', () => {
  it('debería publicar una mascota', () => {
    expect(publicarMascota('Firulais','Salchicha','6 meses','Perro','foto.png'
    )).toEqual('Firulais, Salchicha, 6 meses, Perro, foto.png');   
    });
});