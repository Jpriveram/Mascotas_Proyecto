import mostrarMascota from "./mostrar-mascota.js";
import publicarMascota from "./publicar-mascota.js";
import filtrarMascotasPorEdad from "./filtrar-mascota-edad.js";
import filtrarMascotasPorRaza from "./filtrar-mascota-raza.js";
import verDetalleMascota from "./ver-detalle-mascota.js";
import { supabase } from "./supabaseClient.js";
import MascotasRepository from "./MascotasRepository.js";

const mascotasRepository = new MascotasRepository();

const nombre = document.querySelector("#nombre-mascota");
const raza = document.querySelector("#raza-mascota");
const edad = document.querySelector("#edad-mascota");
const especie = document.querySelector("#especie-mascota");
const foto = document.querySelector("#foto-mascota");
const form = document.querySelector("#publicar-form");
const div = document.querySelector("#resultado-div"); // no borrar esta linea
const listaDiv = document.querySelector("#lista-mascotas");

const edadDesde = document.querySelector("#edad-desde");
const edadHasta = document.querySelector("#edad-hasta");
const buscarBtn = document.querySelector("#buscar-rango-button");
const divFiltrarEdad = document.querySelector("#resultado-buscar-edad-div");

const CampoRaza = document.querySelector("#raza-filtro");
const buscarRazaBtn = document.querySelector("#buscar-raza-button");
const divFiltrarRaza = document.querySelector("#resultado-buscar-raza-div");

// Cargar todas las mascotas al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    await cargarMascotas();
});


// Función para cargar y mostrar todas las mascotas desde Supabase
async function cargarMascotas() {
    try {
        const mascotas = await mascotasRepository.obtenerMascotas();

        let htmlTotal = "";
        mascotas.forEach(mascota => {
            htmlTotal += mostrarMascota(mascota);
        });

        listaDiv.innerHTML = htmlTotal;
        const botones = document.querySelectorAll(".ver-detalle-btn");
        
        botones.forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            await verDetalleMascota(id);
      });
    });
} catch (error) {
    listaDiv.innerHTML = `<p>Error cargando mascotas: ${error.message}</p>`;
    console.error("Error cargando mascotas:", error);
  }
}

// Guardar mascota en Supabase al hacer submit en el formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nombre.value;
    const breed = raza.value;
    const age = Number.parseInt(edad.value);
    const species = especie.value;
    const photo = foto.value;

    // Insertar en Supabase
    const { data, error } = await supabase
        .from('mascotas')
        .insert([
            { nombre: name, raza: breed, edad: age, especie: species, foto: photo }
        ]);

    if (error) {
        div.innerHTML = `<p>Error publicando mascota: ${error.message}</p>`;
        return;
    }

    div.innerHTML = "<p>" + publicarMascota(name, breed, age, species, photo) + "</p>";

    // Recargar la lista de mascotas
    await cargarMascotas();
});

// Filtrar mascotas por edad usando los datos de Supabase
buscarBtn.addEventListener("click", async () => {
    const desde = Number.parseInt(edadDesde.value);  
    const hasta = Number.parseInt(edadHasta.value);

    // Validar si los valores existen y son números válidos
    if (isNaN(desde) || isNaN(hasta)) {
        divFiltrarEdad.innerHTML = "<p>Por favor, ingrese un rango de edad de mascotas para buscar.</p>";
        return;
    }

    try {
        // Traer todas las mascotas del rango desde Supabase
        const { data: mascotas, error } = await supabase
            .from('mascotas')
            .select('*')
            .gte('edad', desde)
            .lte('edad', hasta);

        if (error) throw error;

        // Usar la función filtradora para mantener estructura y testabilidad
        const filtradas = filtrarMascotasPorEdad(desde, hasta, mascotas);

        if (!filtradas.length) {
            divFiltrarEdad.innerHTML = "<p>No existen mascotas con ese rango de edad.</p>";
            return;
        }

        let html = "";
        filtradas.forEach((mascota) => {
            html += mostrarMascota(mascota);
        });
        divFiltrarEdad.innerHTML = html;

    } catch (error) {
        divFiltrarEdad.innerHTML = `<p>Error filtrando mascotas: ${error.message}</p>`;
        console.error("Error filtrando mascotas:", error);
    }
});

buscarRazaBtn.addEventListener("click", () => {
  const razaBuscada = CampoRaza.value;
  const html = filtrarMascotasPorRaza(razaBuscada);
  divFiltrarRaza.innerHTML = html;
});