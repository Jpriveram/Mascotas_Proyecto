// autenticacionService.test.js
import { iniciarSesion, cerrarSesion } from "./autenticacionService.js";
import { supabase } from "./supabaseClient.js";

jest.mock("./supabaseClient.js");

describe("autenticacionService", () => {
    it("debería iniciar sesión correctamente", async () => {
        supabase.auth.signInWithPassword.mockResolvedValue({
            data: { user: { email: "test@example.com" } },
        });

        const datosUsuario = await iniciarSesion("test@example.com", "contrasena123");
        expect(datosUsuario.user.email).toBe("test@example.com");
    });

    it("debería lanzar error si la contraseña es incorrecta", async () => {
        supabase.auth.signInWithPassword.mockRejectedValue(new Error("Contraseña incorrecta"));

        await expect(iniciarSesion("test@example.com", "wrongpassword"))
            .rejects
            .toThrow("Contraseña incorrecta");
    });

    it("debería cerrar sesión correctamente", async () => {
        supabase.auth.signOut.mockResolvedValue({});

        const resultado = await cerrarSesion();
        expect(resultado).toBe(true);
    });

    it("debería lanzar error al cerrar sesión", async () => {
        supabase.auth.signOut.mockRejectedValue(new Error("Error al cerrar sesión"));

        await expect(cerrarSesion())
            .rejects
            .toThrow("Error al cerrar sesión");
    });
});
