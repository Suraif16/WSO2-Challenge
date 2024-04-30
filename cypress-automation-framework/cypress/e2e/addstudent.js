/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />

describe("Test Add Student Form", () => {
    it("Submitting the form with valid data and getting the correct data", () => {
      cy.visit("http://angular:4200/addstudent");
  
      cy.xpath('//input[@id="fname"]').type("Shannaka");
      cy.xpath('//input[@id="lname"]').type("Perera");
      cy.xpath('//input[@id="nic"]').type("200029912919");
      cy.xpath('//input[@id="mobile"]').type("0771234567");
      cy.xpath('//input[@id="email"]').type("shankaperera@gmail.com");
      cy.xpath('//button[@type="submit"]').click();
      cy.wait(150000);
      // Wait for the URL to change to /viewstudent
      cy.wait(150000);
      cy.url().should('include', '/viewstudent');
      // Wait for the table to load
      cy.wait(150000);
      cy.get('table tbody tr:last-child').should('contain', "Shannaka");
    });
  });
  
