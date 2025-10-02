// utils/uiHelpers.js
const _moreOptionsSelector = 'android=new UiSelector().description("More options")';
const _linkScanner='android=new UiSelector().text("SCANNER")';
const _scannerSelector = 'android=new UiSelector().resourceId("com.ndzl.emdkmaui:id/title").text("SCANNER")';
const _editTextSelector = 'android=new UiSelector().className("android.widget.EditText")';
const _fakeScanSelector = 'android=new UiSelector().text("Fake Scan")';
const _menuSelector = 'android=new UiSelector().text("Menú")';
const appPackage = 'com.ndzl.emdkmaui';
const fs = require('fs');
const path = require('path');
let _currentModulePath = null;  // e.j. "almacenamiento/almacenamientoStringer"

function sanitizeFilename(filename) {
    // Elimina o reemplaza caracteres inválidos para nombres de archivo en Windows
    return filename.replace(/[<>:"/\\|?*\[\]]/g, '_');
}

async function startVideoRecording(modulePath = null) {
  // modulePath podría ser algo como "almacenamiento/almacenamientoStringer" o "ASN/tracking"
  _currentModulePath = modulePath;
  await driver.startRecordingScreen();
}

async function stopVideoRecordingAndSave(filename = 'test-video') {
  const videoBase64 = await driver.stopRecordingScreen();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const sanitizedFilename = sanitizeFilename(filename);

  // determinar subcarpeta para módulo (o default)
  const moduleFolder = _currentModulePath
    ? sanitizeFilename(_currentModulePath)
    : 'default';

  // ruta completa: reports/videos/<moduleFolder>
  const videosDir = path.resolve(__dirname, `../reports/videos/${moduleFolder}`);

  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }

  const filePath = path.join(videosDir, `${sanitizedFilename}_${timestamp}.mp4`);
  fs.writeFileSync(filePath, videoBase64, 'base64');
  console.log(`🎥 Video guardado en: ${filePath}`);

  // limpiar para siguiente uso
  _currentModulePath = null;
}


async function restartApp() {
   try {
        await driver.terminateApp(appPackage);
         await driver.resetApp(); // 🔁 Este debería funcionar
      } catch (e) {
        console.warn(`No se pudo terminar la app: ${e.message}`);
      }

      try {
        await driver.activateApp(appPackage);
         await $(_menuSelector).waitForDisplayed({ timeout: 10000 });
      } catch (e) {
        console.warn(`No se pudo reiniciar la app: ${e.message}`);
      }
}



async function clickButtonInContainer(buttonText) {
    // Buscamos directamente todos los botones en la pantalla
    const buttons = await $$("//android.widget.Button");

    let found = false;

    for (const button of buttons) {
        const text = await button.getText();
        if (text.trim().toLowerCase() === buttonText.trim().toLowerCase()) {
            await button.click();
            console.log(`✅ Clic en botón: "${text}"`);
            found = true;
            break;
        }
    }

    if (!found) {
        throw new Error(`❌ Botón con texto "${buttonText}" no fue encontrado.`);
    }
}

async function clickElementByText(textToFind) {
    const elements = await $$('//android.widget.TextView');
    
    for (const el of elements) {
        const text = await el.getText();
        if (text.trim().toLowerCase() === textToFind.trim().toLowerCase()) {
            await el.click();
            console.log(`✅ Clic en elemento con texto: "${text}"`);
            return;
        }
    }
    throw new Error(`❌ Elemento con texto "${textToFind}" no fue encontrado.`);
}


/**
 * Ingresa texto en un elemento de tipo EditText (o cualquier input)
 * @param {WebdriverIO.Element|string} selectorOrElement - Elemento o selector
 * @param {string} text - Texto a ingresar
 */
async function enterText(selectorOrElement, text) {
    const element = typeof selectorOrElement === 'string'
        ? await $(selectorOrElement)
        : selectorOrElement;

    await waitForElementToBeVisible(element); // ✅ ahora con await
    await element.clearValue();               // ✅ ya es un WebdriverIO element
    await element.setValue(text);
}

async function waitForElementToBeVisible(selectorOrElement, timeout = 10000) {
    const element = typeof selectorOrElement === 'string'
        ? await $(selectorOrElement)
        : selectorOrElement;

    await element.waitForDisplayed({ timeout });
}

/**
 * Espera que un elemento esté visible, luego verifica que esté desplegado y exista.
 * @param {string|WebdriverIO.Element} selectorOrElement - Selector o elemento
 * @param {number} timeout - Tiempo máximo de espera (ms)
 */
async function assertElementVisibleAndExists(selectorOrElement, timeout = 5000) {
    const element = typeof selectorOrElement === 'string'
        ? await $(selectorOrElement)
        : selectorOrElement;

    await waitForElementToBeVisible(element, timeout);
    await expect(element).toBeDisplayed();
    await expect(element).toExist();
}

/**
 * Espera hasta 5 segundos para ver si un elemento existe y está visible.
 * Devuelve true si lo encuentra, false si no aparece en ese tiempo.
 * 
 * @param {string|WebdriverIO.Element} selectorOrElement - Selector o elemento
 * @param {number} timeout - Tiempo máximo de espera en ms (default: 5000)
 * @returns {Promise<boolean>} - true si el elemento existe y está visible, false si no
 */
async function waitForElementAndReturnFlag(selectorOrElement, timeout = 5000) {
    const element = typeof selectorOrElement === 'string'
        ? await $(selectorOrElement)
        : selectorOrElement;

    try {
        await element.waitForDisplayed({ timeout });
        return await element.isDisplayed();
    } catch (error) {
        // Si el elemento no se muestra dentro del timeout, devolvemos false
        return false;
    }
}


/**
 * Realiza el flujo completo de escaneo simulado (Fake Scan)
 * @param {string} text Texto a insertar en el campo de escaneo
 */
async function FakeScan(text) {
    console.log("Esto es el QR: " +text);
    await $(_moreOptionsSelector).click();
    await waitForElementToBeVisible(_scannerSelector, 3000);
    await clickElementByText("SCANNER");
    await waitForElementToBeVisible(_editTextSelector, 5000);
    await enterText(_editTextSelector, text);
    await waitForElementToBeVisible(_fakeScanSelector, 5000); 
    await clickButtonInContainer("Fake Scan");
}

/**
 * Intenta hacer 'back' hasta que se encuentre un elemento visible.
 * Hace como máximo `maxTries` intentos, con un delay entre cada uno.
 * 
 * @param {string} selector - Selector del elemento a buscar (Android UiSelector, XPath, CSS, etc.).
 * @param {number} maxTries - Número máximo de intentos (default: 5).
 * @param {number} waitBetweenTries - Espera entre intentos en ms (default: 1000).
 * @param {number} timeoutPerTry - Timeout de espera para el elemento por intento (default: 1000).
 * @returns {WebdriverIO.Element} - El elemento encontrado.
 * @throws Error si no se encuentra tras los intentos.
 */
async function backUntilElementFound(selector, maxTries = 5, waitBetweenTries = 1000, timeoutPerTry = 1000) {
  let attempt = 0;

  while (attempt < maxTries) {
    console.log(`🔁 Intento ${attempt + 1}/${maxTries}: buscando el selector '${selector}'`);

    const el = await $(selector);

    const isDisplayed = await el.isDisplayed().catch(() => false);

    if (isDisplayed) {
      console.log('✅ Elemento encontrado.');
      return el;
    }

    // Si no se encontró, hacemos back y esperamos
    await driver.back();
    await browser.pause(waitBetweenTries);

    // Intentamos esperar a que aparezca de nuevo (por si ya está)
    try {
      await el.waitForDisplayed({ timeout: timeoutPerTry });
      console.log('✅ Elemento apareció después del back.');
      return el;
    } catch (e) {
      // No apareció, seguimos al siguiente intento
    }

    attempt++;
  }

  throw new Error(`❌ Elemento '${selector}' no encontrado tras ${maxTries} intentos de back.`);
}


async function waitForRanDataToLoad(timeout = 5000) {
    const container = await $('android.view.ViewGroup');

    await browser.waitUntil(async () => {
        const textViews = await container.$$('android.widget.TextView');
        return textViews.length >= 6;
    }, {
        timeout,
        timeoutMsg: '❌ Los datos de RAN, Parte y QTY no se visualizaron completamente en pantalla'
    });

    console.log('✅ Datos visualizados: RAN, Parte, QTY.');
}


async function waitForErrorMessage(selector, timeout = 5000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
}

async function waitForScanDataToBePresent(selectors, timeout = 10000, interval = 500) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
        let allDataPresent = true;

        for (const selector of selectors) {
            const element = await $(selector);
            const isDisplayed = await element.isDisplayed().catch(() => false);
            
            if (!isDisplayed) {
                allDataPresent = false;
                console.warn(`⛔ Elemento ${selector} no está visible`);
                break;
            }

            const text = await element.getText().catch(() => '');
            if (!text || text.trim() === '') {
                allDataPresent = false;
                console.warn(`⚠️ Elemento ${selector} está vacío`);
                break;
            }

            console.log(`📦 Elemento ${selector} contiene: "${text.trim()}"`);
        }

        if (allDataPresent) {
            console.log("✅ Todos los datos del escaneo están presentes y no están vacíos");
            return true;
        }

        await new Promise(resolve => setTimeout(resolve, interval));
    }

    console.warn("⚠️ Timeout esperando los datos del escaneo no vacíos");
    return false;
}

