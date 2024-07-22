let inputTags = "[data-testid=asset-tags-inner-search-input]";
let labelCreatetag = ".sb-select-list__create-label";
let toggleIconPrivate = ".sb-toggle";
let toggleIconPublic = ".sb-toggle__icon--inactive";
let datePickerAssetPublishDate = "[data-testid=asset-publish-date-input]";
let datePickerAssetExpireDate = "[data-testid=asset-expire-date-input]";
let inputTextAssetTitle = "#asset-metadata-title";
let inputTextAssetMetaData = "#asset-metadata-alt";
let inputTextAssetCopyright = "#asset-metadata-copyright";
let inputTextAssetSource = "#asset-metadata-source";
let buttonAssetDetailSubmit =".asset-detail__footer-actions .sb-button--primary";
let toastMessageTitle = ".custom-notification__title";
let toastMessageText = ".custom-notification__text";

class assetDetailPage {
  addNewTage(newTagName) {
    cy.get(inputTags).type(newTagName).wait(2000);
    cy.get(labelCreatetag).click();
  }

  // Toggle to private asset
  makeAssetPrivate() {
    cy.get(toggleIconPrivate).click({ force: true });
  }
  // Toggle to public asset
  makeAssetPublic() {
    cy.get(toggleIconPublic).click();
  }

  selectAssetPublishingDate() {
    let date = Cypress.dayjs().format("YYYYMMDDHHmm");
    cy.get(datePickerAssetPublishDate).type(date).wait(2000);
  }
  // Inputs future date
  selectAssetExpirationdate() {
    let date = Cypress.dayjs().add(6, "day").format("YYYYMMDDHHmm");
    cy.get(datePickerAssetExpireDate).type(date).wait(2000);
  }

  // Enter title/caption for asset
  enterTitle_caption(title) {
    cy.get(inputTextAssetTitle).clear().type(title).wait(1000);
  }

  // Enter alernative text for asset
  enterAlt_Text(altText) {
    cy.get(inputTextAssetMetaData).clear().type(altText).wait(1000);
  }

  // Enter copyright information for asset
  enterCopyright(copyrightText) {
    cy.get(inputTextAssetCopyright).clear().type(copyrightText).wait(1000);
  }

  // Enter source information for asset
  enterSource(sourceText) {
    cy.get(inputTextAssetSource).clear().type(sourceText);
  }

  // Submits asset details
  // Verfies toast messages
  saveAssetDetail() {
    cy.get(buttonAssetDetailSubmit).click();
    cy.get(toastMessageTitle).should("have.text", "Success");
    cy.get(toastMessageText).should("have.text", "Asset successfully updated");
  }

  // Edit asset details
  // Call required field entry methods here based on specific edits
  editAsset(title, altText, copyrightText, sourceText) {
    assetDetail.makeAssetPrivate();
    assetDetail.selectAssetExpirationdate();
    assetDetail.enterTitle_caption(title);
    assetDetail.enterAlt_Text(altText);
    assetDetail.enterCopyright(copyrightText);
    assetDetail.enterSource(sourceText);
    cy.addScreenShot('Asset detail')
    assetDetail.saveAssetDetail();
    cy.addContextWithScreenshot("Asset details updated",'asset');
  }
}

const assetDetail = new assetDetailPage();
export default assetDetail;
