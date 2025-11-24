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

    async publicarMascota(nombre, raza, edad, especie, foto) {
        await this.mascotasRepository.insertarMascota(nombre, raza, edad, especie, foto);
    }

    async filtrarMascotasPorEdadBd(desde, hasta) {
        const mascotas = await this.mascotasRepository.filtrarMascotasPorEdadBd(desde, hasta);
        return mascotas;
    }
}