import { getTitle } from '../support/app.po';

describe('frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('should display correct title', () => {
    // Function helper example, see `../support/app.po.ts` file
    getTitle().contains('All tasks');
  });
});
