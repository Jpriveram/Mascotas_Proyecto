import mostrarMascota from "./mostrar-mascota.js";
import data from "../mascotas.json";

function filtrarMascotasPorRaza(razaMascota) {
  if (!razaMascota) {
    return "<p>Por favor, ingrese una raza para buscar.</p>";
  }

  const razaLower = razaMascota.toLowerCase();
  const mascotasFiltradas = data.mascotas.filter(
    (mascota) => mascota.raza.toLowerCase() === razaLower
  );

  if (mascotasFiltradas.length === 0) {
    return "<p>No existen mascotas con esa raza.</p>";
  }

  let html = "";
  mascotasFiltradas.forEach((mascota) => {
    html += mostrarMascota(mascota);
  });

  return html;
}

export default filtrarMascotasPorRaza;