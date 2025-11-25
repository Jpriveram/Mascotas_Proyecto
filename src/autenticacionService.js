import { supabase } from "./supabaseClient.js";

// Función para iniciar sesión
export async function iniciarSesion(email, contrasena) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: contrasena });
    
    if (error) {
        throw new Error('Error al iniciar sesión: ' + error.message);
    }

    return data;
}
