 const {
     clickButtonInContainer,
     clickElementByText,
     scrollToText,
     waitForElementToBeVisible,
     FakeScan,
     assertToastTextExists
 } = require('../../utils/uiHelpers');

class AlmacenamientoRAN{

    _almacenamientoSelector = 'android=new UiSelector().text("Almacenamiento")';
    _almacenarSelector = 'android=new UiSelector().text("Almacenar")';
    _lblTipoAlmacenar = 'android=new UiSelector().text("Tipo de almacenamiento")';
    _lblMoverRan = 'android=new UiSelector().text("Mover RAN")';
    _msgRANOK = 'android=new UiSelector().text("OK")';
    _msgRANNG = 'android=new UiSelector().text("NG")';
    _mensajeDialogo = 'android=new UiSelector().resourceId("android:id/message")';

async waitForScanResult({ timeout = 10000, interval = 500 } = {}) {
    const attempts = Math.ceil(timeout / interval);

    for (let i = 0; i < attempts; i++) {
        // Detecta el "OK"
        const okElement = await $(this._msgRANOK);
        const isOKVisible = await okElement.isDisplayed().catch(() => false);

        if (isOKVisible) {
            console.log('✅ RAN encontrado (OK)');
            await assertToastTextExists("Ran encontrado", 3000);
            return { result: 'OK' };
        }

        // Detecta el "NG"
        const ngElement = await $(this._msgRANNG);
        const isNGVisible = await ngElement.isDisplayed().catch(() => false);

        if (isNGVisible) {
            console.warn('❌ RAN no encontrado (NG)');
            await assertToastTextExists("El ran leido no se encontró", 3000);
            return { result: 'NG' };
        }

        await driver.pause(interval);
    }

    throw new Error("❌ No se detectó ni OK ni NG después del tiempo de espera.");
}




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
        
        // await waitForElementToBeVisible(this._msgRANOK);
        // await assertToastTextExists("Ran encontrado");

        //  await waitForElementToBeVisible(this._msgRANNG);
        // await assertToastTextExists("El ran leido no se encontró");
         const result = await this.waitForScanResult(); // Detecta "OK" o "NG"

        if (result.result === 'NG') {
            console.warn('⚠️ Terminando flujo: el RAN no se encontró.');
            return; // O podrías lanzar un error si deseas que falle el test
        }


        await FakeScan(location);

        await this.waitForSuccessOrDialog();
        console.log();

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




//  async moverRAN (qr, location){
//         await clickElementByText('Almacén');
//         await waitForElementToBeVisible(_almacenamientoSelector);
//         await clickButtonInContainer('Almacenamiento');
//         await waitForElementToBeVisible(_almacenarSelector);
//         await clickButtonInContainer('Almacenar');
//         await waitForElementToBeVisible(_lblTipoAlmacenar);
//         await scrollToText('Mover RAN')
         
//         await waitForElementToBeVisible(_lblMoverRan );
//         await FakeScan("[>|p65715el000|q20|v003435|s13659806|ar0509208|<]");
//         await waitForElementToBeVisible(_msgRANOK);
//         await assertToastTextExists("Ran encontrado");
//         await FakeScan("!l?ZI02H");
//         await assertToastTextExists("Se movió el RAN");       
//     }