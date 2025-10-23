import mostrarMascota from "./mostrar-mascota.js";
import data from './mascotas.json';
import publicarMascota from "./publicar-mascota.js";

const nombre = document.querySelector("#nombre-mascota");
const raza = document.querySelector("#raza-mascota");
const edad = document.querySelector("#edad-mascota");
const especie = document.querySelector("#especie-mascota");
const foto = document.querySelector("#foto-mascota");
const form = document.querySelector("#publicar-form");
const div = document.querySelector("#resultado-div");
const listaDiv = document.querySelector("#lista-mascotas");

let mascotas = [...data.mascotas];

function renderMascotas() {
  let htmlTotal = "";
  mascotas.forEach(mascota => {
    htmlTotal += mostrarMascota(mascota);
  });
  listaDiv.innerHTML = htmlTotal;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nombre.value;
  const breed = raza.value;
  const age = Number.parseInt(edad.value);
  const species = especie.value;
  const photo = foto.value;

  div.innerHTML = "<p>" + publicarMascota(name, breed, age, species, photo) + "</p>";

  const nuevaMascota = {
    id: mascotas.length + 1,
    nombre: name,
    raza: breed,
    edad: age,
    especie: species,
    foto: photo
  };

  mascotas.push(nuevaMascota);
  renderMascotas();
  form.reset();
});

document.addEventListener("DOMContentLoaded", renderMascotas);
