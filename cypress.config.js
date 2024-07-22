const { defineConfig } = require("cypress")
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib')
const fs = require("fs")
const path = require("path")


module.exports = defineConfig({
  pageLoadTimeout:60000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'storyblok',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    code:false,
    overwrite:true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      on('after:run', async () => {
      await afterRunHook()

    let platform, folderName, tcName

    try {
      const jsonString = fs.readFileSync("cypress/fixtures/testCaseData.json");
      const testCase = JSON.parse(jsonString);
      console.log(testCase.platform);
      console.log(testCase.moduleName);
      console.log(testCase.testCaseName);
      platform = testCase.platform
      folderName = testCase.moduleName
      tcName = testCase.testCaseName
    } catch (err) {
      console.log(err);
      return;
    }

    // Constructing date, time, platform for test results folder
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = ("0" + date_ob.getHours()).slice(-2);
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    let todays_Date = year + month + date + hours + minutes + seconds
    let platformAndTodaysDate = platform.toLowerCase() + "_" + "results" + "_" + year + month + date
    const directorySplit = folderName.split("/")
    let moduleName = directorySplit[2]
    let fileName = tcName + "_" + todays_Date + ".html"
    let dir="cypress/test_results/"+ platformAndTodaysDate + "/" + moduleName;
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir,{recursive:true})
      fs.copyFileSync(path.resolve("cypress/reports/html","index.html"), "cypress/test_results/" + platformAndTodaysDate + "/" + moduleName + "/" + fileName)
    }else{
      fs.copyFileSync(path.resolve("cypress/reports/html","index.html"), "cypress/test_results/" + platformAndTodaysDate + "/" + moduleName + "/" + fileName)
    }
  })
      on("task",{
        writeDataIntoJsonFile,
        getFilePathsSync
      })
    },
    specPattern:"cypress/e2e/**/*.{js,ts}",
    env:{
      url:"https://app.storyblok.com/#/login",
      username:"shashibalajins@gmail.com",
      password:"Storyblok@123"
    },
    testIsolation:false
  },
});

// Writes testcase data into json file for report naming conventions
function writeDataIntoJsonFile(argl) {
  const testCaseData = {
    platform: argl.env,
    moduleName: argl.cwd,
    testCaseName: argl.tcName
  };

  const jsonString = JSON.stringify(testCaseData);
  console.log(jsonString);

  fs.writeFile('cypress/fixtures/testCaseData.json', jsonString, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })

  return "ok"
}

// Returns file paths for a given directory
function getFilePathsSync(dir) {
  let results = [];

  const list = fs.readdirSync(dir);
  list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat && stat.isDirectory()) {
          results = results.concat(getFilePathsSync(filePath));
      } else {
          results.push(filePath);
      }
  });
  console.log('file count'+results.length)
  return results;
}
