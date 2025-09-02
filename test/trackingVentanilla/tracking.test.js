 const LoginPage = require('../../pageObjects/login.page');
 const {
     clickButtonInContainer,
     listButtonTextsInContainer,
     enterText,
     scrollToText,
     waitForElementToBeVisible
 } = require('../../utils/uiHelpers');

_menuSelector = 'android=new UiSelector().text("Menú")';
_editTextSelector = 'android=new UiSelector().className("android.widget.EditText").instance(0)';
buscarButtonSelector = 'android=new UiSelector().text("BUSCAR")';

 describe('acciones en pantalla', () => {

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
        //  await driver.back();

      });

      it('Clic en botón "Tracking"', async () => {
          await scrollToText("Tracking de ventanilla");      
          await browser.pause(1500);  //Solo para observar
          await clickButtonInContainer("Tracking de ventanilla");
          await browser.pause(1500); // Solo para observar
          await enterText(_editTextSelector, '1'); // Número de tracking
           await clickButtonInContainer("BUSCAR");
        
     });
 });
