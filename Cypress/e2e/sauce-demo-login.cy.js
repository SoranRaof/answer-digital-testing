describe("Login functionality", () => {
  it("standard_user can log in with valid password", () => {
    cy.visit("https://www.saucedemo.com");
    cy.get("[data-test=username]").type("standard_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();
    cy.url().should("include", "/inventory.html");
  });

  it("standard_user cannot log in with invalid password", () => {
    cy.visit("https://www.saucedemo.com");
    cy.get("[data-test=username]").type("standard_user");
    cy.get("[data-test=password]").type("wrong_password");
    cy.get("[data-test=login-button]").click();
    cy.get("[data-test=error]").should("be.visible");
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("locked_out_user cannot log in", () => {
    cy.visit("https://www.saucedemo.com");
    cy.get("[data-test=username]").type("locked_out_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();
    cy.get("[data-test=error]").should("be.visible");
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  it("error message when logging in with no username or password", () => {
    cy.visit("https://www.saucedemo.com");
    cy.get("[data-test=login-button]").click();
    cy.get("[data-test=error]").should("be.visible");
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Username is required"
    );
  });
});
