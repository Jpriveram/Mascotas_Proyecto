/* HISTORIA DE USUARIO
Como adoptante
Quiero ver los datos básicos de cada mascota
Para conocer la información esencial antes de decidir si quiero más detalles

Criterios de confirmación:
- Dado que estoy en la lista de mascotas en adopción
- Cuando hago clic en "Ver Detalle" de una mascota
- Debería ver el nombre, especie, raza, edad y foto de la mascota seleccionada
*/

describe("Ver Detalle de Mascota", () => {
    it("debería mostrar los detalles de una mascota correctamente", () => {
        cy.visit("/");

        // Espera a que se cargue la lista
        cy.get("#lista-mascotas", { timeout: 10000 }).should("exist");

        // Verifica que haya al menos un botón para ver detalle
        cy.get(".ver-detalle-btn").should("exist").first().click();

        // Espera a que cargue el detalle
        cy.get(".detalle-mascota", { timeout: 10000 }).should("exist");

        // Verifica los elementos dentro del detalle
        cy.get(".detalle-mascota h2").should("exist").and("not.be.empty");
        //cy.get(".detalle-mascota img").should("have.attr", "src").and("include", "http");
        cy.get(".detalle-mascota p").should("have.length.at.least", 3);
        cy.get(".detalle-mascota").should("contain", "Especie");
        cy.get(".detalle-mascota").should("contain", "Raza");
        cy.get(".detalle-mascota").should("contain", "Edad");
        cy.get("#volver-btn").should("exist");

        // Verifica que el botón volver funcione
        cy.get("#volver-btn").click();
        cy.get("#lista-mascotas", { timeout: 10000 }).should("exist");
    });
});
