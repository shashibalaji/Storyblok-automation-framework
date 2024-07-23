# Storyblok automation framework
## Cypress UI automated tests

### Framework Explanation

- Framework designed by adopting Page Object Model design pattern.
- Project dependencies managed with npm in package.json.
- Node event listeners, plugins, cypress tasks and environment configurations in 'cypress.config.js'.
- Page classes and objects created for asset feature.
- Diverse file types and formats used as test file.
 
#### Page objects
  - locators, methods, report log scripts written under  'cypress/support/features/assets'  for asset tests.

#### Test data
   - Fixtures has different files for asset upload, asset detail, replace tests.

#### Environment data:
   - Platform data such as url, email, password is stored in 'environments.json'.

#### Reports
   - Implemented mochawesome reporter with customized test results folder creation.
---

## Test execution steps
   - Open VS code terminal window with node installed and input below commands

     - npm i
     - npx cypress run --headed 

---

## Test cases automated
 1. Asset registration- upload, verify, edit, delete asset.
 2. Edit asset before upload- create folder, edit while upload, verify asset details.
 3. Private and Public asset- mark asset as private and public, verify its preview.
 4. Replace asset- upload asset, replace asset, verify replaced asset, replace with different format, verify its not replaced.
 5. Multiple file upload- upload multiple files at once, verify its presence on assets page, delete files.


![Screenshot 2024-07-22 at 15 38 52](https://github.com/user-attachments/assets/1d0f7a9c-7dd4-459f-9475-70f50a0f09a7)



https://github.com/user-attachments/assets/d17d96d9-8e18-436a-9be0-c3fed172731d

---

### Future improvements:
 - Retrieving cookies and injecting token to subsquent tests can be added to avoid login to each test case.

