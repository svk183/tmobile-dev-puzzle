describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should undo remove book from my reading list', () => {
    // Code to search for a book
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);

    // Adding book to read list
    cy.get('[data-testing="add-book"]').eq(0).click();
    
    // Opening readlist navbar
    cy.get('[data-testing="toggle-reading-list"]').click();

    // removing book from readlist
    cy.get('[data-testing="remove-book-from-reading-list"]').click();

    // clicking on undo to add the book back to readlist
    cy.get('*[class^="mat-simple-snackbar-action"]').last().click();

    // Confirming the size of readlist stack
    cy.get('[data-testing="remove-book-from-reading-list"]').should('have.length.greaterThan', 0);

    // fallback code to remove the book readlist - which causes issue when we try to search for same book
    cy.get('[data-testing="remove-book-from-reading-list"]').click();
  });
});
