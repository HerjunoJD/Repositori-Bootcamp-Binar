/* eslint-disable quotes */
/* eslint-disable no-unneeded-ternary */
/// <reference types="cypress" />
import { mount } from '@cypress/react';
import GameList from '../../pages/gamelist';

describe('<GameList />', () => {
  beforeEach(() => {
    // given
    mount(<GameList />);
  });

  it('renders page gameList', () => {
    // when, then
    cy.get('div[class="game-list"]').should('be.visible');
  });

  it('renders when page game list is not visible', () => {
    // when, then
    cy.get('div[class="game-list"]').should('not.be.visible');
  });
});
