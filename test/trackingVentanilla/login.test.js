const LoginPage = require('../../pageObjects/login.page');
const {
    clickButtonInContainer,
    listButtonTextsInContainer,
    scrollToText
} = require('../../utils/uiHelpers');

describe('Flujo de login y acciones en pantalla', () => {
    it('Debería hacer login', async () => {
        await LoginPage.enterUsername('admin');
        await LoginPage.enterPassword('admin-qa');
        await LoginPage.clickLogin();
        await browser.pause(3000); // Solo para observar
    });

    it('Listar todos los botones', async () => {
        const botones = await listButtonTextsInContainer();
        console.log("Botones encontrados:", botones);
    });

    it('Buscar Elemento', async () => {
        await scrollToText("Acerca de");
    });

     it('Clic en botón "Rutas"', async () => {
         await scrollToText("Rutas");
        await clickButtonInContainer("Rutas");
    });

    it('Clic en botón "Rutas"', async () => {
         await scrollToText("Rutas");
        await clickButtonInContainer("Rutas");
    });



});
