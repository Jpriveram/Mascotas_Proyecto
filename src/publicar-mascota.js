import { supabase } from "./supabaseClient.js";

export default function mostrarPublicarMascota(div, nombre, raza, edad, especie, foto) {
  div.innerHTML = "<p>" + `${nombre}, ${raza}, ${edad}, ${especie}, ${foto}` + "</p>";
  return div.innerHTML;
}

export async function insertarSupabase(div, name, breed, age, species, photo) {
    const { data, error } = await supabase
        .from('mascotas')
        .insert([
            { nombre: name, raza: breed, edad: age, especie: species, foto: photo }
        ]);

    if (error) {
        div.innerHTML = `<p>Error publicando mascota: ${error.message}</p>`;
        return;
    }
}