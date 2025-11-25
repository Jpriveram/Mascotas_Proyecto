describe("Publicación de Mascotas", () => {
  it("debería publicar una mascota y aparecer en la lista", () => {
    
    const mascotasIniciales = [
      {
        id: "1",
        nombre: "Luna",
        raza: "Labrador",
        edad: 3,
        especie: "Perro",
        foto: "https://placehold.co/150x150"
      }
    ];
    const mascotasEnMemoria = [...mascotasIniciales];
    cy.intercept('GET', '**/api/mascotas', (req) => {
      req.reply({
        statusCode: 200,
        body: mascotasEnMemoria
      });
    }).as('getMascotas');
    
    cy.intercept('POST', '**/api/mascotas', (req) => {
      const nuevo = Object.assign({}, req.body);
      nuevo.id = `tmp-${Date.now()}`;
      if (typeof nuevo.edad === 'string' && /^\d+$/.test(nuevo.edad)) {
        nuevo.edad = Number(nuevo.edad);
      }
      
      req.reply({
        statusCode: 201,
        body: {
            message: "Mascota publicada con éxito (mocked)",
            mascota: nuevo
        }
      });
      
      mascotasEnMemoria.push(nuevo);
      
    }).as('postMascota');
    
    cy.visit("/");
    cy.wait("@getMascotas");
    cy.get("#lista-mascotas").find(".mascota-card").its("length").as("countBefore");
    
    cy.get("#nombre-mascota").type("Firulais Test");
    cy.get("#raza-mascota").type("Salchicha");
    cy.get("#edad-mascota").type("6");
    cy.get('#especie-mascota').type("Perro");
    cy.get('#foto-mascota').type("https://placehold.co/150x150/9CA3AF/FFFFFF?text=Firu");
    
    cy.get("#publicar-button").click();
    cy.wait("@postMascota");
    
    cy.get("#resultado-div", { timeout: 5000 }).should("contain", "¡Mascota Publicada con Éxito!");
    cy.get("#resultado-div").should("contain", "Firulais Test (Perro) ha sido añadida");
    
    cy.get("@countBefore").then(countBefore => {
      cy.get("#lista-mascotas").find(".mascota-card", { timeout: 10000 })
        .should('have.length', countBefore + 1);
    });
    cy.get("#lista-mascotas").should("contain", "Firulais Test");
    cy.get("#lista-mascotas").should("contain", "Raza: Salchicha");
  });
});
