const ACCOUNT_DROP_DOWN = "[data-testid=mobile-nav-toggle]";
const Navigation_bar = '#bottom-bar-nav'
const Navigation_bar_mobile_view = '[data-testid=mobile-nav-menu]'
//const accNumber = "[class^='accountManager']"
const fuel = "[class^='fuelHeadingContainer']"
const billPanel = "div[data-testid='my-bills-panel']"
const meterPanel = "div[data-testid='meter-reads-panel']"

beforeEach(() => {
    cy.eyesOpen({
    appName: 'Digital web test',
    testName: 'Login test UFG'})
})

afterEach(() => {
    cy.eyesClose()
})


class loginvisual {

   takeScreenshot(){
   cy.eyesCheckWindow('Main Page');
   } 

   verifyNavigationHeader(){
    cy.get(ACCOUNT_DROP_DOWN).click();
    cy.wait(5000);  
   }

   logintoacc(){
    cy.contains('Log in / Register').click({force: true});
    cy.get('button:contains("Logged in before")').click();
    
    }

    dashboardScreenshot(){
    cy.get(billPanel, { timeout: 15000 }).should('be.visible');
    cy.get(fuel, { timeout: 15000 }).should('be.visible');
    cy.wait(5000);
    
    }
}

module.exports = loginvisual;