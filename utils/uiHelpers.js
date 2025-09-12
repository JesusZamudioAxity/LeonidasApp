// utils/uiHelpers.js
const _moreOptionsSelector = 'android=new UiSelector().description("More options")';
const _scannerSelector = 'android=new UiSelector().resourceId("com.ndzl.emdkmaui:id/title").text("SCANNER")';
const _editTextSelector = 'android=new UiSelector().className("android.widget.EditText")';
const _fakeScanSelector = 'android=new UiSelector().text("Fake Scan")';
const _menuSelector = 'android=new UiSelector().text("Menú")';
const appPackage = 'com.ndzl.emdkmaui';

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
 * Realiza el flujo completo de escaneo simulado (Fake Scan)
 * @param {string} text Texto a insertar en el campo de escaneo
 */
async function FakeScan(text) {
    console.log("Esto es el QR: " +text);
    await $(_moreOptionsSelector).click();
    await waitForElementToBeVisible(_scannerSelector, 3000);
    await clickElementByText("SCANNER");
    await waitForElementToBeVisible(_editTextSelector, 3000);
    await enterText(_editTextSelector, text);
    await waitForElementToBeVisible(_fakeScanSelector, 3000); 
    await clickButtonInContainer("Fake Scan");
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

async function FakeScan2(text) {
 console.log("Esto es el QR: " + text);

           const moreOptions = await $('~More options');
await moreOptions.click();
 // Pausa para inspeccionar en el dispositivo si quieres
console.log(await element.getAttribute('enabled'));
console.log(await element.getAttribute('clickable'));
console.log(await element.getAttribute('focusable'));
console.log(await element.getAttribute('displayed'));

    try {
        await element.click();
        console.log('Click ejecutado con éxito');
    } catch (error) {
        console.error('Error al hacer click:', error.message);
    }

try {
  const contexts = await waitForWebViewContext();
  console.log('Contexts con WebView:', contexts);
  await driver.switchContext(contexts.find(c => c.toLowerCase().includes('webview')));
  // Ahora puedes interactuar con el WebView
} catch (error) {
  console.error(error.message);
}

try {
    const contexts = await driver.getContexts();
    console.log("Contexts disponibles:", contexts);
    await driver.switchContext('NATIVE_APP');

    await browser.pause(1000); // pausa antes de buscar

  //  const element = await $('~More options');
    await element.waitForExist({ timeout: 5000 });
    console.log('Elemento "More options" existe');

    const visible = await element.isDisplayed();
    console.log('Visible:', visible);

    if (visible) {
      await element.click();
      console.log('Click en "More options" ejecutado');
    } else {
      console.log('El elemento no está visible');
    }

  } catch (error) {
    console.error('Error tratando de clickear "More options":', error);
  }



    // const element = await $('~More options');

    try {
        await element.waitForExist({ timeout: 5000 });
        console.log('Elemento existe');

        const visible = await element.isDisplayed();
        const enabled = await element.isEnabled();
        const clickable = await element.getAttribute('clickable');

        console.log('Visible:', visible);
        console.log('Enabled:', enabled);
        console.log('Clickable:', clickable);

        // Oculta el teclado si está abierto
        try {
            await driver.hideKeyboard();
        } catch (err) {
            console.log('No hay teclado visible');
        }

        await browser.pause(500); // Esperar medio segundo
        await element.click();
        console.log('Click ejecutado');

    } catch (error) {
        console.error('Error con el elemento:', error.message);
    }

    await $(_moreOptionsSelector).click();
    await waitForElementToBeVisible(_scannerSelector, 3000);
    await clickElementByText("SCANNER");
    await waitForElementToBeVisible(_editTextSelector, 3000);
    await enterText(_editTextSelector, text);
    await waitForElementToBeVisible(_fakeScanSelector, 3000); 
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
    clickButtonInContainer,
    clickElementByText,
    FakeScan,
    waitForWebViewContext,
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
