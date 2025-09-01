const LoginPage = require('../../pageObjects/login.page');
const {
   waitForErrorMessage
} = require('../../utils/uiHelpers');
 _errorMessageSelector = 'android=new UiSelector().text("La contraseña o el usuario ingresado son incorrectos. Por favor, verifica e intenta de nuevo.")';

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


    it('Debería hacer login', async () => {
         await LoginPage.enterUsername('admin');
         await LoginPage.enterPassword('admin-qa');
         await LoginPage.clickLogin();
         await browser.pause(3000); // Solo para observar
     });

});
