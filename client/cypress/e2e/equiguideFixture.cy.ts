Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('button').contains('Logga in').click();
  
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button').contains('Logga in').click();
    cy.url().should('include', '/app/home')
});

beforeEach(() =>{
    const email: string = Cypress.env('testEmail')
    const password = Cypress.env('password')

    cy.login(email, password);
})

describe('Equiguide API test for viewing ride', () => {
    it('Should recieve ride data correctly', () => {
        cy.intercept('GET', 'http://localhost:3000/ridingSessions/horse?horseId=20', { fixture: 'rideResponse.json' }).as('getRides');

        cy.get('select').select('Andor');
        cy.get('button').contains('Visa ridpass').click()

        cy.get('div.allRidesWrapper').children().should('have.length', 2);
    })
})

describe('Equiguide API test for updated user data', () => {
    it('Should update user data correctly', () => {
        cy.intercept('POST','http://localhost:3000/users/edit/12', { fixture: 'userResponse.json' }).as('postNewUserData');
    
        cy.url().should('include', '/app/home')
        cy.get('nav').contains('Profil').click()
        cy.get('button.tertriaryButton').contains('Redigera profil').click()

        cy.get('input[name="firstName"]').clear().type('Amrens') //Needs to be updated after tested once since userContext gets updated
        cy.get('input[name="lastName"]').clear().type('Doe')

        cy.get('button.primaryButton').contains('Redigera').click()

        cy.get('p').should('contain', 'Användaruppgifter redigerade') 
    })
})