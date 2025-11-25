describe("Filtrado por Edad", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Filtrar mascota por rango de edad con resultados (1–3)", () => {
    cy.get("#edad-desde").clear().type("1");
    cy.get("#edad-hasta").clear().type("3");
    cy.get("#buscar-rango-button").click();
    cy.get("#resultado-buscar-edad-div .mascota-card")
      .should("have.length.at.least", 1);

    cy.get("#resultado-buscar-edad-div")
      .should("contain", "años"); 
  });

  it("Filtrar mascota por rango de edad sin resultados (100–200)", () => {
    cy.get("#edad-desde").clear().type("100");
    cy.get("#edad-hasta").clear().type("200");
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
