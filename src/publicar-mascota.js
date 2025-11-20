export default function publicarMascota(nombre, raza, edad, especie, foto) {
  return `${nombre}, ${raza}, ${edad}, ${especie}, ${foto}`;
}

export async function insertarSupabase(name, breed, age, species, photo) {
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