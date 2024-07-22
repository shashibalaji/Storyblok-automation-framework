/// <reference types="Cypress"/>

import assets from "../../support/features/assets/assetsPage";
import {
  readPlaftformData,
  getFileName,
} from "../../support/utils/reusableFunctions";
import spaces from "../../support/features/spaces/spacesPage";
import registration from "../../support/features/assets/assetsRegistration";

describe('"Private/Public Asset', () => {
  let platform, env;
  let filePath = "cypress/fixtures/files/image/gif_testfile.gif";
  const fileName = getFileName(filePath);

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

  // Toggle to private permission and submit file
  it("upload_private_asset", () => {
    spaces.selectSpace();
    registration.uploadPrivateAsset(filePath);
  });

  // Verify image preview is concealed
  it("verify_imagepreview", () => {
    assets.verifyImageConcealForPrivateAsset(fileName);
  });

  // Deletes uploaded asset
  it("delete_asset", () => {
    assets.selectAssetWithCheckbox(fileName);
    assets.deleteAsset();
  });

  // Uploads file and verfiy its presence on assets page
  // Takes filePath as argument
  it("upload_public_asset", () => {
    registration.uploadSingleFile(filePath);
    registration.verifyUploadedFile(filePath);
  });

  // Verify image preview is visible
  it("verify_imagepreview", () => {
    assets.verifyImagePreviewForPublicAsset(fileName);
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
