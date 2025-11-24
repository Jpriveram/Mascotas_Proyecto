import mostrarMascota from "./mostrar-mascota.js";
import { supabase } from "./supabaseClient.js";

async function filtrarMascotasPorRaza(razaMascota) {
  if (!razaMascota) {
    return "<p>Por favor, ingrese una raza para buscar.</p>";
  }

  // Consulta a Supabase ignorando mayúsculas/minúsculas
  const { data, error } = await supabase
    .from("mascotas")
    .select("*")
    .ilike("raza", razaMascota); // ilike = case insensitive

  if (error) {
    console.error("Error al consultar Supabase:", error.message);
    return "<p>Ocurrió un error al buscar en la base de datos.</p>";
  }

  if (!data || data.length === 0) {
    return "<p>No existen mascotas con esa raza.</p>";
  }

  // Construir el HTML con las mascotas encontradas
  let html = "";
  data.forEach((m) => {
    html += mostrarMascota(m);
  });

  return html;
}

export default filtrarMascotasPorRaza;