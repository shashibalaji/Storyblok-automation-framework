/// <reference types="Cypress"/>

import assets from "../../support/features/assets/assetsPage";
import { readPlaftformData, getFileName } from "../../support/utils/reusableFunctions";
import spaces from "../../support/features/spaces/spacesPage";
import registration from "../../support/features/assets/assetsRegistration";

describe("Multiple Fileuplaod", () => {
  let platform, env;
  let filePath = "cypress/fixtures/files/document";

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

  // Upload multiple files
  // This method will take 'n' number of files
  // Loops through files-provide folder path
  it("multiple_fileupload", () => {
    spaces.selectSpace();
    registration.uploadMultipleFile(filePath);
    registration.clickUpload();
  });

  // Deletes uploaded asset
  it("delete_asset", () => {
    assets.selectUploadMultipleFiles(filePath);
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
