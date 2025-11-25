describe("Filtrado por Raza", () => {
  beforeEach(() => {
    cy.visit("/");
  });

it("Filtrar mascota por raza con resultados (Ejemplo: Pitbull)", () => {
  cy.get("#raza-filtro").clear().type("Pitbull"); 
  cy.get("#buscar-raza-button").click();
  cy.get("#resultado-buscar-raza-div .mascota-card")
    .should("have.length.at.least", 1);

  cy.get("#resultado-buscar-raza-div")
    .should("contain", "Pitbull");
});

  it("Filtrar mascota por raza sin resultados (Raza Inexistente)", () => {
    cy.get("#raza-filtro").clear().type("Raza Inexistente");
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