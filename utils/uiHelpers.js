// utils/uiHelpers.js

/**
 * Hace clic en un botón dentro de un contenedor específico, buscando por texto.
 * @param {string} buttonText - Texto exacto del botón a pulsar.
 */
async function clickButtonInContainer(buttonText) {
    const container = await $("//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup");
    const buttons = await container.$$("//android.widget.Button");

    for (const button of buttons) {
        const text = await button.getText();
        if (text.trim() === buttonText) {
            await button.click();
            console.log(`✅ Clic en botón: ${buttonText}`);
            return;
        }
    }

     // Assert que se encontró el botón
    expect(found).toBe(true, `⚠️ Botón con texto "${buttonText}" no fue encontrado.`);

    if (!found) {
        console.warn(`⚠️ Botón con texto "${buttonText}" no encontrado.`);
    }
}

/**
 * Devuelve un array con los textos de todos los botones dentro del contenedor.
 */
async function listButtonTextsInContainer() {
    const container = await $("//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup");
    const buttons = await container.$$("//android.widget.Button");

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
    listButtonTextsInContainer,
     scrollWithTouchAction,
    scrollIntoView,
    scrollToText,
};
