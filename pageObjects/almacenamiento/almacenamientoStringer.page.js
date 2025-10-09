 const {
     clickButtonInContainer,
     clickElementByText,
     scrollToText,
     waitForElementToBeVisible,
     waitForScanResult,
     waitForScanDataToBePresent,
     waitForScanResultOrFail,
     backUntilElementFound,
     FakeScan2
 } = require('../../utils/uiHelpers');

class AlmacenamientoStringer{

    _almacenamientoSelector = 'android=new UiSelector().text("Almacenamiento")';
    _almacenarSelector = 'android=new UiSelector().text("Almacenar")';
    _lblTipoAlmacenar = 'android=new UiSelector().text("Tipo de almacenamiento")';
    _lblStringer = 'android= new UiSelector().text("Almacenamiento stringer")';
    _lblUbicacionActualValor = '//android.widget.TextView[@text="Ubicación actual:"]/following-sibling::android.widget.TextView[1]';
    _lblNumeroParteValor = '//android.widget.TextView[@text="Número de parte:"]/following-sibling::android.widget.TextView[1]';
    _lblRANValor = '//android.widget.TextView[@text="RAN:"]/following-sibling::android.widget.TextView[1]';
    _lblDescripcionValor = '//android.widget.TextView[@text="Descripción:"]/following-sibling::android.widget.TextView[1]';
    _moduloAlmacen= 'android=new UiSelector().text("Almacén")'
    _lblFailRAN = 'android= new UiSelector().text("El ran leido no se encontró.")';
    _lblFaillocation = 'android= new UiSelector().textContains("La ubicación no concuerda.")';
    _lblPasslocation = 'android= new UiSelector().textContains("Se alamacenó el RAN:")';
    _msgWarninglocation = 'android=new UiSelector().resourceId("android:id/message")';
    _txtPasslocation="Se alamacenó el RAN:";
    _txtFaillocation="La ubicación no concuerda.";
    
    async stringer(qr, location) {
         await this.goToStringer();

         await FakeScan2(qr);
         
        // Aquí
        const datosCompletos = await waitForScanResultOrFail({
            selectors: [
                this._lblUbicacionActualValor,
                this._lblNumeroParteValor,
                this._lblRANValor,
                this._lblDescripcionValor
            ],
            selectorFail: this._lblFailRAN  // o el mensaje tipo "RAN no encontrado"
        });

        if (!datosCompletos) {
            console.warn("❌ El ran leido no se encontró.");
            
            return {
                success: false,
                reason: 'El ran leido no se encontró.',
                message: 'El ran leido no se encontró.'
            };
        }
        
        await FakeScan2(location);
         
        const Scanlocation = await waitForScanResult({
            selectorOK: this._lblPasslocation,
            toastTextOK: this._txtPasslocation,
            selectorNG: this._lblFaillocation,
            toastTextNG: this._txtFaillocation});  //Detecta "OK" o "NG"

           if (Scanlocation.result === 'NG') {
               await backUntilElementFound(this._moduloAlmacen);
               return { success: false, reason: 'Ubicacion no coincide con la ubicacion siguiente' };
             
           }else{
                return { success: true, reason: 'Se alamacenó el RAN:' };
           }

     }


    async goToStringer() {
        const isAlreadyOnScreen = await $(this._lblStringer).isDisplayed().catch(() => false);
        if (isAlreadyOnScreen) {
            console.log('📍 Ya estás en la pantalla de Almacenamiento Stringer');
            return;
        }

        console.log('🚦 Navegando a la pantalla de Almacenamiento Stringer...');
        await clickElementByText('Almacén');
        await waitForElementToBeVisible(this._almacenamientoSelector);
        await clickButtonInContainer('Almacenamiento');
        await waitForElementToBeVisible(this._almacenarSelector);
        await clickButtonInContainer('Almacenar');
        await waitForElementToBeVisible(this._lblTipoAlmacenar);
        await scrollToText('Almacenamiento stringer');
        await waitForElementToBeVisible(this._lblStringer);
    }
}

module.exports = new AlmacenamientoStringer();


