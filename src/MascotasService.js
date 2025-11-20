export default class MascotasService {
    constructor(mascotasRepository) {
        this.mascotasRepository = mascotasRepository;
    }

    async listarMascotas() {
        const mascotas = await this.mascotasRepository.obtenerMascotas();
        return mascotas;
    }
    
     async obtenerMascotaPorId(id) {
        const mascota = await this.mascotasRepository.obtenerMascotaPorId(id);
        return mascota;
    }
}