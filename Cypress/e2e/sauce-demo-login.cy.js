describe("Login functionality", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
  });

  it("standard_user can log in with valid password", () => {
    cy.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
  });

  it("standard_user cannot log in with invalid password", () => {
    cy.login("standard_user", "wrong_sauce");
    cy.errorMessageVisible();
    cy.invalidPasswordErrorMessage();
  });

  it("locked_out_user cannot log in", () => {
    cy.login("locked_out_user", "secret_sauce");
    cy.errorMessageVisible();
    cy.lockedOutUserErrorMessage();
  });

  it("error message when logging in with no username or password", () => {
    cy.noCredentials();
  });

  it("logout button logs out user", () => {
    cy.login("standard_user", "secret_sauce");
    cy.logout();
  });

  it("standard_user cannot access '/inventory.html' when logged out", () => {
    cy.login("standard_user", "secret_sauce");
    cy.logout();
    cy.go("back");
    cy.inventoryAccessDeniedWhenLoggedOut();
  });
});
