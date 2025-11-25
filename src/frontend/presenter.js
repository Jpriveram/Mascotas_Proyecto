import mostrarMascota from "../mostrar-mascota.js";

import filtrarMascotasPorRaza from "../filtrar-mascota-raza.js";
import publicarMascota from "../publicar-mascota.js";
import { verDetalleMascota } from "../ver-detalle-mascota.js";
import { MascotasRestAdapter } from "./MascotasRestAdapter.js";

const mascotasAdapter = new MascotasRestAdapter(); 
const manejarVerDetalleMascota = verDetalleMascota(mascotasAdapter);

const nombre = document.querySelector("#nombre-mascota");
const raza = document.querySelector("#raza-mascota");
const edad = document.querySelector("#edad-mascota");
const especie = document.querySelector("#especie-mascota");
const foto = document.querySelector("#foto-mascota");
const form = document.querySelector("#publicar-form");
const div = document.querySelector("#resultado-div");
const listaDiv = document.querySelector("#lista-mascotas");

const edadDesde = document.querySelector("#edad-desde");
const edadHasta = document.querySelector("#edad-hasta");
const buscarBtn = document.querySelector("#buscar-rango-button");
const divFiltrarEdad = document.querySelector("#resultado-buscar-edad-div");

const CampoRaza = document.querySelector("#raza-filtro");
const buscarRazaBtn = document.querySelector("#buscar-raza-button");
const divFiltrarRaza = document.querySelector("#resultado-buscar-raza-div");


document.addEventListener("DOMContentLoaded", async () => {
    await cargarMascotas();
});



async function cargarMascotas() {
    try {
        const mascotas = await mascotasAdapter.listarMascotas();
        
        let htmlTotal = "";
        mascotas.forEach(mascota => {
            htmlTotal += mostrarMascota(mascota);
        });

        listaDiv.innerHTML = htmlTotal;
        const botones = document.querySelectorAll(".ver-detalle-btn");
        
        botones.forEach((btn) => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                await manejarVerDetalleMascota(id); 
            });
         });
    } catch (error) {
        listaDiv.innerHTML = `<p>Error cargando mascotas: ${error.message}</p>`;
        console.error("Error cargando mascotas:", error);
    }
}

// Publicar mascota
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nombre.value;
    const breed = raza.value;
    const age = Number.parseInt(edad.value);
    const species = especie.value;
    const photo = foto.value;
    try {
        const nuevaMascota = await mascotasAdapter.publicarMascota({
            nombre: name, 
            raza: breed, 
            edad: age, 
            especie: species, 
            foto: photo 
        });
        publicarMascota(div, nuevaMascota.nombre, nuevaMascota.raza, nuevaMascota.edad, nuevaMascota.especie, nuevaMascota.foto);
        await cargarMascotas();
    } catch (error) {
        div.innerHTML = `<p>Error al publicar: ${error.message}</p>`;
        console.error("Error al publicar mascota:", error);
    }
});


// Filtrar mascotas por edad
buscarBtn.addEventListener("click", async () => {
    const desde = Number.parseInt(edadDesde.value);  
    const hasta = Number.parseInt(edadHasta.value);


    if (isNaN(desde) || isNaN(hasta)) {
        divFiltrarEdad.innerHTML = "<p>Por favor, ingrese un rango de edad de mascotas para buscar.</p>";
        return;
    }

    try {
        const mascotas = await mascotasAdapter.filtrarMascotasPorEdad(desde,hasta);
        if (!mascotas.length) {
            divFiltrarEdad.innerHTML = "<p>No existen mascotas con ese rango de edad.</p>";
            return;
        }

        let html = "";
        mascotas.forEach((mascota) => {
            html += mostrarMascota(mascota);
        });
        divFiltrarEdad.innerHTML = html;

    } catch (error) {
        divFiltrarEdad.innerHTML = `<p>Error filtrando mascotas: ${error.message}</p>`;
        console.error("Error filtrando mascotas:", error);
    }
});

buscarRazaBtn.addEventListener("click", async () => {
  const razaBuscada = CampoRaza.value.trim();

  divFiltrarRaza.innerHTML = "<p>Buscando mascotas...</p>"; 
  const html = await filtrarMascotasPorRaza(razaBuscada, mascotasAdapter);
  divFiltrarRaza.innerHTML = html;
});