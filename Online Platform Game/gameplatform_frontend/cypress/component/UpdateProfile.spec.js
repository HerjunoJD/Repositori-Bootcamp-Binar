/* eslint-disable quotes */
/* eslint-disable no-unneeded-ternary */
/// <reference types="cypress" />
import { mount } from '@cypress/react';
import UpdateProfile from '../../pages/updateProfile';

describe('<UpdateProfile />', () => {
  beforeEach(() => {
    // given
    mount(<UpdateProfile />);
  });

  it('renders title', () => {
    // when, then
    cy.get('div[class="game-list"]').should('be.visible');
  });
});
