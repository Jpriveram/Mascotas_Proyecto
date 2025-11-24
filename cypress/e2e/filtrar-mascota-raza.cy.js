/*

Como: Adoptante
Quiero: Poder buscar las mascotas por raza
Para: Encontrar rápidamente mascotas que coincidan con la raza que prefiero.

Criterio de confirmación (happy path)

Cuando el adoptante ingresa la raza en el campo de búsqueda y presiona el
botón de buscar por raza, se debería mostrar el nombre y la descripción de
todas las mascotas cuya raza coincida (ignorando mayúsculas/minúsculas).

*/

// cypress/e2e/filtrar-mascota-raza.cy.js
describe("Mascotas", () => {
  beforeEach(() => {
    cy.visit("/");
  });

it("Filtrar mascota por raza con resultados (Pitbull → Togo)", () => {
  cy.get("#raza-filtro").clear().type("Pitbull");
  cy.get("#buscar-raza-button").click();

  cy.get("#resultado-buscar-raza-div .mascota-item")
    .should("have.length.at.least", 1);

  cy.get("#resultado-buscar-raza-div")
    .should("contain", "Togo")
    .and("contain", "Pitbull");
});

  it("Filtrar mascota por raza sin resultados (Mestizo)", () => {
    cy.get("#raza-filtro").clear().type("Mestizo");
    cy.get("#buscar-raza-button").click();

    cy.get("#resultado-buscar-raza-div")
      .should("contain", "No existen mascotas con esa raza.");
  });

  it("Filtrar mascota por raza sin valor ingresado", () => {
    cy.get("#raza-filtro").clear();
    cy.get("#buscar-raza-button").click();

    cy.get("#resultado-buscar-raza-div")
      .should("contain", "Por favor, ingrese una raza para buscar.");
  });
});