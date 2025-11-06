import mostrarMascota from "./mostrar-mascota.js";
import data from "./mascotas.json";

function filtrarMascotasPorRaza(raza) {
  if (!raza) {
    return "<p>Por favor, ingrese una raza para buscar.</p>";
  }

  const razaLower = raza.toLowerCase();
  const filtradas = data.mascotas.filter(
    (mascota) => mascota.raza.toLowerCase() === razaLower
  );

  if (filtradas.length === 0) {
    return "<p>No existen mascotas con esa raza.</p>";
  }

  let html = "";
  filtradas.forEach((mascota) => {
    html += mostrarMascota(mascota);
  });

  return html;
}

export default filtrarMascotasPorRaza;