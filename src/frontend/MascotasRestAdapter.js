const BASE_URL = 'http://localhost:3000/api/mascotas';

export class MascotasRestAdapter {
    
    async listarMascotas() {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fallo al obtener la lista de mascotas:", error);
            throw new Error("No se pudo conectar al servidor o los datos son inválidos.");
        }
    }

    async obtenerMascotaPorId(id) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            if (response.status === 404) {
                return null;
            }
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Fallo al obtener mascota ${id}:`, error);
            throw new Error("Error de red o servidor al obtener detalle.");
        }
    }

    async publicarMascota(mascotaData) {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mascotaData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            return result.mascota;
        } catch (error) {
            console.error("Fallo al publicar mascota:", error);
            throw new Error(error.message || "Error desconocido al publicar la mascota.");
        }
    }

    async filtrarMascotasPorEdad(desde, hasta) {
        try {
            const response = await fetch(`${BASE_URL}/filtrar?desde=${desde}&hasta=${hasta}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fallo al filtrar por edad:", error);
            throw new Error("No se pudo conectar al servidor o el filtro falló.");
        }
    }

    async filtrarMascotasPorRaza(raza) {
        try {
            const response = await fetch(`${BASE_URL}/raza?nombre=${encodeURIComponent(raza)}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fallo al filtrar por raza:", error);
            throw new Error("No se pudo conectar al servidor o el filtro falló.");
        }
    }
}