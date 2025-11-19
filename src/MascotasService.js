export default class MascotasService {
    constructor(mascotasRepository) {
        this.mascotasRepository = mascotasRepository;
    }

    async listarMascotas() {
        const mascotas = await this.mascotasRepository.obtenerMascotas();
        return mascotas;
    }
}