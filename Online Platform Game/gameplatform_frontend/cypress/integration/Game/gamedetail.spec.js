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
    cy.visit('http://localhost:3001/gamedetail');
  });
  it('Should find Image game detail page ', () => {
    cy.get('img').filter('[alt="Logo Game RPS"]');
  });
  it('Should find our heading page', () => {
    cy.get('p').contains('Rock-Paper-Scissors');
  });
  it('Should find our heading page', () => {
    cy.get('p').contains('Rock-Paper-Scissor');
  });
  it('Should find our paragraph', () => {
    cy.get('p').contains(
      'Rock, Paper, Scissors. The familiar game of Rock, Paper, Scissors is played like this: at the same time, two players display one of three symbols: a rock, paper, or scissors. A rock beats scissors, scissors beat paper by cutting it, and paper beats rock by covering it. Whenever one player wins, the other loses.',
    );
  });
  it('Should find our Button Play', () => {
    cy.get('button').contains('PLAY NOW');
  });
  it('Should find our Button Leaderboard', () => {
    cy.get('button').contains('Leaderboard');
  });
  it('Should Click Button Leaderboard', () => {
    cy.get('button').contains('Leaderboard').click();
  });
  it('Should Click Button Play ', () => {
    cy.get('button').contains('PLAY NOW').click();
  });

  // it("Should find Image Login Page ", () => {
  //   cy.get("img").filter('[alt="login-img"]');
  // });
  // it("Should find Forgot Password ", () => {
  //   cy.get("a").filter('[href="#!"]');
  // });
  // it("Should find Copyright ", () => {
  //   cy.get("div").contains("Copyright © 2021. All rights reserved.");
  // });
});
