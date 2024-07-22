// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import addContext from "mochawesome/addContext";

// storyblok login
Cypress.Commands.add("loginStoryblok", (url, email, password) => {
  cy.visit(url);
  cy.get("[data-testid=login-email]").type(email);
  cy.get("[data-testid=login-password]").type(password);
  cy.get("[data-testid=submit]").click();
  cy.get(".sb-avatar")
    .invoke("attr", "email")
    .then((accountEmail) => {
      if (accountEmail === email) {
        cy.log("Login to storyblok is successfull");
        cy.addContext("login to storyblok is successfull");
        cy.addScreenShot("Storyblok homepage");
      } else {
        cy.log("Login failed, Please check credentials");
        cy.addContext("login failed");
        cy.addScreenShot("Storyblok login page");
      }
    });

  cy.wait(3000);
});

Cypress.Commands.add("addContext", (context) => {
  cy.once("test:after:run", (test) => addContext({ test }, context));
});

Cypress.Commands.add("addScreenShot", (text) => {
  let timeStamp = Cypress.dayjs().format("YYYYMMDDHHmm");
  cy.screenshot(text + "_" + timeStamp);
});

Cypress.Commands.add("addContextWithScreenshot", (context, text) => {
  let timeStamp = Cypress.dayjs().format("YYYYMMDDHHmm");
  cy.once("test:after:run", (test) => addContext({ test }, context));
  cy.screenshot(text + "_" + timeStamp);
});
