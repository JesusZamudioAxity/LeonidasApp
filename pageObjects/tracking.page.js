// pageObjects/tracking.page.js
const {
  clickButtonInContainer,
  enterText,
  waitForElementToBeVisible,
  FakeScan,
  assertElementVisibleAndExists,
} = require('../utils/uiHelpers');

class TrackingPage {
  _editTextSelector = 'android=new UiSelector().className("android.widget.EditText").instance(0)';
  _itemLabelSelector = 'android=new UiSelector().text("Item:")';
  _viewGroupSelector = 'android=new UiSelector().className("android.view.ViewGroup").instance(11)';
  _siguienteButtonSelector = 'android=new UiSelector().text("SIGUIENTE")';
  _regresarAlMenuSelector = 'android=new UiSelector().text("REGRESAR AL MENÚ")';

  async iniciarFlujoTracking(trackingNumber) {
    await clickButtonInContainer("Tracking de ventanilla");
    await browser.pause(1500); // Solo para observar
    await enterText(this._editTextSelector, trackingNumber);
    await clickButtonInContainer("BUSCAR");
    await waitForElementToBeVisible(this._itemLabelSelector, 10000);
  }

  async realizarEscaneos(codigo) {
     FakeScan(codigo);
     console.log("paaso el primer face")
     await waitForElementToBeVisible(this._itemLabelSelector, 10000);
      console.log("paaso el 1 espera")
     FakeScan(codigo); 
      console.log("paaso el 2 face")
     assertElementVisibleAndExists(this._viewGroupSelector, 10000);
     await waitForElementToBeVisible(this._itemLabelSelector, 10000);
     FakeScan(codigo);
      console.log("paaso el 3 face")
  }

  async verificarGrupoVisible() {
    await assertElementVisibleAndExists(this._viewGroupSelector, 10000);
  }

  async continuarYSalir() {
    await assertElementVisibleAndExists(this._siguienteButtonSelector, 10000);
    await clickButtonInContainer("SIGUIENTE");
    await waitForElementToBeVisible(this._regresarAlMenuSelector, 10000);
    await clickButtonInContainer("REGRESAR AL MENÚ");
  }
}

module.exports = new TrackingPage();
