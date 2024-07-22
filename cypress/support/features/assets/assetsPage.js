import { selectAsset } from "../../utils/reusableFunctions"
let textAssetName='[data-testid=asset-name]'
let buttonDeleteAsset='[data-testid=delete-tab-modal-button]'
let buttonCloseAssetDetails='.asset-detail__header button'
let buttonListPreview='.assets-list-item-preview'
let inputAssetCheckbox='input[type=checkbox]'
let toastMessageTitle='.custom-notification__title'
let toastMessageText='.custom-notification__text'

class assetsPage{

    // Open asset based on its name
    clickAsset(assetName){
        cy.get(textAssetName).each((ele,index)=>{
            const assetText=ele.text()
            if(assetText.includes(assetName)){
                cy.get(textAssetName).eq(index).click().wait(3000)
                cy.addContextWithScreenshot(
                    assetName + " asset details page",
                    assetName
                  );
            }
        })
    }

    // Loops through assets and selects asset checkbox
    selectAssetWithCheckbox(assetName){
        cy.get(textAssetName).each((ele,index)=>{
            const assetText=ele.text()
            if(assetText.includes(assetName)){
                cy.get(buttonListPreview).eq(index).trigger('mouseover').wait(3000)
                cy.get(inputAssetCheckbox).eq(index).click({force:true})
                cy.addContextWithScreenshot(
                    assetName + " asset menu appeared",
                    assetName
                  );
            }
        })
    }

    selectAssetFileWithCheckbox(assetName){
        cy.get(textAssetName).each((ele,index)=>{
            const assetText=ele.text()
            if(assetName.includes(assetText)){
                cy.get(buttonListPreview).eq(index).trigger('mouseover').wait(3000)
                cy.get(inputAssetCheckbox).eq(index).click({force:true})
            }
        })
    }
    // Iterate through files and select asset checkbox
    selectUploadMultipleFiles(path) {
        cy.task("getFilePathsSync", path).then((filepath) => {
          cy.log(filepath);
          for (let i = 0; i < filepath.length; i++) {
            selectAsset(filepath[i]);
          }
        });
      }
    
    // Deletes and verify toast messages  
    deleteAsset(){
        assets.selectAssetActions('Delete')
        cy.get(buttonDeleteAsset).click().then(()=>{
            cy.get(toastMessageTitle).should('have.text','Success')
            cy.get(toastMessageText).should('have.text','The asset was successfully deleted')
        })
    }

    // Technique: private asset will have '.asset-private-preview' class
    // If this particular tag exists then image is concealed
    // Looping through assetname ,verifying uploaded asset is private
    verifyImageConcealForPrivateAsset(assetName){
        cy.get('.assets-list-item-preview__container').then((preview)=>{
            if(preview.find('.asset-private-preview').length>0){

                cy.get(textAssetName).each((ele,index)=>{
                    const assetText=ele.text()
                    if(assetText.includes(assetName)){
                        cy.get(textAssetName).eq(index).click().wait(3000)
                        cy.get(buttonCloseAssetDetails).click().wait(1000)
                        cy.log('Image preview is private')
                        cy.addContextWithScreenshot(
                            assetName + " is private, image preview concealed ",
                            assetName
                          );
                    }
                })
            }else{
                cy.log('Test case failed, image preview is visible')
                cy.addContextWithScreenshot(
                    assetName + " is public, image preview is visible ",
                    assetName
                  );
            }
        })
    }

    // Technique: public asset will have 'img' tag
    // If this particular tag exists then image is visible
    // Looping through assetname ,verifying uploaded asset is public

    verifyImagePreviewForPublicAsset(assetName){
        cy.get('.assets-list-item-preview__container').then((preview)=>{
            if(preview.find('img').length>0){

                cy.get(textAssetName).each((ele,index)=>{
                    const assetText=ele.text()
                    if(assetText.includes(assetName)){
                        cy.get(textAssetName).eq(index).click().wait(3000)
                        cy.get(buttonCloseAssetDetails).first().click().wait(1000)
                        cy.log('Image preview is visible')
                        cy.addContextWithScreenshot(
                            assetName + " is public, image preview is visible ",
                            assetName
                          );
                    }
                })
            }else{
                cy.log('Test case failed, image preview is concealed')
                cy.addContextWithScreenshot(
                    assetName + " is private, image preview is concealed",
                    assetName
                  );
            }
        })
    }

    selectAssetActions(actionname){
        let actionsElement='button[aria-label='+actionname+']'
        cy.get(actionsElement).click({force:true}).wait(2000)
    }

}

const assets=new assetsPage()
export default assets