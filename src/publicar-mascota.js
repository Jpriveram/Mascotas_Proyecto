export default function publicarMascota(div, nombre, raza, edad, especie, foto) {
    const htmlContent = `
        <div class="success-message">
            <p>¡Mascota Publicada con Éxito!</p>
            <p><strong>${nombre}</strong> (${especie}) ha sido añadida a la lista.</p>
        </div>
    `;
    
    div.innerHTML = htmlContent;

    setTimeout(() => {
        const form = document.querySelector("#publicar-form");
        if (form) {
             form.reset();
        }
        div.innerHTML = "";
    }, 3000);

    return htmlContent;
}