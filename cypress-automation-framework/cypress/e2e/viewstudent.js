/// <reference types="Cypress"/> //this is for intellisense to suggest commands for cypress command
/// <reference types="cypress-xpath" />
describe("Test Add Student Form", () => {
    it("Checking whether the view is working", () => {
        cy.visit("http://tutorial_angular:4200/viewstudent");
        cy.wait(150000);
        cy.get('table tbody tr:last-child').should('contain', "Shannaka");

    });
});