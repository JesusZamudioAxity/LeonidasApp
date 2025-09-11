const AlmacenamientoRAN = require ('../../pageObjects/almacenamiento/moverRan.page');
const TestDataManager = require('../../utils/testDataManager');

const ranData = TestDataManager.getmoverRANdata();
const appPackage = 'com.ndzl.emdkmaui';

describe('test', () => {
  ranData.items.forEach((ran, index) => {
    it(`Mover RAN - caso #${index + 1}`, async () => {
      await AlmacenamientoRAN.moverRAN(ran.qr, ran.location);
    });
  });
});
 


//  const {
//      clickButtonInContainer,
//      clickElementByText,
//      scrollToText,
//      waitForElementToBeVisible,
//      FakeScan,
//      assertToastTextExists
//  } = require('../../utils/uiHelpers');

// _almacenamientoSelector = 'android=new UiSelector().text("Almacenamiento")';
// _almacenarSelector = 'android=new UiSelector().text("Almacenar")';
// _lblTipoAlmacenar = 'android=new UiSelector().text("Tipo de almacenamiento")';
// _lblMoverRan = 'android=new UiSelector().text("Mover RAN")';
// _msgRANOK = 'android=new UiSelector().text("OK")';



//   describe('test', () => {
//  ;
//        it('Mover RAN ', async () => {
//         await clickElementByText('Almacén');
//         await waitForElementToBeVisible(_almacenamientoSelector);
//         await clickButtonInContainer('Almacenamiento');
//         await waitForElementToBeVisible(_almacenarSelector);
//         await clickButtonInContainer('Almacenar');
//         await waitForElementToBeVisible(_lblTipoAlmacenar);
//         await scrollToText('Mover RAN')
         
//         await waitForElementToBeVisible(_lblMoverRan );
//         await FakeScan("[>|p65715el000|q20|v003435|s13659806|ar0509208|<]");
//         await waitForElementToBeVisible(_msgRANOK);
//         await assertToastTextExists("Ran encontrado");
//         await FakeScan("!l?ZI02H");
//         await assertToastTextExists("Se movió el RAN");

//      });
     
       
//   });
 