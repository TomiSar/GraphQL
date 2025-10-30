import { CLIENT_URL, GRAPHQL_URI } from '../../src/config/constants';

describe('Verify Header, Footer, Add Client, Verify Client info and Delete Client', () => {
  it('should display Header, Footer, open Add Client modal Create Client, Verify Client info and Delete Client', () => {
    const NAME = 'Jane Doe';
    const EMAIL = 'jane@email.com';
    const PHONE = '0400-123456';

    cy.visit(CLIENT_URL);
    cy.get('nav').should('be.visible');

    cy.get('img[alt="logo"]')
      .should('be.visible')
      .and(($img) => {
        const src = $img.attr('src');
        expect(src).to.not.be.empty;
      });

    cy.contains('Project management application for client');

    cy.get('a.navbar-brand')
      .should('be.visible')
      .should('have.attr', 'href', '/')
      .click();
    cy.location('pathname').should('eq', '/');

    cy.get('.clients-section').should(
      'contain.text',
      'No Clients (Use New Client modal to add new client)'
    );

    cy.get('footer').should('be.visible');

    cy.get('footer a.api-link')
      .should('be.visible')
      .should('have.attr', 'href', GRAPHQL_URI)
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
      .should('have.text', 'GraphQL Project API');

    cy.contains('New Client').click();

    cy.get('#addClientModal').should('be.visible');
    cy.get('#addClientModalLabel').should(
      'contain.text',
      'New Client Information'
    );

    cy.get('#name').type(NAME);
    cy.get('#email').type(EMAIL);
    cy.get('#phone').type(PHONE);

    cy.get('#addClientModal button[type="submit"]').click();

    cy.get('#clientRow').should('contain.text', NAME);
    cy.get('#clientRow').should('contain.text', EMAIL);
    cy.get('#clientRow').should('contain.text', PHONE);

    // Delete the client
    cy.get('#deleteClientBtn').click();
    cy.get('#clientRow').should('not.exist');

    cy.get('.clients-section').should(
      'contain.text',
      'No Clients (Use New Client modal to add new client)'
    );
  });
});
