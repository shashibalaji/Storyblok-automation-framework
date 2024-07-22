import { uploadFile,getFileName,getFileFormat } from "../../utils/reusableFunctions";
import assets from "./assetsPage";
import assetDetail from "./assetDetailPage";

let fileUpload = "input[id=file]";
let fileReplace = "input[id=replacefile]";
let buttonUpload = ".sb-modal-footer button[type=submit]";
let textAssetName = "[data-testid=asset-name]";
let textAssetFormat = "[data-testid=asset-format]";
let buttonAdvancedOptions = ".assets-upload-item__more-options-button";
let inputTextAssetFileName = "#asset-filename";
let inputTags = "[data-testid=asset-tags-inner-search-input]";
let tagLists = ".sb-select-list__item-name";
let checkBoxTagLists = ".sb-select-list input";
let buttonEditUploadsave = ".sb-modal-footer .sb-button--primary";
let inputPrivateAsset='.sb-toggle input'
let buttonReplace='.list-assets-bulk-action__actions >button:nth-of-type(5)'
let buttonScheduleAsset='.assets-upload-item__schedule-button'
let inputPublishDate='[data-testid=sb-datepicker-input]'
let buttonSchedule='.sb-modal-footer .sb-button--primary'

class assetsRegistration {
  uploadMultipleFile(path) {
    cy.task("getFilePathsSync", path).then((filepath) => {
      cy.log(filepath);
      for (let i = 0; i < filepath.length; i++) {
        uploadFile(filepath[i]);
      }
    });
  }

  // Uploads and submit file
  uploadSingleFile(path) {
    cy.get(fileUpload).selectFile(path, { force: true }).wait(2000);
    cy.addContextWithScreenshot("file added to upload", path);
    cy.get(buttonUpload).click().wait(5000);
    cy.addContext("file uploading");
  }

  // Hover advanced options in upload window
  uploadWithAdvancedOptions(path) {
    cy.get(fileUpload).selectFile(path, { force: true }).wait(2000);
    cy.get(buttonAdvancedOptions).click({ force: true });
    cy.addContextWithScreenshot("Asset detail modal", path);
  }

  //While file uploading mark asset as private
  uploadPrivateAsset(path){
    let date=Cypress.dayjs().format('YYYYMMDDHHmm')
    
    cy.get(fileUpload).selectFile(path, { force: true }).wait(2000).then(function(){
      cy.get(inputPrivateAsset).click({force:true}).wait(2000)
      cy.addContextWithScreenshot("Mark asset as private", path);
      cy.get(buttonScheduleAsset).click({force:true})
      cy.get(inputPublishDate).type(date).wait(2000)
      cy.get(buttonSchedule).last().click({force:true})
    })
    cy.get(buttonUpload).click().wait(5000)
  }

  editFileName(editFileName) {
    cy.get(inputTextAssetFileName).clear().type(editFileName);
  }

  searchTags(tagName) {
    cy.get(inputTags).type(tagName).wait(2000);
    cy.get(tagLists).each((ele, index) => {
      const tagNameText = ele.text();
      if (tagNameText === tagName) {
        cy.get(checkBoxTagLists).eq(index).click({ force: true });
      }
    });
  }

  saveUpload() {
    cy.get(buttonEditUploadsave).click();
    cy.get(buttonUpload).click().wait(5000);
  }

  clickUpload(){
    cy.get(buttonUpload).click().wait(5000);
  }

  // Add asset details
  editBeforeUpload(
    editFileName,
    tagName,
    title,
    altText,
    copyrightText,
    sourceText
  ) {
    registration.editFileName(editFileName);
    registration.searchTags(tagName);
    assetDetail.selectAssetExpirationdate();
    assetDetail.enterAlt_Text(title);
    assetDetail.enterTitle_caption(altText);
    assetDetail.enterCopyright(copyrightText);
    assetDetail.enterSource(sourceText);
    cy.addScreenShot('Asset detail')
    registration.saveUpload();
    cy.addContextWithScreenshot("Asset details added",'asset');
  }
  // Validate filename and format of asset
  verifyUploadedFile(path) {
    const fileName=getFileName(path)
    const format=getFileFormat(path)
    cy.get(textAssetName).should("contain.text", fileName);
    cy.get(textAssetFormat).should("contain.text", format);
    cy.addContextWithScreenshot(
      fileName + " asset successfully uploaded",
      fileName
    );
  }

  verifyEditedFileUpload(fileName,format){
    cy.addScreenShot('Updated asset')
    cy.get(textAssetName).should("contain.text", fileName);
    cy.get(textAssetFormat).should("contain.text", format);
  }
  // Mimics user drag and drop action
  dragAndDropFile(path) {
    cy.get(fileUpload).selectFile(
      path,
      {force:true},
      { action: "drag-drop" }
    );
    cy.addContextWithScreenshot("file added to upload", path);
    cy.get(buttonUpload).click().wait(5000);
    cy.addContext("file uploading");
  }

  // Replaces an asset with new file -same format
  replaceAsset(assetName, replaceFilePath) {
    assets.selectAssetWithCheckbox(assetName);
    cy.get(buttonReplace).click();
    cy.addContextWithScreenshot(
      assetName + "Replace asset",
      assetName
    );
    cy.get(fileReplace).selectFile(replaceFilePath, { force: true }).wait(5000);
  }
}

const registration = new assetsRegistration();
export default registration;
