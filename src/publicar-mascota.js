export default function mostrarPublicarMascota(div, nombre, raza, edad, especie, foto) {
  div.innerHTML = "<p>" + `${nombre}, ${raza}, ${edad}, ${especie}, ${foto}` + "</p>";
  return div.innerHTML;
}

