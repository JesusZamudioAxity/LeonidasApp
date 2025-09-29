 const {
     clickButtonInContainer,
     clickElementByText,
     scrollToText,
     waitForElementToBeVisible,
     waitForScanResult,
     waitForScanResultwarning,
     FakeScan,
     backUntilElementFound
 } = require('../../utils/uiHelpers');

class AlmacenamientoNormal{

    _almacenamientoSelector = 'android=new UiSelector().text("Almacenamiento")';
    _almacenarSelector = 'android=new UiSelector().text("Almacenar")';
    _lblTipoAlmacenar = 'android=new UiSelector().text("Tipo de almacenamiento")';
    _btnBuscar= 'android=new UiSelector().text("BUSCAR")'
   
    _lblRANNG='android=new UiSelector().text("No se encontrarón resultados.")';
    _lblHistorialOpe= 'android= new UiSelector().text("Historial de operación")';
    _boxRAN = 'android=new UiSelector().className("android.view.ViewGroup").instance(11)';
    _msgWarninglocation = 'android=new UiSelector().resourceId("android:id/message")';
    _txtPasslocation="Se almacenaron los ranes.";
    _txtFaillocation="La ubicación leida no coincide con la ubicación siguiente";

     async normal(qr, location) {
         await this.goToNormal();

         await FakeScan(qr);


        const ScanQR = await waitForScanResult({
            selectorOK: this._lblHistorialOpe,
            selectorNG: this._lblRANNG,
            checkToasts: false});  //Detecta "OK" o "NG"

          if (ScanQR.result === 'NG') {
              return { success: false, reason: 'No se encontrarón resultados.', message };
             
          }
        await FakeScan(location);
         
        const Scanlocation = await waitForScanResultwarning({
            messageSelector: this._msgWarninglocation,
            expectedOKText: this._txtPasslocation,
            expectedNGText: this._txtFaillocation,
            checkToasts: false});  //Detecta "OK" o "NG"

          if (Scanlocation.result === 'NG') {
              await clickButtonInContainer('Aceptar');
              const btnBuscar = await backUntilElementFound(this._btnBuscar);
              return { success: false, reason: 'Ubicacion no coincide con la ubicacion siguiente' };
             
          }else{
            await clickButtonInContainer('Aceptar');
             return { success: true, reason: 'Se almacenaron los ranes.' };
          } 
     }


    async goToNormal() {
        const isAlreadyOnScreen = await $(this._btnBuscar).isDisplayed().catch(() => false);
        if (isAlreadyOnScreen) {
            console.log('📍 Ya estás en la pantalla de Almacenamiento normal');
            return;
        }

        console.log('🚦 Navegando a la pantalla de Almacenamiento normal...');
        await clickElementByText('Almacén');
        await waitForElementToBeVisible(this._almacenamientoSelector);
        await clickButtonInContainer('Almacenamiento');
        await waitForElementToBeVisible(this._almacenarSelector);
        await clickButtonInContainer('Almacenar');
        await waitForElementToBeVisible(this._lblTipoAlmacenar);
        await scrollToText('Normal');
        await waitForElementToBeVisible(this._btnBuscar);
    }
}

module.exports = new AlmacenamientoNormal();


