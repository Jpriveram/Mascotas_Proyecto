import { supabase } from "./supabaseClient.js";

export default class MascotasRepository {
    
    async obtenerMascotas() {
        const { data: mascotas, error } = await supabase
            .from('mascotas')
            .select('*');
    
        if (error) {
            throw error;
        }
        
        return mascotas;
    }
}