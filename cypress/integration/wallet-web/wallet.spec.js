import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = 'https://web-staging.aonewallet.com/login'
Given('browser is at Onewallet website', () => {
  cy.visit(url);
  cy.location().should((loc) => {
    expect(loc.href).to.eq(url);
  });
  cy.get('#field-16').should('exist');
  cy.get('#field-17').should('exist');
  cy.get('[data-testid="login-form"] > .chakra-button').should('exist');
})

//Scenario: Login validation for invalid credentials
When('user clicks login button with fields empty', () => {
  cy.get('#field-16');
  cy.get('#field-17');
  cy.get('[data-testid="login-form"] > .chakra-button').click();
})

Then('validation messages appears', () => {
  cy.get('[data-testid="login-form"] > :nth-child(1)');
  cy.get('[data-testid="login-form"] > :nth-child(2)');
})

//Scenario: Login validation for incorrect credentials
When('user Login with wrong username or password', () => {
  cy.get('#field-16').type('test');
  cy.get('#field-17').type('test');
  cy.get('[data-testid="login-form"] > .chakra-button').click();
})

Then('an error message pops up "Invalid Username or Password"', () => {
  cy.get('.chakra-toast').contains('Invalid Credentials');
  
})

//Scenario: Login successfully
When('user enters correct username and password',() => {
  cy.get('#field-16').type('autotest');
  cy.get('#field-17').type('password');
  cy.get('[data-testid="login-form"] > .chakra-button').click();
})

Then('user Login successfully and redirects to default page', () => {
  cy.location().should((loc) => {
    expect(loc.href).to.eq(url);
  });
  
})

//Scenario: Logout successfully
When('user enters correct username and password',() => {
  cy.get('#field-16').type('autotest');
  cy.get('#field-17').type('password');
  cy.get('[data-testid="login-form"] > .chakra-button').click();
})

Then('user Login successfully and redirects to default page', () => {
  cy.location().should((loc) => {
    expect(loc.href).to.eq(url);
  });
  cy.get('#menu-button-20 > .chakra-icon').click();
  cy.get(':nth-child(6) > .css-9yxtxa').click();

  
})
