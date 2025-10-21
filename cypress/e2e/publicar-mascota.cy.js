/* 
Como refugio de mascotas 
quiero publicar una mascota para adopcion 
para acelerar su adopcion haciendo visible la mascota a mas personas

criterio de confirmacion 
-Dado que registro una mascota con nombre: Firulais
de raza: salchicha 
y edad : 6 meses 
y registro a la mascota
deberia ver a la mascota en una lista de mascotas en adopcion
*/


describe("Mascotas", () => {
  it("Publicar mascota", () => {
    cy.visit("/");
    cy.get("#nombre-mascota").type("Firulais");
    cy.get("#raza-mascota").type("Salchicha");
    cy.get("#edad-mascota").type("6 meses");
    cy.get('#especie-mascota').type("Perro");
    cy.get('#foto-mascota').type("foto.png");
    cy.get("#publicar-button").click();
    cy.get("#resultado-div").should("contain", 
      "Firulais, Salchicha, 6 meses, Perro, foto.png");
  });
});
