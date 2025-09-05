 const LoginPage = require('../../pageObjects/login.page');
 const {
     clickButtonInContainer,
     clickElementByText,
     enterText,
     scrollToText,
     waitForElementToBeVisible,
     FakeScan,
     assertElementVisibleAndExists
 } = require('../../utils/uiHelpers');

_menuSelector = 'android=new UiSelector().text("Menú")';
_editTextSelector = 'android=new UiSelector().className("android.widget.EditText").instance(0)';
_buscarButtonSelector = 'android=new UiSelector().text("BUSCAR")';
_moreOptionsSelector = 'android=new UiSelector().description("More options")';
_itemLabelSelector = 'android=new UiSelector().text("Item:")';
_scannerSelector = 'android=new UiSelector().resourceId("com.ndzl.emdkmaui:id/title").text("SCANNER")';
_editTextSelector = 'android=new UiSelector().className("android.widget.EditText")';
_fakeScanSelector = 'android=new UiSelector().text("Fake Scan")';
_viewGroupSelector = 'android=new UiSelector().className("android.view.ViewGroup").instance(11)';
_siguienteButtonSelector = 'android=new UiSelector().text("SIGUIENTE")';
_regresarAlMenuSelector = 'android=new UiSelector().text("REGRESAR AL MENÚ")';




 describe('test', () => {

//  beforeEach(async () => {
//     console.log(await driver.getCurrentPackage());
//   await driver.closeApp();
//   await driver.launchApp();
//  });
      it('Debería hacer login', async () => {
               await LoginPage.enterUsername('admin');
               await LoginPage.enterPassword('admin-qa');
               await LoginPage.clickLogin();
               await browser.pause(3000); // Solo para observar
               await waitForElementToBeVisible(_menuSelector, 10000);
           });
    
       it('Listar todos los botones', async () => {
           const botones = await listButtonTextsInContainer();
           console.log("Botones encontrados:", botones);
       });

        it('Buscar Elemento', async () => {
            await scrollToText("Acerca de");
            await browser.pause(1500);  //Solo para observar
            await driver.back();
            await browser.pause(1500);
        });

      it('Flujo de Tracking ventanilla', async () => {
          await scrollToText("Tracking de ventanilla");      
          await browser.pause(1500);  //Solo para observar
          await clickButtonInContainer("Tracking de ventanilla");
          await browser.pause(1500); // Solo para observar
          await enterText(_editTextSelector, '11'); // Número de tracking
          await clickButtonInContainer("BUSCAR");

          await waitForElementToBeVisible(_itemLabelSelector, 10000);
          FakeScan('[>|p65715el000|q100|v003435|s13659806|ar0309219|<]');

          await waitForElementToBeVisible(_itemLabelSelector, 10000);
          FakeScan('[>|p65715el000|q100|v003435|s13659806|ar0309219|<]');
          
          assertElementVisibleAndExists(_viewGroupSelector, 10000);

          await waitForElementToBeVisible(_itemLabelSelector, 10000);
          FakeScan('[>|p65715el000|q100|v003435|s13659806|ar0309219|<]');

          assertElementVisibleAndExists(_siguienteButtonSelector, 10000);

          await clickButtonInContainer("SIGUIENTE");
          await waitForElementToBeVisible(_regresarAlMenuSelector, 10000);
          await clickButtonInContainer("REGRESAR AL MENÚ");
     });
 });
