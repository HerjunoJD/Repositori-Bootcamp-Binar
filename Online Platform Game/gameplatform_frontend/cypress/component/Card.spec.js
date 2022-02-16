/// <reference types="cypress" />
import { mount } from '@cypress/react';
import Card from '../../components/Card';

describe('<Card />', () => {
  beforeEach(() => {
    // given
    mount(<Card />);
  });

  it('render card', () => {
    // when, then
    cy.findByTestId('card').should('be.visible');
    cy.findByTestId('card').should('have.class', 'bg-black');
  });

  it('render title card', () => {
    // when, then
    cy.findByTestId('title1').should('have.text', 'AVAILABLE');
    cy.findByTestId('title2').should('have.text', 'COMING SOON');
  });

  it('render link card', () => {
    // when, then
    cy.findByTestId('cardLink').should('have.attr', 'href', '/gamedetail');
  });

  // negative
  it('render when card not visible', () => {
    // when, then
    cy.findByTestId('card').should('not.be.visible');
    cy.findByTestId('card').should('not.have.class', 'bg-black');
  });

  it('render unexpected title card ', () => {
    // when, then
    cy.findByTestId('title1').should('not.have.text', 'AVAILABLE');
    cy.findByTestId('title2').should('not.have.text', 'COMING SOON');
  });

  it('render unexpected link card', () => {
    // when, then
    cy.findByTestId('cardLink').should('not.have.attr', 'href', '/gamedetail');
  });
});
