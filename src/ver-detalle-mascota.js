import { supabase } from "./supabaseClient.js";

async function verDetalleMascota(id) {
  const contenedor = document.querySelector("#lista-mascotas");

  try {
    const { data: mascota, error } = await supabase
      .from("mascotas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    contenedor.innerHTML = `
      <div class="detalle-mascota">
        <h2>${mascota.nombre}</h2>
        <img src="${mascota.foto}" alt="Foto de ${mascota.nombre}" style="max-width:300px;">
        <p><strong>Especie:</strong> ${mascota.especie}</p>
        <p><strong>Raza:</strong> ${mascota.raza}</p>
        <p><strong>Edad:</strong> ${mascota.edad}</p>
        <button id="volver-btn">Volver</button>
      </div>
    `;

    document.querySelector("#volver-btn").addEventListener("click", async () => {
      await cargarListaOriginal();
    });

  } catch (error) {
    contenedor.innerHTML = `<p>Error al cargar detalles: ${error.message}</p>`;
  }
}

async function cargarListaOriginal() {
  const { data: mascotas, error } = await supabase.from("mascotas").select("*");
  const listaDiv = document.querySelector("#lista-mascotas");
  if (error) {
    listaDiv.innerHTML = `<p>Error recargando lista: ${error.message}</p>`;
    return;
  }

  const { default: mostrarMascota } = await import("./mostrar-mascota.js");

  let html = "";
  mascotas.forEach((m) => (html += mostrarMascota(m)));
  listaDiv.innerHTML = html;

  const botones = document.querySelectorAll(".ver-detalle-btn");
  botones.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await verDetalleMascota(id);
    });
  });
}

export default verDetalleMascota;
