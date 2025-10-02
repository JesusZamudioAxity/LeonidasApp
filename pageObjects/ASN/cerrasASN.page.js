const {
     scrollToText,
     waitForElementToBeVisible,
     FakeScan, 
     clickButtonInContainer,
     extractLabelValues
} = require('../../utils/uiHelpers');

class CerrarASNPage{
    _asnConfirmationSelector = 'android=new UiSelector().text("Confirmación ASN")';
    _confirmacionOperacionSelector = 'android=new UiSelector().text("Confirmación de operación")';
    _cancelButtonSelector = 'android=new UiSelector().resourceId("android:id/button2")';
    _cerrarAsnButtonSelector = 'android=new UiSelector().text("Cerrar ASN")';

    async confirmarASN (scanCode){
        await scrollToText("Confirmación de ASN");      
        await browser.pause(1500); // Solo para observar
        await waitForElementToBeVisible(this._asnConfirmationSelector, 10000);
        await FakeScan(scanCode);
        await waitForElementToBeVisible( this._confirmacionOperacionSelector, 10000);
        await extractLabelValues();
        await FakeScan(scanCode);
        await waitForElementToBeVisible( this._cerrarAsnButtonSelector, 10000);
        await clickButtonInContainer("Cerrar ASN");
        await waitForElementToBeVisible('Confirmación de ASN', 10000);
    }
}

module.exports = new CerrarASNPage();