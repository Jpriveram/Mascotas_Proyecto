export default function mostrarMascota(mascota = {}) {
  const nombre = mascota.nombre ?? "Sin nombre";
  const raza = mascota.raza ?? "Desconocida";
  const edadVal = (typeof mascota.edad !== "undefined" && mascota.edad !== null) ? mascota.edad : "N/E";
  const especie = mascota.especie ?? "";
  const foto = mascota.foto ?? "";

  const edadTexto = (typeof edadVal === "number" || !isNaN(Number(edadVal)))
    ? `${edadVal} años`
    : `${edadVal}`;

  const fotoSrc = foto.trim() !== "" ? foto : "";

  return `
    <div class="mascota-card">
      <h3>${escapeHtml(nombre)}</h3>
      <img class="foto-mascota" src="${escapeHtml(fotoSrc)}" alt="Foto de ${escapeHtml(nombre)}" />
      <p>Edad: ${escapeHtml(String(edadTexto))}</p>
      <p>Raza: ${escapeHtml(raza)}</p>
      <p>Especie: ${escapeHtml(especie)}</p>
      <button class="ver-detalle-btn" data-id="${escapeHtml(mascota.id ?? "")}">Ver Detalle</button>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}