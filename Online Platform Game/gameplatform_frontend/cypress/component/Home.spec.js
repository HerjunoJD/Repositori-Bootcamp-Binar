/* eslint-disable quotes */
/* eslint-disable no-unneeded-ternary */
/// <reference types="cypress" />
import { mount } from '@cypress/react';
import Home from '../../pages/home';

describe('<Home />', () => {
  beforeEach(() => {
    // given
    mount(<Home />);
  });

  it('renders title', () => {
    // when, then
    cy.findByTestId('welcome').should('have.text', 'WELCOME, [  ]');
  });

  it('renders card home', () => {
    // when, then
    cy.findByTestId('card').should('be.visible');
    cy.findByTestId('card').should('have.class', 'bg-dark');
  });

  it('renders link home', () => {
    // when, then
    cy.get('a').should('be.visible');
    cy.get('a').should('have.attr', 'href');
  });

  // Negative case

  it('renders unexpected title', () => {
    // when, then
    cy.findByTestId('welcome').should('not.have.text', 'WELCOME, [  ]');
  });

  it('renders when card home is not visible', () => {
    // when, then
    cy.findByTestId('card').should('not.be.visible');
    cy.findByTestId('card').should('not.have.class', 'bg-dark');
  });

  it('renders unexpected link home', () => {
    // when, then
    cy.get('a').should('not.be.visible');
    cy.get('a').should('not.have.attr', 'href');
  });
});
