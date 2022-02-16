/* eslint-disable no-unneeded-ternary */
/// <reference types="cypress" />
import { mount } from '@cypress/react';
import Navbars from '../../components/Navbar';

const linkText = 'LOGOHomeworkcontactabout meq&aLOGINREGISTER';

describe('<Navbar />', () => {
  beforeEach(() => {
    // given
    mount(<Navbars />);
  });

  it('render navbar', () => {
    // when, then
    cy.get('nav').should('be.visible');
    cy.get('nav').should('have.class', 'navbar');
  });

  it('renders navbar link', () => {
    // when, then
    cy.get('a').should('have.attr', 'href');
    cy.get('a').should('have.text', linkText);
  });

  it('renders list navbar', () => {
    // when, then
    cy.get('li').should('have.class', 'nav-item');
    cy.get('ul').should('have.class', 'navbar-nav');
  });

  it('renders button dropdown nav', () => {
    // when, then
    cy.get('[aria-controls="collapse"]').click();
    cy.get('button span').should('have.class', 'navbar-toggler-icon');
  });

  // Negative Case

  it('renders unexpected navbar link', () => {
    // when, then
    cy.get('a').should('not.have.attr', 'href');
    cy.get('a').should('not.have.text', linkText);
  });

  it('renders unexpected list navbar', () => {
    // when, then
    cy.get('li').should('not.have.class', 'nav-item');
    cy.get('ul').should('not.have.class', 'navbar-nav');
  });

  it('renders unexpected button dropdown nav', () => {
    // when, then
    cy.get('button span').should('not.have.class', 'navbar-toggler-icon');
  });
});
