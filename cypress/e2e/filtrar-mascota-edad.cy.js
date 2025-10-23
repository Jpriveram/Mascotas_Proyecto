/* 

Como: Adoptante
Quiero: Poder buscar las mascotas por rango de edad
Para: Encontrar eficientemente mascotas que se encuentren 
      en la etapa de vida de mi preferencia.

Criterio de confirmacion (happy path) 

Cuando el adoptante digita la edad en los campos de "desde" 
y "hasta" del rango de edad y oprima el botón buscar por edad,
se debería mostrar el nombre y descripción de todas las mascotas 
que coincidan con el criterio ingresado por el adoptante.

*/

// cypress/e2e/filtrar-mascota-edad.cy.js
describe("Mascotas", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Filtrar mascota por rango de edad con resultados (8–20)", () => {
    cy.get("#edad-desde").clear().type("8");
    cy.get("#edad-hasta").clear().type("20");
    cy.get("#buscar-rango-button").click();

    cy.get("#resultado-buscar-edad-div .mascota-item")
      .should("have.length.at.least", 1);

    cy.get("#resultado-buscar-edad-div")
      .should("contain", "Nube")
      .and("contain", "Coco");
  });

  it("Filtrar mascota por rango de edad sin resultados (4–7)", () => {
    cy.get("#edad-desde").clear().type("4");
    cy.get("#edad-hasta").clear().type("7");
    cy.get("#buscar-rango-button").click();

    cy.get("#resultado-buscar-edad-div")
      .should("contain", "No existen mascotas con ese rango de edad.");
  });

  it("Filtrar mascota por rango de edad sin valores ingresados", () => {
    cy.get("#edad-desde").clear();
    cy.get("#edad-hasta").clear();
    cy.get("#buscar-rango-button").click();

    cy.get("#resultado-buscar-edad-div")
      .should("contain", "Por favor, ingrese un rango de edad de mascotas para buscar.");
  });
});
