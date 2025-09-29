 const {
     clickButtonInContainer,
     clickElementByText,
     scrollToText,
     waitForElementToBeVisible,
     waitForScanResult,
     waitForScanResultwarning,
     FakeScan,
     backUntilElementFound,
     waitForElementAndReturnFlag
 } = require('../../utils/uiHelpers');

class AlmacenamientoMixed{

    _almacenamientoSelector = 'android=new UiSelector().text("Almacenamiento")';
    _almacenarSelector = 'android=new UiSelector().text("Almacenar")';
    _lblTipoAlmacenar = 'android=new UiSelector().text("Tipo de almacenamiento")';
    _lblMiexd = 'android= new UiSelector().text("Almacenar mixed")';
    _moduloAlmacen= 'android=new UiSelector().text("Almacén")'
    _resulbusqueda = 'android=new UiSelector().className("android.view.ViewGroup").instance(13)';
    _lblHistorialOpe= 'android= new UiSelector().text("Historial de operación")';
    _lblHisorialOpe= 'android= new UiSelector().text("Hisorial de operación")';
    _btnEscanarUbi= 'android=new UiSelector().text("Escanear ubicación")';

    _msgWarninglocation = 'android=new UiSelector().resourceId("android:id/message")';
    _txtPasslocation="Se almacenó mixed correctamente.";
    _txtFaillocation="Ocurrió un error al almacenar";
     async mixed(qr, location) {
         await this.goToMixed();

         await FakeScan(qr);


        const existeElemento = await waitForElementAndReturnFlag(this._resulbusqueda);

        if (!existeElemento) {

            console.log('❌ No existe el RAN');
            const btnBuscar = await backUntilElementFound(this._moduloAlmacen);
            return {
                success: false,
                reason: 'Elemento no encontrado',
            };
        }
           console.log('✅ El elemento está visible.');
            await waitForElementToBeVisible(this._btnEscanarUbi);
           // await $(this._btnEscanarUbi).click();
             await clickButtonInContainer('Escanear ubicación');



        await waitForElementToBeVisible(this._lblHisorialOpe);
        await FakeScan(location);
         
        const Scanlocation = await waitForScanResultwarning({
            messageSelector: this._msgWarninglocation,
            expectedOKText: this._txtPasslocation,
            expectedNGText: this._txtFaillocation,
            checkToasts: false});  //Detecta "OK" o "NG"

          if (Scanlocation.result === 'NG') {
              const message = "La ubicación no es la correcta";
              console.warn(`❌ ${message}`);
              await clickButtonInContainer('Aceptar');
              const btnBuscar = await backUntilElementFound(this._moduloAlmacen);
              return { success: false, reason: 'Ubicacion no coincide con la ubicacion siguiente', message };
             
          }else{
            await clickButtonInContainer('Aceptar');
            return { success: true, reason: 'Se almacenó mixed correctamente.' };
          }

         

     }


    async goToMixed() {
        const isAlreadyOnScreen = await $(this._lblMiexd).isDisplayed().catch(() => false);
        if (isAlreadyOnScreen) {
            console.log('📍 Ya estás en la pantalla de Almacenamiento mixed');
            return;
        }

        console.log('🚦 Navegando a la pantalla de Almacenamiento mixed...');
        await clickElementByText('Almacén');
        await waitForElementToBeVisible(this._almacenamientoSelector);
        await clickButtonInContainer('Almacenamiento');
        await waitForElementToBeVisible(this._almacenarSelector);
        await clickButtonInContainer('Almacenar');
        await waitForElementToBeVisible(this._lblTipoAlmacenar);
        await scrollToText('Mixed');
        await waitForElementToBeVisible(this._lblMiexd);
    }
}

module.exports = new AlmacenamientoMixed();