async function waitForScanResultOrFail({ selectors, selectorFail, timeout = 10000, interval = 500 }) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
        let allDataPresent = true;

        // Verificar si apareció el mensaje de error o el módulo de fallo
        if (selectorFail) {
            const failElement = await $(selectorFail);
            const failVisible = await failElement.isDisplayed().catch(() => false);
            if (failVisible) {
                console.error("❌ Fallo detectado: se mostró el mensaje de error.");
                return false;
            }
        }

        // Verificar si todos los datos están presentes y no vacíos
        for (const selector of selectors) {
            const element = await $(selector);
            const isDisplayed = await element.isDisplayed().catch(() => false);
            
            if (!isDisplayed) {
                allDataPresent = false;
                console.warn(`⛔ Elemento ${selector} no está visible`);
                break;
            }

            const text = await element.getText().catch(() => '');
            if (!text || text.trim() === '') {
                allDataPresent = false;
                console.warn(`⚠️ Elemento ${selector} está vacío`);
                break;
            }

            console.log(`📦 Elemento ${selector} contiene: "${text.trim()}"`);
        }

        if (allDataPresent) {
            console.log("✅ Todos los datos del escaneo están presentes y no vacíos");
            return true;
        }

        await new Promise(resolve => setTimeout(resolve, interval));
    }

    console.warn("⚠️ Timeout esperando los datos del escaneo o la aparición del mensaje de error");
    return false;
}


