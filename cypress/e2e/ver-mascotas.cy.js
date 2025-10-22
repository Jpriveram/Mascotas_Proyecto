it("debería mostrar la lista de mascotas al cargar la página", () => {
    cy.visit("/");
    const petList = cy.get("#lista-mascotas");
    petList.should("exist");
    petList.find(".mascota-item").first()
      .should("contain", "Luna")
      .and("contain", "Labrador Retriever")
      .and("contain", "24") 
      .and("contain", "Perro");
  });