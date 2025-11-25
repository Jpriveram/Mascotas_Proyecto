export class MascotasService {
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
        const nuevaMascota = await this.mascotasRepository.insertarMascota(nombre, raza, edad, especie, foto);
        return nuevaMascota;
    }

    async filtrarMascotasPorEdad(desde, hasta) {
        const mascotas = await this.mascotasRepository.filtrarMascotasPorEdad(desde, hasta);
        return mascotas;
    }

    async filtrarMascotasPorRaza(raza) {
        const mascotas = await this.mascotasRepository.filtrarMascotasPorRaza(raza);
        return mascotas;
    }
}