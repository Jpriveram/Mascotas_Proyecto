import mostrarMascota from "./mostrar-mascota.js";
const data = require("./mascotas.json");

function filtrarMascotasPorEdad(desde, hasta) {
  if (!desde || !hasta) {
    return "<p>Por favor, ingrese un rango de edad de mascotas para buscar.</p>";
  }

  const filtradas = data.mascotas.filter(
    (m) => m.edad >= desde && m.edad <= hasta
  );

  if (filtradas.length === 0) {
    return "<p>No existen mascotas con ese rango de edad.</p>";
  }

  let html = "";
  filtradas.forEach((m) => {
    html += mostrarMascota(m);
  });

  return html;
}

export default filtrarMascotasPorEdad;
