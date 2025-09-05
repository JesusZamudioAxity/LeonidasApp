// utils/uiHelpers.js
const _moreOptionsSelector = 'android=new UiSelector().description("More options")';
const _scannerSelector = 'android=new UiSelector().resourceId("com.ndzl.emdkmaui:id/title").text("SCANNER")';
const _editTextSelector = 'android=new UiSelector().className("android.widget.EditText")';
const _fakeScanSelector = 'android=new UiSelector().text("Fake Scan")';


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

async function waitForElementToBeVisible(selectorOrElement, timeout = 5000) {
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
 * Realiza el flujo completo de escaneo simulado (Fake Scan)
 * @param {string} text Texto a insertar en el campo de escaneo
 */
async function FakeScan(text) {
    console.log("Esto es el QR: " +text)
    await $(_moreOptionsSelector).click();
    await waitForElementToBeVisible(_scannerSelector, 3000);
    await clickElementByText("SCANNER");
    await waitForElementToBeVisible(_editTextSelector, 3000);
    await enterText(_editTextSelector, text);
    await waitForElementToBeVisible(_fakeScanSelector, 3000); 
    await clickButtonInContainer("Fake Scan");
}


async function waitForErrorMessage(selector, timeout = 5000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
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
    clickButtonInContainer,
    clickElementByText,
    FakeScan,
    listButtonTextsInContainer,
    scrollWithTouchAction,
    scrollIntoView,
    scrollToText,
    waitForElementToBeVisible,
    assertElementVisibleAndExists,
    enterText,
    waitForErrorMessage
};
