// autenticacion.cy.js
describe("Autenticación de usuario", () => {
    it("debería permitir iniciar sesión correctamente", () => {
        cy.visit("/login");
        
        cy.get("#email").type("test@example.com");
        cy.get("#contrasena").type("contrasena123");
        cy.get("#formulario-login").submit();

        cy.get("#mensaje-exito").should("contain", "Bienvenido");
    });

    it("debería mostrar error si los datos son incorrectos", () => {
        cy.visit("/login");
        
        cy.get("#email").type("test@example.com");
        cy.get("#contrasena").type("wrongpassword");
        cy.get("#formulario-login").submit();

        cy.get("#mensaje-error").should("contain", "Error al iniciar sesión");
    });

    it("debería permitir cerrar sesión correctamente", () => {
        cy.visit("/dashboard");
        
        cy.get("#cerrar-sesion").click();
        
        cy.get("#mensaje-exito").should("contain", "Sesión cerrada correctamente.");
    });
});
