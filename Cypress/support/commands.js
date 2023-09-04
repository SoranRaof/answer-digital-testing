import {
  usernameInput,
  passwordInput,
  loginButton,
  errorElement,
  menuButton,
  logoutButton,
} from "./variables";

Cypress.Commands.add("login", (username, password) => {
  cy.get(usernameInput).type(username);
  cy.get(passwordInput).type(password);
  cy.get(loginButton).click();
});

Cypress.Commands.add("errorMessageVisible", () => {
  cy.get(errorElement).should("be.visible");
});

Cypress.Commands.add("invalidPasswordErrorMessage", () => {
  cy.get(errorElement).should(
    "have.text",
    "Epic sadface: Username and password do not match any user in this service"
  );
});

Cypress.Commands.add("lockedOutUserErrorMessage", () => {
  cy.get(errorElement).should(
    "have.text",
    "Epic sadface: Sorry, this user has been locked out."
  );
});

Cypress.Commands.add("noCredentials", () => {
  cy.get(loginButton).click();
  cy.get(errorElement).should("be.visible");
  cy.get(errorElement).should(
    "have.text",
    "Epic sadface: Username is required"
  );
});

Cypress.Commands.add("logout", () => {
  cy.url().should("include", "/inventory.html");
  cy.get(menuButton).click();
  cy.get(logoutButton).click();
  cy.url().should("include", "https://www.saucedemo.com/");
});

Cypress.Commands.add("inventoryAccessDeniedWhenLoggedOut", () => {
  cy.get(errorElement).should(
    "be.visible",
    "Epic sadface: You can only access '/inventory.html' when you are logged in."
  );
});