async function waitForWebViewContext(timeout = 10000) {
  const start = Date.now();
  let contexts = [];

  while ((Date.now() - start) < timeout) {
    contexts = await driver.getContexts();
    if (contexts.some(c => c.toLowerCase().includes('webview'))) {
      return contexts;
    }
    await new Promise(r => setTimeout(r, 500)); // espera medio segundo
  }
  throw new Error('No se encontró contexto WebView después de ' + timeout + 'ms');
}

/**
 * Espera el resultado del escaneo verificando dos elementos posibles (OK o NG),
 * y valida los textos de toast correspondientes.
 *
 * @param {Object} params
 * @param {string} params.selectorOK - Selector del elemento OK
 * @param {string} params.toastTextOK - Texto del toast cuando es OK
 * @param {string} params.selectorNG - Selector del elemento NG
 * @param {string} params.toastTextNG - Texto del toast cuando es NG
 * @param {number} [params.timeout=10000] - Tiempo total de espera
 * @param {number} [params.interval=500] - Intervalo entre reintentos
 * @returns {Promise<{result: string}>}
 */
async function waitForScanResult({
    selectorOK,
    toastTextOK,
    selectorNG,
    toastTextNG,
    timeout = 10000,
    interval = 500,
    checkToasts = true // 👈 nuevo parámetro opcional
} = {}) {
    const attempts = Math.ceil(timeout / interval);

    for (let i = 0; i < attempts; i++) {
        const okElement = await $(selectorOK);
        const isOKVisible = await okElement.isDisplayed().catch(() => false);

        if (isOKVisible) {
            console.log('✅ RAN encontrado (OK)');
            if (checkToasts) {
                await assertToastTextExists(toastTextOK, 8000);
            }
            return { result: 'OK' };
        }

        const ngElement = await $(selectorNG);
        const isNGVisible = await ngElement.isDisplayed().catch(() => false);

        if (isNGVisible) {
            console.warn('❌ RAN no encontrado (NG)');
            if (checkToasts) {
                await assertToastTextExists(toastTextNG, 8000);
            }
            return { result: 'NG' };
        }

        await driver.pause(interval);
    }

    throw new Error("❌ No se detectó ni OK ni NG después del tiempo de espera.");
}

