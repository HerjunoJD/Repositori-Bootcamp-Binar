// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" />

describe("The Leaderboard Page", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3001/auth/login");
  });
  it("Should Type and submit form login", () => {
    cy.get(".form-control")
      .should("have.value", "")
      // .type("{del}{selectall}{backspace}")
      // Delay each keypress by 0.1 sec
      .get('[name="email"]')
      // .type("HALFOFF")
      .type("daffaakbar555@gmail.com", { delay: 100 })
      .should("have.value", "daffaakbar555@gmail.com")
      .get('[name="password"]')
      // .type("HALFOFF")
      .type("123123", { delay: 100 })
      .should("have.value", "123123")
      .get('[type="submit"]')
      .click();
  });
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3001/gameleaderboard");
  });
  it("Should find our heading page", () => {
    cy.get("h1").contains("Leaderboard Rock-Paper-Scissors");
  });
  it("Should find our table header", () => {
    cy.get("th").contains("Username");
    cy.get("th").contains("point");
    cy.get("th").contains("Total Play");
    cy.get("th").contains("Last played");
  });
  it("Should find our table content", () => {
    cy.get("td").contains("daffaakbar5555");
  });
  it("Should click pagination 2", () => {
    cy.get("a").contains("2").click();
  });
  it("Should click pagination 3", () => {
    cy.get("a").contains("3").click();
  });
  it("Should click pagination 4", () => {
    cy.get("a").contains("4").click();
  });
  // it("Should find Image Login Page ", () => {
  //   cy.get("img").filter('[alt="login-img"]');
  // });
  // it("Should find Forgot Password ", () => {
  //   cy.get("a").filter('[href="#!"]');
  // });
  // it("Should find Copyright ", () => {
  //   cy.get("div").contains("Copyright ?? 2021. All rights reserved.");
  // });
});
