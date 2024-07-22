let buttonCreateNewFolder = ".asset-folder-selector__new-folder";
let inputTextFolderName = "input[name=folder-name]";
let buttonFolderSubmit = ".sb-modal-footer .sb-button--primary";
let toastMessageTitle = ".custom-notification__title";
let toastMessageText = ".custom-notification__text";
let inputSearchFolders = "[data-testid=sb-mini-browser-search-input]";
let listSeacrhFolders = ".asset-folder-selector-item__name";
let buttonFolderActions = ".asset-folder-selector-item button";
let buttonDeleteAction = ".sb-menu-item--negative";
let buttonDeleteFolder = "[data-testid=delete-tab-modal-button]";

class assetsFolders {
  // Create new folder and verfiy its toast messages
  createNewFolder(folderName) {
    cy.get(buttonCreateNewFolder).click();
    cy.get(inputTextFolderName).type(folderName);
    cy.get(buttonFolderSubmit).click();
    cy.get(toastMessageTitle).should("have.text", "Success");
    cy.get(toastMessageText).should("have.text", "Folder Created");
    cy.addContextWithScreenshot(
      folderName + " folder created successfully",
      folderName
    );
  }

  // Input folder name and selects particular folder
  searchFolder(folderName) {
    cy.get(inputSearchFolders)
      .type(folderName)
      .wait(2000)
      .then(() => {
        cy.get(listSeacrhFolders).contains(folderName).click();
      });
  }

  // Loop through foolder names and select its action
  selectFolderActions(folderName) {
    cy.get(listSeacrhFolders).each((ele, index) => {
      const folderNameText = ele.text();
      if (folderNameText.includes(folderName)) {
        cy.get(buttonFolderActions).eq(index).click();
      }
    });
  }

  // Delete folder and verify toast messages
  deleteFolder() {
    cy.get(buttonDeleteAction)
      .last()
      .click({ force: true })
      .then(() => {
        cy.get(buttonDeleteFolder).click();
        cy.get(toastMessageTitle).should("have.text", "Success");
        cy.get(toastMessageText).should(
          "have.text",
          "The folder was successfully deleted"
        );
        cy.addScreenShot("folder deleted",);
      });
  }
}

const folders = new assetsFolders();
export default folders;
