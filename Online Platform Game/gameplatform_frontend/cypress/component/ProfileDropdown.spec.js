/* eslint-disable no-unneeded-ternary */
/// <reference types="cypress" />
import { mount } from '@cypress/react';
import ProfileDropdown from '../../components/ProfileDropdown';

const badge = 'Newbie';
const scored = 200;

describe('<PrifileDropdown />', () => {
  beforeEach(() => {
    // given
    mount(<ProfileDropdown scored={scored} badge={badge} />);
  });

  it('renders dropdown click', () => {
    // when, then
    cy.findByTestId('dropdown').click({ force: true });
  });

  it('renders user score', () => {
    // when, then
    cy.findAllByTestId('scored').should('have.text', scored);
  });

  it('renders user badge', () => {
    // when, then
    cy.findAllByTestId('badge').contains(badge);
  });

  // negative

  it('renders when user score is not visible', () => {
    // when, then
    cy.findAllByTestId('scored').should('not.have.text', scored);
  });

  it('renders wheb user badge is not visible', () => {
    // when, then
    cy.findAllByTestId('badge').should('not.have.text', badge);
  });
});
