 const {
     clickButtonInContainer,
     clickElementByText,
     scrollToText,
     waitForElementToBeVisible,
     assertElementVisibleAndExists,
     waitForScanResult,
     FakeScan,
     backUntilElementFound
 } = require('../../utils/uiHelpers');

class AlmacenamientoCritico{

    _almacenamientoSelector = 'android=new UiSelector().text("Almacenamiento")';
    _almacenarSelector = 'android=new UiSelector().text("Almacenar")';
    _lblTipoAlmacenar = 'android=new UiSelector().text("Tipo de almacenamiento")';
    _lblAlmCritico = 'android=new UiSelector().text("ALMACENAMIENTO CRITICO")';
    _btnBuscar= 'android=new UiSelector().text("BUSCAR")'
    _lblRAN= 'android = new UiSelector().text("RAN")';
    _msgRANOK = 'android=new UiSelector().text("OK")';
    _msgRANNG = 'android=new UiSelector().text("NG")';
    _msgRanCorrecto= 'android=new UiSelector().textContains("Lectura correcta")';
    _msgRANIncorrecto = 'android=new UiSelector().textContains("No hay registros que coincidan con la búsqueda.")';
    _lblUbicacionParcial = 'android=new UiSelector().textStartsWith("Próxima ubicación:")';
    _txtCorrecta = "Lectura correcta";
    _txtNoRegistros="No hay registros que coincidan con la búsqueda.";
    _txtlocationPass="Se almacenó el RAN:";
    _txtlocationFail="La ubicación leida no coincide con la ubicación siguiente";

     async critico(qr, location) {
         await this.goToCritico();

         await FakeScan(qr);

        const ScanQR = await waitForScanResult({
            selectorOK: this._msgRANOK,
            toastTextOK: this._txtCorrecta,
            selectorNG: this._msgRANIncorrecto,
            toastTextNG: this._txtNoRegistros});  //Detecta "OK" o "NG"

          if (ScanQR.result === 'NG') {
              return { success: false, reason: 'No hay registros que coincidan con la búsqueda.'};
          }
        await assertElementVisibleAndExists(this._lblUbicacionParcial);

        await FakeScan(location);

         const Scanlocation = await waitForScanResult({
            selectorOK: this._msgRANOK,
            toastTextOK: this._txtlocationPass,
            selectorNG: this._msgRANNG,
            toastTextNG: this._txtlocationFail});  //Detecta "OK" o "NG"

       console.log(Scanlocation);

        await backUntilElementFound(this._btnBuscar);

         if (Scanlocation.result === 'NG') {
              return { success: false, reason: 'La ubicación leida no coincide con la ubicación siguiente' };
             
          }else{
            return { success: true, reason: 'Se almacenó el RAN:' };
          }

     }


    async goToCritico() {
        const isAlreadyOnScreen = await $(this._lblAlmCritico).isDisplayed().catch(() => false);
        if (isAlreadyOnScreen) {
            console.log('📍 Ya estás en la pantalla de Almacenamiento critico');
            return;
        }

        console.log('🚦 Navegando a la pantalla de Almacenamiento critico...');
        await clickElementByText('Almacén');
        await waitForElementToBeVisible(this._almacenamientoSelector);
        await clickButtonInContainer('Almacenamiento');
        await waitForElementToBeVisible(this._almacenarSelector);
        await clickButtonInContainer('Almacenar');
        await waitForElementToBeVisible(this._lblTipoAlmacenar);
        await scrollToText('Almacenamiento Crítico');
        await waitForElementToBeVisible(this._lblAlmCritico);
    }
}

module.exports = new AlmacenamientoCritico();


