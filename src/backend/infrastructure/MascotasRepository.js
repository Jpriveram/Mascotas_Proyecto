import { pool } from '../../dbClient.js';

export class MascotasRepository {
    
    async obtenerMascotas() {
        try {
            const result = await pool.query('SELECT * FROM mascotas ORDER BY id DESC');
            return result.rows;
        } catch (error) {
            console.error("Error en obtenerMascotas:", error);
            throw new Error("Fallo al listar mascotas desde la base de datos.");
        }
    }
    
    async obtenerMascotaPorId(id) {
        try {
            const result = await pool.query('SELECT * FROM mascotas WHERE id = $1', [id]);
            
            if (result.rows.length === 0) {
                return null; 
            }
            return result.rows[0];
        } catch (error) {
            console.error(`Error en obtenerMascotaPorId (ID: ${id}):`, error);
            throw new Error("Fallo al obtener detalle de la mascota.");
        }
    }

    async insertarMascota(nombre, raza, edad, especie, foto) {
        try {
            const sql = `
                INSERT INTO mascotas (nombre, raza, edad, especie, foto)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`;              
            const values = [nombre, raza, edad, especie, foto];
            const result = await pool.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error en insertarMascota:", error);
            throw new Error("Fallo al publicar la nueva mascota.");
        }
    }
    
    async filtrarMascotasPorEdad(desde, hasta) {
        try {
            const sql = 'SELECT * FROM mascotas WHERE edad >= $1 AND edad <= $2';
            const values = [desde, hasta];
            const result = await pool.query(sql, values);
            return result.rows;
        } catch (error) {
            console.error("Error en filtrarMascotasPorEdadBd:", error);
            throw new Error("Fallo al filtrar mascotas por edad.");
        }
    }

    async filtrarMascotasPorRaza(raza) {
        try {
            const sql = 'SELECT * FROM mascotas WHERE raza ILIKE $1';
            const values = [`%${raza}%`]; 
            const result = await pool.query(sql, values);
            return result.rows;
        } catch (error) {
            console.error("Error en filtrarMascotasPorRazaBd:", error);
            throw new Error("Fallo al filtrar mascotas por raza.");
        }
    }

    async filtrarMascotasPorRazaBd(razaBuscada){
      const { data: mascotas, error } = await supabase
          .from("mascotas")
          .select("*")
          .ilike("raza", razaBuscada); 
        
        if (error){
          throw error;
        } 
    
        return mascotas;
    }
}