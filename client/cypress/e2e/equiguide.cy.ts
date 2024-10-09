Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('button').contains('Logga in').click();

  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button').contains('Logga in').click();
  cy.url().should('include', '/app/home')
});

beforeEach(() => {
  const email: string = Cypress.env('testEmail')
  const password = Cypress.env('password')

  cy.login(email, password);
})

/* describe('Tests for confirming login works', () => {
  it('Should display home page of application', () => {
    cy.url().should('include', '/app/home')
    cy.get('h1').contains('Hem')
  });
}); */

/* describe('Test for adding ride', () => {
  it('Should fill and submit ride form', () => {
    cy.url().should('include', '/app/home')
    cy.get('nav').contains('Planera ridpass').click()

    cy.get('input[name="title"]').type('Lösgjordhet')
    cy.get('input[type="date"]').type('2024-10-12')
    cy.get('select.horseSelect').select('Andor')
    cy.get('select.disciplineSelect').select('Dressyr')

    cy.get('button').contains('Skapa pass').click()
    cy.get('p').contains('Ridpass planerat')
  });
}); */

/* describe('Test for viewing horse', () => {
  it('Should fill and submit ride form', () => {
    cy.url().should('include', '/app/home')
    cy.get('nav').contains('Profil').click()
    
    cy.get('div.horseProfile').get('button.secondaryButton').contains('Visa').click()
    cy.get('div.viewHorseContainer').find('div.horseInfoContainer').find('ul').should('exist').children('li').should('have.length',5)
  });
}); */

/* describe('Test for sign out', () => {
  it('Should logout user', () => {
    cy.url().should('include', '/app/home')
    cy.get('nav').contains('Profil').click()
    
    cy.get('button.tertriaryButton.logoutButton').click()
    cy.url().should('include', '/login')
  });
}); */