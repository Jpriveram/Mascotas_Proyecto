describe("Ver Detalle de Mascota", () => {
    it("debería mostrar los detalles de una mascota correctamente", () => {
        cy.visit("/");
        cy.get("#lista-mascotas").should("not.be.empty");
        cy.get(".ver-detalle-btn").should("exist").first().click();
        cy.get(".mascota-detalle-box", { timeout: 10000 }).should("exist");
        cy.get(".mascota-detalle-box h2").should("exist").and("not.be.empty");
        cy.get(".mascota-detalle-box img").should("have.attr", "src");
        cy.get(".volver-btn").should("exist").and("contain", "Volver");
        cy.get(".mascota-detalle-box").should("contain", "Especie");
        cy.get(".mascota-detalle-box").should("contain", "Raza");
        cy.get(".mascota-detalle-box").should("contain", "Edad");
        cy.get(".volver-btn").click(); 
        cy.get("#lista-mascotas", { timeout: 10000 }).should("not.be.empty");
    });
});
