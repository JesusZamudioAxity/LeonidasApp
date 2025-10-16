 const {
     clickButtonInContainer,
     clickElementByText,
     scrollToText,
     waitForElementToBeVisible,
     waitForScanResultOrFail,
     waitForScanResult,
     FakeScan,
     backUntilElementFound
 } = require('../../utils/uiHelpers');

class AlmacenamientoMasivo{

    _almacenamientoSelector = 'android=new UiSelector().text("Almacenamiento")';
    _almacenarSelector = 'android=new UiSelector().text("Almacenar")';
    _lblTipoAlmacenar = 'android=new UiSelector().text("Tipo de almacenamiento")';
    _lblmasivo= 'android=new UiSelector().text("Almacenamiento masivo")';
    _lblRANLeido = '//android.widget.TextView[contains(@text, "RANES")]/following-sibling::android.widget.TextView[1]';
    _lblRANubicacion = '//android.widget.TextView[contains(@text, "Ubicación")]/following-sibling::android.widget.TextView[1]';
    _lblFailRAN = 'android= new UiSelector().textContains("No se encontró el ran.")';
    _selectRAN= 'android = new UiSelector().className("android.widget.FrameLayout").instance(6)';
     _btnalmacenar = '//android.widget.Button[@text="ALMACENAR"]';
    _lblubicacion='//android.widget.TextView[@text="UBICACIÓN"]';
    _moduloAlmacen= 'android=new UiSelector().text("Almacén")'

    _msgRANOK = 'android=new UiSelector().text("OK")';
    _msgRANNG = 'android=new UiSelector().text("NG")';
    _txtPasslocation="Se almacenaron";
    _txtFaillocation="La ubicación no coincide con la esperada.";
    	


     async masivo(qr, location) {
         await this.goToMasivo();

         await FakeScan(qr);


         const datosCompletos =  await waitForScanResultOrFail({
            selectors: [
                this._lblRANLeido,
                this._lblRANubicacion
            ],
            selectorFail: this._lblFailRAN  // o el mensaje tipo "RAN no encontrado"
        }); 

        if (!datosCompletos) {
            await backUntilElementFound(this._moduloAlmacen);
             return { success: false, reason: 'No se encontró el ran.' };
        }
        await $(this._lblRANLeido).click();
         await waitForElementToBeVisible(this._btnalmacenar);
        await clickButtonInContainer('ALMACENAR')

         await waitForElementToBeVisible(this._lblubicacion);

        await FakeScan(location);
         
        const Scanlocation = await waitForScanResult({
            selectorOK: this._msgRANOK,
            toastTextOK: this._txtPasslocation,
            selectorNG: this._msgRANNG,
            toastTextNG: this._txtFaillocation,
            checkToasts: true});  //Detecta "OK" o "NG"

        if (Scanlocation.result === 'NG') {
            await backUntilElementFound(this._moduloAlmacen);
            return { success: false, reason: this._txtFaillocation };
            
        }else{
            return { success: true, reason: this._txtPasslocation };
        } 
     }


    async goToMasivo() {
        const isAlreadyOnScreen = await $(this._btnBuscar).isDisplayed().catch(() => false);
        if (isAlreadyOnScreen) {
            console.log('📍 Ya estás en la pantalla de Almacenamiento masivo');
            return;
        }

        console.log('🚦 Navegando a la pantalla de Almacenamiento masivo...');
        await clickElementByText('Almacén');
        await waitForElementToBeVisible(this._almacenamientoSelector);
        await clickButtonInContainer('Almacenamiento');
        await waitForElementToBeVisible(this._almacenarSelector);
        await clickButtonInContainer('Almacenar');
        await waitForElementToBeVisible(this._lblTipoAlmacenar);
        await scrollToText('Almacenamiento Masivo');
        await waitForElementToBeVisible(this._lblmasivo);
    }
}

module.exports = new AlmacenamientoMasivo();


