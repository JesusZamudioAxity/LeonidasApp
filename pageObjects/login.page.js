class LoginPage {
   get usernameField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    get passwordField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    get loginButton() {
        return $('android=new UiSelector().className("android.widget.Button").text("INICIAR SESIÓN")');
    }

    async enterUsername(username) {
        await this.usernameField.setValue(username);
    }

    async enterPassword(password) {
        await this.passwordField.setValue(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();
