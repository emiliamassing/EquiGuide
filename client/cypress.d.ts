// cypress/support/index.d.ts or cypress.d.ts (wherever your type definitions are)

declare namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<Element>;
    }
  }
  