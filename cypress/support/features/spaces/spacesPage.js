let linkSpacesList = ".list-spaces__cards a";
let linkAssets = '[data-testid="dashboard-infos-assets"]';
let buttonCloseNotification = "[data-testid=nudge-step-close-button]";

class spacesPage {
  selectSpace(spaceName) {
    spaces.closeNotification();
    cy.get(linkSpacesList).click().wait(5000);
    spaces.closeNotification();
    cy.get(linkAssets).click();
  }

  closeNotification() {
    cy.get("body").then((body) => {
      if (body.find(buttonCloseNotification).length > 0) {
        cy.get(buttonCloseNotification).click().wait(2000);
      }
    });
  }
}

const spaces = new spacesPage();
export default spaces;
