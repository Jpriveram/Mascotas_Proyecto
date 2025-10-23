import mostrarMascota from "./mostrar-mascota.js";
import data from './mascotas.json';
import publicarMascota from "./publicar-mascota.js";
import filtrarMascotasPorEdad from "./filtrar-mascota-edad.js";
import filtrarMascotasPorRaza from "./filtrar-mascota-raza.js";

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



form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nombre.value;
  const breed = raza.value;
  const age = Number.parseInt(edad.value);
  const species = especie.value;
  const photo = foto.value;

  div.innerHTML = "<p>" + publicarMascota(name, breed, age, species, photo) + "</p>";

});

buscarBtn.addEventListener("click", () => {
  const desde = Number.parseInt(edadDesde.value);
  const hasta = Number.parseInt(edadHasta.value);

  const html = filtrarMascotasPorEdad(desde, hasta);
  divFiltrarEdad.innerHTML = html;
});

buscarRazaBtn.addEventListener("click", () => {
  const razaBuscada = CampoRaza.value;
  const html = filtrarMascotasPorRaza(razaBuscada);
  divFiltrarRaza.innerHTML = html;
});

document.addEventListener("DOMContentLoaded", () => {
  
  const mascotas = data.mascotas;
  let htmlTotal = "";

  mascotas.forEach(mascota => {
    htmlTotal += mostrarMascota(mascota);
  });

  listaDiv.innerHTML = htmlTotal;
});