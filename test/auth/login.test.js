// test/auth/login.test.js
const LoginPage = require('../../pageObjects/login.page');
const TestDataManager = require('../../utils/testDataManager');

const {
  waitForErrorMessage,assertElementVisibleAndExists
} = require('../../utils/uiHelpers');

const _menuSelector = 'android=new UiSelector().text("Menú")';
const loginData = TestDataManager.getLoginData();

describe('Flujos de inicio de sesión Leonidas', () => {
     console.log('🧪 testDataManager:', require('../../utils/testDataManager'));


  it('Login incorrecto', async () => {
    const { username, password } = loginData.invalidUser;

    await LoginPage.enterUsername(username);
    await LoginPage.enterPassword(password);
    await LoginPage.clickLogin();

    await waitForErrorMessage(LoginPage._errorMessageSelector); 
    const text = await LoginPage.getErrorMessageText();
    console.log("Mensaje de error recibido: " + text);
    expect(text).toBe(LoginPage.expectedErrorMessage); // Compara contra el mensaje esperado
  });

  it('Login correcto', async () => {
    const { username, password } = loginData.validUser;

    await LoginPage.enterUsername(username);
    await LoginPage.enterPassword(password);
    await LoginPage.clickLogin();

    await assertElementVisibleAndExists(_menuSelector, 10000);
  });
});
