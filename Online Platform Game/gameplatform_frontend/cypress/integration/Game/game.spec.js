// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" />

describe('The Leaderboard Page', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3001/auth/login');
  });
  it('Should Type and submit form login', () => {
    cy.get('.form-control')
      .should('have.value', '')
      // .type("{del}{selectall}{backspace}")
      // Delay each keypress by 0.1 sec
      .get('[name="email"]')
      // .type("HALFOFF")
      .type('daffaakbar555@gmail.com', { delay: 100 })
      .should('have.value', 'daffaakbar555@gmail.com')
      .get('[name="password"]')
      // .type("HALFOFF")
      .type('123123', { delay: 100 })
      .should('have.value', '123123')
      .get('[type="submit"]')
      .click();
  });
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3001/game');
  });
  // it("Should find our heading page", () => {
  //   cy.get("h1").contains("YOU");
  //   cy.get("h1").contains("COM");
  // });
  // it("Should find our text VS", () => {
  //   cy.get("h1").contains("VS");
  // });
  // it("Should find 6 image  ", () => {
  //   cy.get(".card-rps").should("have.length", 6);
  // });
  it('Should find Image and click papper ', () => {
    cy.get('img')
      .filter('[alt="player"]')
      .filter('[src="/_next/static/media/kertas.ec6fe00c.png"]')
      .click();
  });
  // it("Should hide modal ", () => {
  //   cy.get("img")
  //     .find('[alt="player"]')
  //     .filter('[src="/_next/static/media/kertas.ec6fe00c.png"]')
  //     .click()
  //     .get("button")
  //     .contains("Ronde selanjutnya")
  //     .click();
  // });

  // it("Should find our button refresh", () => {
  //   cy.get("img").filter('[alt="refresh"]');
  // });
});
