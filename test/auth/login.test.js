const LoginPage = require('../../pageObjects/login.page');
const {
   waitForErrorMessage,
   waitForElementToBeVisible
} = require('../../utils/uiHelpers');
 _errorMessageSelector = 'android=new UiSelector().text("La contraseña o el usuario ingresado son incorrectos. Por favor, verifica e intenta de nuevo.")';
 _menuSelector = 'android=new UiSelector().text("Menú")';

describe('Flujos de inicio de sesión Leonidas', () => {
      it('Login incorrecto', async () => {
        await LoginPage.enterUsername('admin');
        await LoginPage.enterPassword('admin');
        await LoginPage.clickLogin();
        await browser.pause(7000); // Solo para observar
        await waitForErrorMessage(_errorMessageSelector); // ⬅️ AQUÍ va la espera
        const text = await LoginPage.getErrorMessageText();
        console.log("Esto es text" + text);
        expect(text).toBe('La contraseña o el usuario ingresado son incorrectos. Por favor, verifica e intenta de nuevo.');
    });


    it('Login', async () => {
         await LoginPage.enterUsername('admin');
         await LoginPage.enterPassword('admin-qa');
         await LoginPage.clickLogin();
         await waitForElementToBeVisible(_menuSelector, 10000);
         const menu = await $(_menuSelector);
         await expect(menu).toBeDisplayed();  // ✔️ Verifica que esté visible
         await expect(menu).toExist();        // ✔️ Verifica que exista en el DOM

     });



});
