export function verDetalleMascota(mascotasAdapter) {
    const contenedor = document.querySelector("#lista-mascotas");

    return async function manejarDetalleMascota(id) {
        contenedor.innerHTML = "<p>Cargando detalles...</p>";

        try {
            const mascota = await mascotasAdapter.obtenerMascotaPorId(id);

            if (!mascota) {
                contenedor.innerHTML = `<p>Error: Mascota con ID ${id} no encontrada.</p>`;
                return;
            }
            contenedor.innerHTML = `
                <div class="mascota-detalle-box">
                    <!-- El botón Volver simplemente recarga la página para volver a la lista -->
                    <button class="volver-btn main-button" onclick="window.location.reload()">← Volver a la Lista</button>
                    <h2>${mascota.nombre}</h2>
                    <div class="detalle-grid">
                        <img 
                            src="${mascota.foto}" 
                            alt="Foto de ${mascota.nombre}" 
                            onerror="this.onerror=null;this.src='https://placehold.co/300x300/9CA3AF/FFFFFF?text=Sin+Foto';" 
                        />
                        <div class="detalle-info">
                            <p><strong>Especie:</strong> ${mascota.especie}</p>
                            <p><strong>Raza:</strong> ${mascota.raza}</p>
                            <p><strong>Edad:</strong> ${mascota.edad} años</p>
                            <p><strong>ID de Publicación:</strong> ${mascota.id}</p>
                            <p class="nota">¡${mascota.nombre} está buscando un hogar! Contacta al administrador para adoptarlo.</p>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            contenedor.innerHTML = `<p>Error al cargar detalles: ${error.message}</p>`;
            console.error("Error al cargar detalles:", error);
        }
    };
}