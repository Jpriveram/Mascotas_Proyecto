describe('Visualización de Mascotas', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/mascotas').as('getMascotas');
    cy.visit('/');
  });

  it('debería mostrar la lista de mascotas al cargar la página', () => {
    cy.wait('@getMascotas', { timeout: 10000 });
    cy.get('#lista-mascotas', { timeout: 10000 }).should('exist');
    cy.get('#lista-mascotas .mascota-card', { timeout: 10000 })
      .should('have.length.at.least', 1);
    cy.get('#lista-mascotas .mascota-card').first().within(() => {
      cy.contains('Edad:').should('exist');
      cy.contains('Ver Detalle').should('exist');
      cy.get('img').should('have.attr', 'src'); 
    });
  });
});