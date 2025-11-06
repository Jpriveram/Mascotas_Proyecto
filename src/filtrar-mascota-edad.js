export default function filtrarMascotasPorEdad(desde, hasta, mascotas) {
    if (
        typeof desde !== "number" || isNaN(desde) ||
        typeof hasta !== "number" || isNaN(hasta)
    ) {
        return [];
    }
    return mascotas.filter((mascota) => mascota.edad >= desde && mascota.edad <= hasta);
}