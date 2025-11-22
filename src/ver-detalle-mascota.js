import mostrarMascota from "./mostrar-mascota.js";

export function crearVerDetalleMascota(mascotasService) {
  return async function verDetalleMascota(id) {
    const contenedor = document.querySelector("#lista-mascotas");

    try {
      const mascota = await mascotasService.obtenerMascotaPorId(id);

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
        await cargarListaOriginal(mascotasService);
      });

    } catch (error) {
      contenedor.innerHTML = `<p>Error al cargar detalles: ${error.message}</p>`;
      console.error("Error al cargar detalles:", error);
    }
 }
}

async function cargarListaOriginal(mascotasService) {
  const listaDiv = document.querySelector("#lista-mascotas");
  
  try {
      const mascotas = await mascotasService.listarMascotas();
  
      let html = "";
      mascotas.forEach((m) => {
        html += mostrarMascota(m);
      });
  
      listaDiv.innerHTML = html;

      const botones = document.querySelectorAll(".ver-detalle-btn");
      botones.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;
          const verDetalleMascota = crearVerDetalleMascota(mascotasService);
          await verDetalleMascota(id);
        });
      });
  } catch (error) {
    listaDiv.innerHTML = `<p>Error recargando lista: ${error.message}</p>`;
    console.error("Error recargando lista:", error);
  }
    
}
    
