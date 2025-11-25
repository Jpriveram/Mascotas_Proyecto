// autenticacionController.js
import { iniciarSesion, cerrarSesion } from "./autenticacionService.js";

// Función para manejar el formulario de inicio de sesión
export function agregarFormularioInicioSesion() {
    const formulario = document.querySelector("#formulario-login");

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#email").value;
        const contrasena = document.querySelector("#contrasena").value;

        try {
            const datosUsuario = await iniciarSesion(email, contrasena);
            // Asignar rol y mostrar mensaje
            document.querySelector("#mensaje-exito").textContent = `Bienvenido, ${datosUsuario.user.email}!`;
            // Redirigir al dashboard o página principal
            window.location.href = "/dashboard";
        } catch (error) {
            document.querySelector("#mensaje-error").textContent = error.message;
        }
    });
}

// Función para manejar el botón de cierre de sesión
export function agregarFormularioCerrarSesion() {
    const botonCerrarSesion = document.querySelector("#cerrar-sesion");

    botonCerrarSesion.addEventListener("click", async () => {
        try {
            await cerrarSesion();
            document.querySelector("#mensaje-exito").textContent = "Sesión cerrada correctamente.";
            // Redirigir a la página de inicio
            window.location.href = "/login";
        } catch (error) {
            document.querySelector("#mensaje-error").textContent = error.message;
        }
    });
}