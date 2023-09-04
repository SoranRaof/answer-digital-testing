const loginButton = "[data-test=login-button]";
const logoutButton = "[data-test=logout_side_bar_link]";
const menuButton = "[data-test=react-burger-menu-btn]";
const usernameInput = "[data-test=username]";
const passwordInput = "[data-test=password]";
const errorElement = "[data-test=error]";

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
  cy.get(menuButton).click();
  cy.get(logoutButton).click();
  cy.url().should("include", "sauce-demo.com/");
});
