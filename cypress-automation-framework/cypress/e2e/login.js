/// <reference types="Cypress"/> //this is for intellisense to suggest commands for cypress command

describe("Test Contact Us form via Automation Test Store", () => {
  it("Should be able to login successfully via login form when correct credentials are provided", () => {
      cy.visit("http://tutorial_angular:4200/login");
      cy.get('#username').type("admin");
      cy.get('#password').type("1234");
      cy.get('.btn').click();
      cy.wait(150000);
      // Assert that the URL changes to /viewsudent after successful login
      cy.url().should('include', '/viewstudent');
  });
  
  it("Should not be able to login successfully via login form as wrong credentials provided", () => {
    cy.visit("http://tutorial_angular:4200/login");

    cy.get('#username').type("admins");
    cy.get('#password').type("12345");

    cy.get('.btn').click();
    cy.wait(150000);
    // Assert that the URL does not change after unsuccessful login
    cy.url().should('not.include', '/viewstudent');
  });
});
