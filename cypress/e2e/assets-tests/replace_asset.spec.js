/// <reference types="Cypress"/>

import assets from "../../support/features/assets/assetsPage";
import {
  readPlaftformData,
  getFileName,
} from "../../support/utils/reusableFunctions";
import spaces from "../../support/features/spaces/spacesPage";
import registration from "../../support/features/assets/assetsRegistration";

describe("Replace_Asset", () => {
  let platform, env;
  let filePath = "cypress/fixtures/files/image/png_testfile.png";
  let replaceFilePath = "cypress/fixtures/files/replacefile/replace.png";
  let differentFileFormat = "cypress/fixtures/files/video/video1.mov";
  const fileName = getFileName(filePath);
  const replaceFileName = getFileName(replaceFilePath);

  before("", function () {
    cy.fixture("environments")
      .then(function (data) {
        this.data = data;
        platform = readPlaftformData(data);
      })
      .as("platformDataLoad");

    cy.get("@platformDataLoad").then(function () {
      env = this.data.platformname;
      cy.loginStoryblok(platform.url, platform.email, platform.password);
    });
  });

  // Drag and drop file and verfiy its presence on assets page
  // Takes filePath as argument
  it("upload_file", () => {
    spaces.selectSpace();
    registration.dragAndDropFile(filePath);
    registration.verifyUploadedFile(filePath);
  });

  // Replace asset with new file with same format
  it("replace_asset", () => {
    registration.replaceAsset(fileName, replaceFilePath);
  });

  // Verifies replaced asset name
  it("verify_replace_asset", () => {
    registration.verifyUploadedFile(filePath);
  });

  // Replace with different file format
  it("replace_asset_different_format", () => {
    registration.replaceAsset(fileName, differentFileFormat);
  });

  // Verifies replaced asset name
  it("verify_replace_asset", () => {
    // Idea is to verify previous file name
    // If different file format is replaced, then
    // This method will fail
    registration.verifyUploadedFile(filePath);
  });

  // Deletes uploaded asset
  it("delete_asset", () => {
    assets.selectAssetWithCheckbox(fileName);
    assets.deleteAsset();
  });

  // Writes testcasename,featurename and platform name
  // To create customized test results folder structure
  it("log_report", () => {
    let cwd = __dirname;
    let tcName = getFileName(__filename);
    cy.task("writeDataIntoJsonFile", { env, cwd, tcName });
  });
});