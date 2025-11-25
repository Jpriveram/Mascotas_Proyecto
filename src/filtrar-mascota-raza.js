import mostrarMascota from "./mostrar-mascota.js";
export default async function filtrarMascotasPorRaza(razaMascota, mascotasAdapter) {
  if (!razaMascota || razaMascota.trim() === "") {
    return "<p>Por favor, ingrese una raza para buscar.</p>";
  }

  try {
    const mascotas = await mascotasAdapter.filtrarMascotasPorRaza(razaMascota);
    if (!mascotas || mascotas.length === 0) {
      return "<p>No existen mascotas con esa raza.</p>";
    }

    let html = "";
    mascotas.forEach((m) => {
      html += mostrarMascota(m);
    });

    return html;
  } catch (error) {
    console.error("Error al filtrar por raza desde el frontend:", error.message);
    return `<p>Ocurrió un error al buscar: ${error.message}</p>`;
  }

}