// utils/sessionManager.js
const LoginPage = require('../pageObjects/login.page');
const TestDataManager = require('./testDataManager');

const _menuSelector = 'android=new UiSelector().text("Menú")';
const _usernameSelector = 'android=new UiSelector().className("android.widget.EditText").instance(0)';
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
     // Espera o el menú o el input de usuario
    await Promise.race([
      $(_menuSelector).waitForDisplayed({ timeout: 10000 }),
      $(_usernameSelector).waitForDisplayed({ timeout: 10000 })
    ]);
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

    console.log('Haciendo login...');
     await LoginPage.waitForUsernameField();
    await LoginPage.enterUsername(username);
    await LoginPage.enterPassword(password);
    await LoginPage.clickLogin();

    await $(_menuSelector).waitForDisplayed({ timeout: 10000 });
    console.log('Login completado.');
  } else {
    console.log('No hace falta login.');
  }
}

module.exports = {
  restartApp,
  loginIfNeeded
};
