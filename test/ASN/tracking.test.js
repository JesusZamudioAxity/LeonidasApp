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
    
    for (const { trackingNumber, scanCode } of trackingData.validItem) {
     it(`Flujo de Tracking ventanilla para tracking #${trackingNumber}`, async () => {
          await scrollToText("Tracking de ventanilla");
          await browser.pause(1500);

          await TrackingPage.iniciarFlujoTracking(trackingNumber);

          await FakeScan(scanCode);
          await waitForElementToBeVisible(_itemLabelSelector, 10000);

          await FakeScan(scanCode);
          assertElementVisibleAndExists(_viewGroupSelector, 10000);
          
          await waitForElementToBeVisible(_itemLabelSelector, 10000);
          await FakeScan(scanCode);
          

          await TrackingPage.continuarYSalir();
      });
    }


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