/**
 * Espera el resultado del escaneo verificando un único elemento de mensaje
 * y validando el texto para determinar si es OK o NG.
 *
 * @param {Object} params
 * @param {string} params.messageSelector - Selector del mensaje (compartido para OK y NG)
 * @param {string} params.expectedOKText - Texto que indica estado OK
 * @param {string} params.toastTextOK - Texto del toast cuando es OK
 * @param {string} params.expectedNGText - Texto que indica estado NG
 * @param {string} params.toastTextNG - Texto del toast cuando es NG
 * @param {number} [params.timeout=10000] - Tiempo total de espera
 * @param {number} [params.interval=500] - Intervalo entre reintentos
 * @param {boolean} [params.checkToasts=true] - Si debe validar toasts
 * @returns {Promise<{result: string}>}
 */
async function waitForScanResultwarning({
    messageSelector,
    expectedOKText,
    toastTextOK,
    expectedNGText,
    toastTextNG,
    timeout = 10000,
    interval = 500,
    checkToasts = true
} = {}) {
    const attempts = Math.ceil(timeout / interval);

    for (let i = 0; i < attempts; i++) {
        const messageElement = await $(messageSelector);
        const isDisplayed = await messageElement.isDisplayed().catch(() => false);

        if (isDisplayed) {
            const text = await messageElement.getText();

            if (text.includes(expectedOKText)) {
                console.log('✅ Resultado OK detectado');
                if (checkToasts) {
                    await assertToastTextExists(toastTextOK, 8000);
                }
                return { result: 'OK' };
            }

            if (text.includes(expectedNGText)) {
                console.warn('❌ Resultado NG detectado');
                if (checkToasts) {
                    await assertToastTextExists(toastTextNG, 8000);
                }
                return { result: 'NG' };
            }
        }

        await driver.pause(interval);
    }

    throw new Error("❌ No se detectó ni OK ni NG después del tiempo de espera.");
}



async function FakeScan2(text) {
    console.log("Esto es el QR: " +text);
    await waitForElementToBeVisible(_linkScanner, 5000);
    await $(_linkScanner).click();
    await waitForElementToBeVisible(_editTextSelector, 5000);
    await enterText(_editTextSelector, text);
    await waitForElementToBeVisible(_fakeScanSelector, 5000); 
    await clickButtonInContainer("Fake Scan");
}

