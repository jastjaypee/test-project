import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = 'https://web-staging.aonewallet.com/login'
Given('browser is at Onewallet website', () => {
  cy.visit(url);
  cy.location().should((loc) => {
    expect(loc.href).to.eq(url);
  });
  cy.get('[placeholder="Username"]').should('exist');
  cy.get('[placeholder="Password"]').should('exist');
  cy.get('[data-testid="login-form"] > .chakra-button').should('exist');
})

//Scenario: Login validation for invalid credentials
When('user clicks login button with fields empty', () => {
  cy.get('[placeholder="Username"]');
  cy.get('[placeholder="Password"]');
  cy.get('[data-testid="login-form"] > .chakra-button').click();
})

Then('validation messages appears', () => {
  cy.get('[data-testid="login-form"] > :nth-child(1)');
  cy.get('[data-testid="login-form"] > :nth-child(2)');
})

//Scenario: Login validation for incorrect credentials
When('user Login with wrong username or password', () => {
  cy.get('[placeholder="Username"]').type('test');
  cy.get('[placeholder="Password"]').type('test');
  cy.get('[data-testid="login-form"] > .chakra-button').click();
})

Then('an error message pops up "Invalid Username or Password"', () => {
  cy.get('.chakra-toast').contains('Invalid Credentials');
  
})

//Scenario: Login successfully
When('user enters correct username and password',() => {
  cy.get('[placeholder="Username"]').type('autotest');
  cy.get('[placeholder="Password"]').type('password');
  cy.get('[data-testid="login-form"] > .chakra-button').click();
})

Then('user Login successfully and redirects to default page', () => {
  cy.location().should((loc) => {
    expect(loc.href).to.eq(url);
  });
  
})

