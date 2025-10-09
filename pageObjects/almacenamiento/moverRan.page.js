 const {
     clickButtonInContainer,
     clickElementByText,
     scrollToText,
     waitForElementToBeVisible,
     FakeScan,
     waitForScanResult,
 } = require('../../utils/uiHelpers');

class AlmacenamientoRAN{

    _almacenamientoSelector = 'android=new UiSelector().text("Almacenamiento")';
    _almacenarSelector = 'android=new UiSelector().text("Almacenar")';
    _lblTipoAlmacenar = 'android=new UiSelector().text("Tipo de almacenamiento")';
    _lblMoverRan = 'android=new UiSelector().text("Mover RAN")';
    _msgRANOK = 'android=new UiSelector().text("OK")';
    _msgRANNG = 'android=new UiSelector().text("NG")';
    _txtRANPass="Ran encontrado";
    _txtRANFail="El ran leido no se encontró";
    _mensajeDialogo = 'android=new UiSelector().resourceId("android:id/message")';

    async waitForSuccessOrDialog({ toastText = "Se movió el RAN", timeout = 10000, interval = 500 } = {}) {
        const attempts = Math.ceil(timeout / interval);

        for (let i = 0; i < attempts; i++) {
            const pageSource = await driver.getPageSource();

            // Detectar toast
            if (toastText && pageSource.includes(toastText)) {
                console.log(`✅ Toast con texto "${toastText}" detectado.`);
                return { type: 'toast' };
            }

            // Detectar diálogo
            const dialog = await $(this._mensajeDialogo);
            const isDialogVisible = await dialog.isDisplayed().catch(() => false);

            if (isDialogVisible) {
                const mensaje = await dialog.getText();
                console.log(`📩 Mensaje de diálogo: "${mensaje}"`);
                await clickButtonInContainer("Aceptar");
                return { type: 'dialog', message: mensaje };
            }

            await driver.pause(interval);
        }

        throw new Error(`❌ Ni toast "${toastText}" ni diálogo fueron detectados después de ${timeout}ms.`);
    }

    async moverRAN(qr, location) {
        await this.goToMoverRANScreen();

        await FakeScan(qr);
        const result = await waitForScanResult({ 
            selectorOK: this._msgRANOK,
            toastTextOK: this._txtRANPass,
            selectorNG: this._msgRANNG,
            toastTextNG: this._txtRANFail}); // Detecta "OK" o "NG"

        if (result.result === 'NG') {
            const message = "El ran leído no se encontró";
            console.warn(`❌ ${message}`);
            return { success: false, message };
        }

        await FakeScan(location);

        const resultAfterMove = await this.waitForSuccessOrDialog();

        if (resultAfterMove.type === 'toast') {
            const message = "Se movió el RAN";
            console.log(`✅ ${message}`);
            return { success: true, message };
        }

        if (resultAfterMove.type === 'dialog') {
            const message = resultAfterMove.message;
            console.warn(`❌ ${message}`);
            return { success: false, message };
        }

        const message = 'Resultado desconocido';
        return { success: false, reason: 'Desconocido', message };
    }


    async goToMoverRANScreen() {
        const isAlreadyOnScreen = await $(this._lblMoverRan).isDisplayed().catch(() => false);
        if (isAlreadyOnScreen) {
            console.log('📍 Ya estás en la pantalla de Mover RAN');
            return;
        }

        console.log('🚦 Navegando a la pantalla de Mover RAN...');
        await clickElementByText('Almacén');
        await waitForElementToBeVisible(this._almacenamientoSelector);
        await clickButtonInContainer('Almacenamiento');
        await waitForElementToBeVisible(this._almacenarSelector);
        await clickButtonInContainer('Almacenar');
        await waitForElementToBeVisible(this._lblTipoAlmacenar);
        await scrollToText('Mover RAN');
        await waitForElementToBeVisible(this._lblMoverRan);
    }
}

module.exports = new AlmacenamientoRAN();