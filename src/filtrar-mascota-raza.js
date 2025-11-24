export default function filtrarMascotasPorRaza(raza, mascotas) {
    if (!raza || typeof raza !== "string") {
        return [];
    }

    const razaLower = raza.toLowerCase();

    return mascotas.filter(
        (mascota) => mascota.raza.toLowerCase() === razaLower
    );
}