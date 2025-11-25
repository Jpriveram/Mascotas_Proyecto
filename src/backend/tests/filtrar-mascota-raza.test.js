import filtrarMascotasPorRaza from "../../filtrar-mascota-raza.js";
import mostrarMascota from "../../mostrar-mascota.js"; 

const mascotasAdapterMock = {
    filtrarMascotasPorRaza: jest.fn(),
};

jest.mock('../../mostrar-mascota.js', () => ({
    __esModule: true,
    default: jest.fn(mascota => `<h3>${mascota.nombre}</h3><p>Raza: ${mascota.raza}</p>`)
}));

describe('filtrarMascotasPorRaza (Frontend Logic)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debería devolver el HTML correcto para las mascotas que coincidan con la raza', async () => {
        const mockMascotas = [
            { id: 1, nombre: 'Nube', especie: 'Gato', raza: 'Angora', edad: 4, foto: '' },
            { id: 2, nombre: 'Blanca', especie: 'Perro', raza: 'Angora', edad: 2, foto: '' },
        ];
        mascotasAdapterMock.filtrarMascotasPorRaza.mockResolvedValue(mockMascotas);
        const resultado = await filtrarMascotasPorRaza('Angora', mascotasAdapterMock); 
        expect(mascotasAdapterMock.filtrarMascotasPorRaza).toHaveBeenCalledWith('Angora');
        expect(resultado).toContain("<h3>Nube</h3>");
        expect(resultado).toContain("Raza: Angora");
    });
    
    test('debería devolver un mensaje si no existen mascotas con la raza buscada', async () => {
        mascotasAdapterMock.filtrarMascotasPorRaza.mockResolvedValue([]);
        const resultado = await filtrarMascotasPorRaza('Schnauzer', mascotasAdapterMock); 
        
        expect(resultado).toContain('No existen mascotas');
    });
    test('debería devolver un mensaje si la raza es vacía', async () => {
        const resultado = await filtrarMascotasPorRaza('', mascotasAdapterMock);       
        expect(resultado).toContain('Por favor, ingrese una raza para buscar.');
        expect(mascotasAdapterMock.filtrarMascotasPorRaza).not.toHaveBeenCalled();
    });
});