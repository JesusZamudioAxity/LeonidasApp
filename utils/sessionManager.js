// utils/sessionManager.js
const LoginPage = require('../pageObjects/login.page');
const TestDataManager = require('./testDataManager');

const _menuSelector = 'android=new UiSelector().text("Menú")';
const appPackage = 'com.ndzl.emdkmaui';

/**
 * Reinicia la app sin borrar datos
 */
async function restartApp() {
  try {
    await driver.terminateApp(appPackage);
  } catch (e) {
    console.warn(`No se pudo terminar la app: ${e.message}`);
  }

  try {
    await driver.activateApp(appPackage);
    await $(_menuSelector).waitForDisplayed({ timeout: 10000 });
  } catch (e) {
    console.warn(`No se pudo reiniciar la app: ${e.message}`);
  }
}

/**
 * Hace login solo si no estamos ya logueados
 */
async function loginIfNeeded() {
  const isLoggedIn = await $(_menuSelector).isDisplayed().catch(() => false);
  if (!isLoggedIn) {
    const { username, password } = TestDataManager.getLoginData().validUser;

    await LoginPage.enterUsername(username);
    await LoginPage.enterPassword(password);
    await LoginPage.clickLogin();

    await $(_menuSelector).waitForDisplayed({ timeout: 10000 });
  }
}

module.exports = {
  restartApp,
  loginIfNeeded
};
