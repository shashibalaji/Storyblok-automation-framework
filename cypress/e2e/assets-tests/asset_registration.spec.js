/// <reference types="Cypress"/>

import assets from "../../support/features/assets/assetsPage";
import folders from "../../support/features/assets/assetsFolders";
import spaces from "../../support/features/spaces/spacesPage";
import registration from "../../support/features/assets/assetsRegistration";
import assetDetail from "../../support/features/assets/assetDetailPage";
import {
  readPlaftformData,
  getFileName,
} from "../../support/utils/reusableFunctions";

describe("Asset Registration", () => {
  let platform, env, tag, title, alt_text, copyright, source;
  let folderName = "test_" + Cypress.dayjs().format("MMDDHHmm");
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

    cy.fixture("assetDetail/assetdata.json").then(function (assetData) {
      this.assetData = assetData;
      tag = this.assetData.tag;
      title = this.assetData.title;
      alt_text = this.assetData.alt_text;
      copyright = this.assetData.copyright;
      source = this.assetData.source;
    });
  });

  // Creates folder to add assets
  it("create_folder", () => {
    spaces.selectSpace();
    folders.createNewFolder(folderName);
    folders.searchFolder(folderName);
  });

  // Uploads file and verfiy its presence on assets page
  // Takes filePath as argument
  it("upload_file", () => {
    registration.uploadSingleFile(filePath);
    registration.verifyUploadedFile(filePath);
  });

  // Edit asset details and verify its updated
  it("edit_asset", function () {
    assets.clickAsset(fileName);
    assetDetail.editAsset(title, alt_text, copyright, source);
  });

  // Deletes uploaded asset
  it("delete_asset", () => {
    assets.selectAssetWithCheckbox(fileName);
    assets.deleteAsset();
  });

  // Deletes created folder
  it("delete_folder", () => {
    folders.selectFolderActions(folderName);
    folders.deleteFolder();
  });

  // Writes testcasename,featurename and platform name
  // To create customized test results folder structure
  it("log_report", () => {
    let cwd = __dirname;
    let tcName = getFileName(__filename);
    cy.task("writeDataIntoJsonFile", { env, cwd, tcName });
  });
});
