import mostrarMascota from "./mostrar-mascota.js";
import data from "./mascotas.json";

function filtrarMascotasPorRaza(raza) {
  if (!raza) {
    return "<p>Por favor, ingrese una raza para buscar.</p>";
  }

  const razaLower = raza.toLowerCase();
  const filtradas = data.mascotas.filter(
    (m) => m.raza.toLowerCase() === razaLower
  );

  if (filtradas.length === 0) {
    return "<p>No existen mascotas con esa raza.</p>";
  }

  let html = "";
  filtradas.forEach((m) => {
    html += mostrarMascota(m);
  });

  return html;
}

export default filtrarMascotasPorRaza;