async function extractLabelValues() {
    const etiquetas = ["ASN:"];
    const datos = {};

    for (const etiqueta of etiquetas) {
        try {
            const labelElement = await $(`//android.widget.TextView[@text="${etiqueta}"]`);
            const valorElement = await labelElement.$(`../following-sibling::android.widget.TextView[1]`);
            
            let valorTexto = "";
            if (await valorElement.isExisting()) {
                valorTexto = await valorElement.getText();
            } else {
                const todos = await $$('android.widget.TextView');
                const index = await todos.findIndex(async (el) => (await el.getText()) === etiqueta);
                if (index >= 0 && todos[index + 1]) {
                    valorTexto = await todos[index + 1].getText();
                }
            }

            datos[etiqueta.replace(":", "")] = valorTexto;
        } catch (err) {
            console.warn(`No se encontró el valor para ${etiqueta}: ${err.message}`);
            datos[etiqueta.replace(":", "")] = null;
        }
    }

    return datos;
}

async function assertToastMessageContains(partialText, timeout = 10000) {
    const selector = `android=new UiSelector().textContains("${partialText}")`;
    const toast = await $(selector);

    await toast.waitForDisplayed({ timeout });
    expect(await toast.isDisplayed()).toBe(true);
}

async function assertToastTextExists(partialText, timeout = 10000) {
    const interval = 500;
    const attempts = Math.ceil(timeout / interval);

    for (let i = 0; i < attempts; i++) {
        const pageSource = await driver.getPageSource();
        if (pageSource.includes(partialText)) {
            console.log(`✅ Toast con texto "${partialText}" detectado.`);
            return;
        }
        await driver.pause(interval);
    }

    throw new Error(`❌ Toast con texto "${partialText}" no fue detectado después de ${timeout}ms.`);
}


/**
 * Devuelve un array con los textos de todos los botones dentro del contenedor.
 */
async function listButtonTextsInContainer() {
    const container = await $("//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup");
     const buttons = await $("//android.widget.Button");


    const texts = [];
    for (const button of buttons) {
        const text = await button.getText();
        texts.push(text);
    }

    return texts;
}

/**
 * Método 1: Scroll con touchAction (fijo, desliza hacia arriba).
 * @param {number} x - Coordenada X.
 * @param {number} startY - Punto de inicio Y.
 * @param {number} endY - Punto final Y.
 * @param {number} duration - Duración del movimiento (ms).
 */
async function scrollWithTouchAction({ x = 500, startY = 1500, endY = 500, duration = 1000 } = {}) {
    await driver.touchAction([
        { action: 'press', x, y: startY },
        { action: 'wait', ms: duration },
        { action: 'moveTo', x, y: endY },
        'release'
    ]);
    console.log(`✅ Scroll realizado con touchAction de Y=${startY} a Y=${endY}`);
}

/**
 * Método 2: Scroll usando scrollIntoView (solo si el elemento ya está renderizado).
 * @param {string} selector - XPath o selector del elemento.
 */
async function scrollIntoView(selector) {
    const element = await $(selector);
    await element.scrollIntoView();
    console.log(`✅ Scroll hacia el elemento usando scrollIntoView: ${selector}`);
}

/**
 * Método 3: Scroll usando Android UiScrollable (ideal para listas grandes).
 * @param {string} text - Texto exacto del elemento al que quieres hacer scroll.
 */
async function scrollToText(text) {
    const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`;
    const element = await $(selector);
    await element.click();
    console.log(`✅ Scroll y clic al texto: "${text}"`);
}

module.exports = {
    restartApp,
    startVideoRecording,
    stopVideoRecordingAndSave,
    clickButtonInContainer,
    clickElementByText,
    FakeScan,
    waitForWebViewContext,
    waitForScanResult,
    waitForScanResultwarning,
    backUntilElementFound,
    waitForScanDataToBePresent,
    waitForScanResultOrFail,
    waitForElementAndReturnFlag,
    FakeScan2,
    extractLabelValues,
    assertToastMessageContains,
    assertToastTextExists,
    listButtonTextsInContainer,
    scrollWithTouchAction,
    scrollIntoView,
    scrollToText,
    waitForElementToBeVisible,
    assertElementVisibleAndExists,
    enterText,
    waitForErrorMessage
};
