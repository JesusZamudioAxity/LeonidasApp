const TrackingPage = require('../../pageObjects/ASN/tracking.page');
const TestDataManager = require('../../utils/testDataManager');

const trackingData = TestDataManager.getTrackingData();
const {
     clickButtonInContainer,
     enterText,
     scrollToText,
     waitForElementToBeVisible,
     FakeScan,
     assertElementVisibleAndExists
} = require('../../utils/uiHelpers');

_editTextSelector = 'android=new UiSelector().className("android.widget.EditText").instance(0)';
_itemLabelSelector = 'android=new UiSelector().text("Item:")';
_viewGroupSelector = 'android=new UiSelector().className("android.view.ViewGroup").instance(11)';
_siguienteButtonSelector = 'android=new UiSelector().text("SIGUIENTE")';
_regresarAlMenuSelector = 'android=new UiSelector().text("REGRESAR AL MENÚ")';
_warningItemtSelector = 'android=new UiSelector().text("Ingresa un número de item válido")';


 describe('Tracking ventanilla', () => {
    
      it('Flujo de Tracking ventanilla', async () => {
        const { trackingNumber, scanCode } = trackingData.validItem;
          await scrollToText("Tracking de ventanilla");      
          await browser.pause(1500); // Solo para observar
          
          //  await clickButtonInContainer("Tracking de ventanilla");
          //  await browser.pause(1500); // Solo para observar
          //  await enterText(_editTextSelector, trackingNumber);
          //  await clickButtonInContainer("BUSCAR");
          //  await waitForElementToBeVisible(_itemLabelSelector, 10000);
          await TrackingPage.iniciarFlujoTracking(trackingNumber); 


          console.log("Esto es el QR1: " + scanCode)
          await FakeScan(scanCode);
          await waitForElementToBeVisible(_itemLabelSelector, 10000);
          console.log("Esto es el QR2: " +scanCode)
          await FakeScan(scanCode);   
          assertElementVisibleAndExists(_viewGroupSelector, 10000);
          await waitForElementToBeVisible(_itemLabelSelector, 10000);
          console.log("Esto es el QR3: " +scanCode)
          await FakeScan(scanCode);
          // await TrackingPage.realizarEscaneos();

          //  assertElementVisibleAndExists(_siguienteButtonSelector, 10000);
          //  await clickButtonInContainer("SIGUIENTE");
          //  await waitForElementToBeVisible(_regresarAlMenuSelector, 10000);
          //  await clickButtonInContainer("REGRESAR AL MENÚ");
          await TrackingPage.continuarYSalir(); 
     });


       it('Tracking item invalido', async () => {
          const { trackingNumber } = trackingData.invalidItem;
           await scrollToText("Tracking de ventanilla");      
           await browser.pause(1500); // Solo para observar

           await clickButtonInContainer("Tracking de ventanilla");
           await browser.pause(1500); // Solo para observar
           await enterText(_editTextSelector, trackingNumber);
           await clickButtonInContainer("BUSCAR");
           assertElementVisibleAndExists(_warningItemtSelector, 10000);
        });  
 });


//  const TrackingPage = require('../../pageObjects/tracking.page'); 
//  const TestDataManager = require('../../utils/testDataManager'); 

//  const { scrollToText, FakeScan, waitForElementToBeVisible, assertElementVisibleAndExists } = require('../../utils/uiHelpers'); 

//  _itemLabelSelector = 'android=new UiSelector().text("Item:")'; 
//  _viewGroupSelector = 'android=new UiSelector().className("android.view.ViewGroup").instance(11)'; 
//  const trackingData = TestDataManager.getTrackingData(); 

//  describe('Tracking ventanilla', () => { 
//      const { trackingNumber, scanCode } = trackingData.validItem; 
    
//      it('Flujo de Tracking ventanilla', async () => { 
//          await scrollToText("Tracking de ventanilla"); 
//          await browser.pause(1500);  
//          await TrackingPage.iniciarFlujoTracking(trackingNumber); 
//          FakeScan(scanCode); 
//          await waitForElementToBeVisible(_itemLabelSelector, 10000); 
//          FakeScan(scanCode); 
//          assertElementVisibleAndExists(_viewGroupSelector, 10000); 
//          await waitForElementToBeVisible(_itemLabelSelector, 10000); 
//          FakeScan(scanCode); 
//          await TrackingPage.continuarYSalir(); 
//      });
//  });