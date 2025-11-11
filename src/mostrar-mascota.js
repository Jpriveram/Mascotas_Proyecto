function mostrarMascota(mascota) {
  const html = `
    <div class="mascota-item">
      <h3>${mascota.nombre}</h3>
      <p>Especie: ${mascota.especie}</p>
      <p>Raza: ${mascota.raza}</p>
      <p>Edad: ${mascota.edad}</p>
      <img src="${mascota.foto}" alt="Foto de ${mascota.nombre}">
      <button class="ver-detalle-btn" data-id="${mascota.id}">Ver detalles</button>
    </div>
  `;
  return html;
}

export default mostrarMascota;
