

//locators
const ACCEPT_COOKIES = "#onetrust-accept-btn-handler";
const MANAGE_COOKIES = '#onetrust-pc-btn-handler';


class Homepage {

  //methods

  openWebsite() {
    cy.visit(Cypress.config().baseUrl, { timeout: 30000 });
    cy.log(Cypress.config().baseUrl)
  }

  verifyCookieBannerButtons() {
    cy.get(ACCEPT_COOKIES).should('be.visible');
    cy.get(MANAGE_COOKIES).should('be.visible');
  }

  acceptCookies() {
    cy.get(ACCEPT_COOKIES).click();
    cy.wait(2000);
    cy.reload(true);
  }

}

module.exports = Homepage;
