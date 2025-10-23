it("debería mostrar la lista de mascotas al cargar la página", () => {
    cy.visit("/");
    const petList = cy.get("#lista-mascotas");
    petList.should("exist");
    petList.find(".mascota-item").first()
      .should("contain", "Togo")
      .and("contain", "Pitbull")
      .and("contain", "3")
      .and("contain", "Perro");
  });