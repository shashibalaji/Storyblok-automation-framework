let textAssetName='[data-testid=asset-name]'
let listAssetPreview='.assets-list-item-preview'
let inputAssetCheckbox='input[type=checkbox]'
let buttonFileUpload='input[id=file]'

function readPlaftformData(platformData) {
    var map = new Map()

    switch (platformData.platformname) {

        case "dev":
            map.set("url", platformData.dev_url);
            map.set("email", platformData.dev_email)
            map.set("password", platformData.dev_password)
            break;

        case "staging":
            map.set("url", platformData.staging_url);
            map.set("email", platformData.staging_email)
            map.set("password", platformData.staging_password)
            break;

        case 'prod':
            map.set("url", platformData.prod_url);
            map.set("email", platformData.prod_email)
            map.set("password", platformData.prod_password)
            break;
 
    }
    const obj = Object.fromEntries(map)
    return obj
}

function uploadFile(filename){
    cy.get(buttonFileUpload).selectFile(filename,{force:true});
    cy.addContextWithScreenshot(filename+" file added to upload", filename);
}

function selectAsset(assetName){
    const fileName=getFileName(assetName)
    cy.get(textAssetName).each((ele,index)=>{
        const assetText=ele.text()
        if(assetText.includes(fileName)){
            cy.get(listAssetPreview).eq(index).trigger('mouseover').wait(3000)
            cy.get(inputAssetCheckbox).eq(index).click({force:true})
            cy.addContextWithScreenshot(assetName+" file selected", assetName);
        }
    })
}

function getFileName(filePath){
    const parts=filePath.split('/')
    const lastItem=parts[parts.length-1]
    const elements=lastItem.split('.')
    const fileName=elements[0]
    return fileName
}

function getFileFormat(filePath){
    const parts=filePath.split('/')
    const lastItem=parts[parts.length-1]
    const elements=lastItem.split('.')
    const format=elements[elements.length-1]
    return format
}

export {readPlaftformData,uploadFile,selectAsset,getFileName,getFileFormat}
