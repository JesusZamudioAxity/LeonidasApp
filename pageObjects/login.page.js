// pageObjects/login.page.js
class LoginPage {
  // Selectores
  _usernameSelector = 'android=new UiSelector().className("android.widget.EditText").instance(0)';
  _passwordSelector = 'android=new UiSelector().className("android.widget.EditText").instance(1)';
  _loginButtonSelector = 'android=new UiSelector().className("android.widget.Button").text("INICIAR SESIÓN")';
  _errorMessageSelector = 'android=new UiSelector().text("La contraseña o el usuario ingresado son incorrectos. Por favor, verifica e intenta de nuevo.")';

  // Mensaje esperado (para evitar hardcodear en los tests)
  expectedErrorMessage = 'La contraseña o el usuario ingresado son incorrectos. Por favor, verifica e intenta de nuevo.';

  get usernameField() { return $(this._usernameSelector); }
  get passwordField() { return $(this._passwordSelector); }
  get loginButton() { return $(this._loginButtonSelector); }
  get errorMessage() { return $(this._errorMessageSelector); }

  async enterUsername(username) {
    await this.usernameField.setValue(username);
  }

  async enterPassword(password) {
    await this.passwordField.setValue(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async isErrorMessageDisplayed() {
    return await this.errorMessage.isDisplayed();
  }

  async getErrorMessageText() {
    return await this.errorMessage.getText();
  }
}

module.exports = new LoginPage();
