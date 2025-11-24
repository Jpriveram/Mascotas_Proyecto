import { supabase } from '../../supabaseClient.js';

export class MascotasRepository {
    
    async obtenerMascotas() {
        const { data: mascotas, error } = await supabase
            .from('mascotas')
            .select('*');
    
        if (error) {
            throw error;
        }
        
        return mascotas;
    }
    
    async obtenerMascotaPorId(id) {
        const { data: mascota, error } = await supabase
            .from("mascotas")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw error;
        }

        return mascota;
    }

    async insertarMascota(nombre, raza, edad, especie, foto) {
        const {data, error} = await supabase
            .from('mascotas')
            .insert([
                { nombre: nombre, raza: raza, edad: edad, especie: especie, foto: foto }
            ]);
        if (error) {
            throw error;
        }
    }
    
    async filtrarMascotasPorEdadBd(desde, hasta) {
        const { data: mascotas, error } = await supabase
            .from('mascotas')
            .select('*')
            .gte('edad', desde)
            .lte('edad', hasta);
    
        if (error) {
            throw error;
        }

        return mascotas;
    }
}