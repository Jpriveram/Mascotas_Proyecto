import sumar from "./sumador";

const nombre = document.querySelector("#nombre-mascota");
const raza = document.querySelector("#raza-mascota");
const edad = document.querySelector("#edad-mascota");
const especie = document.querySelector("#especie-mascota");
const foto = document.querySelector("#foto-mascota");
const form = document.querySelector("#publicar-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nombre.value;
  const breed = raza.value;
  const age = Number.parseInt(edad.value);
  const species = especie.value;
  const photo = foto.value;

  div.innerHTML = `<p>${name}, ${breed}, ${age} meses, ${species}, ${photo}</p>`;});
