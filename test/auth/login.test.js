// test/auth/login.test.js
const LoginPage = require('../../pageObjects/login.page');
const TestDataManager = require('../../utils/testDataManager');
const { startVideoRecording, stopVideoRecordingAndSave, waitForErrorMessage, assertElementVisibleAndExists } = require('../../utils/uiHelpers');

const _menuSelector = 'android=new UiSelector().text("Menú")';
const loginData = TestDataManager.getLoginData();

describe('🔐 Flujos de inicio de sesión Leonidas', () => {

  it('❌ Login incorrecto', async () => {
    const videoName = 'Login_Incorrecto';
    await startVideoRecording(); // ⬅️ INICIO VIDEO

    try {
      const { username, password } = loginData.invalidUser;

      await LoginPage.enterUsername(username);
      await LoginPage.enterPassword(password);
      await LoginPage.clickLogin();

      await waitForErrorMessage(LoginPage._errorMessageSelector);
      const text = await LoginPage.getErrorMessageText();
      console.log("Mensaje de error recibido: " + text);
      expect(text).toBe(LoginPage.expectedErrorMessage);
    } finally {
      await stopVideoRecordingAndSave(videoName); // ⬅️ FIN VIDEO
    }
  });

  it('✅ Login correcto', async () => {
    const videoName = 'Login_Correcto';
    await startVideoRecording(); // ⬅️ INICIO VIDEO

    try {
      const { username, password } = loginData.validUser;

      await LoginPage.enterUsername(username);
      await LoginPage.enterPassword(password);
      await LoginPage.clickLogin();

      await assertElementVisibleAndExists(_menuSelector, 10000);
    } finally {
      await stopVideoRecordingAndSave(videoName); // ⬅️ FIN VIDEO
    }
  });
});
