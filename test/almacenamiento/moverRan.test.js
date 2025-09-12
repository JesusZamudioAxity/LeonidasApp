const AlmacenamientoRAN = require('../../pageObjects/almacenamiento/moverRan.page');
const TestDataManager = require('../../utils/testDataManager');

const ranData = TestDataManager.getmoverRANdata();

describe('📦 Test de Mover RAN', () => {
  ranData.items.forEach((ran, index) => {
    const expectedToPass = ran.shouldPass ?? true;

    it(`Caso #${index + 1} - ${expectedToPass ? '✅ Debe pasar' : '❌ Debe fallar'}`, async () => {
      const result = await AlmacenamientoRAN.moverRAN(ran.qr, ran.location);

      const statusEmoji = result.success ? '✅' : '❌';
      const expectedText = expectedToPass ? 'PASAR' : 'FALLAR';
      const actualText = result.success ? 'PASÓ' : 'FALLÓ';
      const reason = result.message || result.reason || 'Sin mensaje';

      // ❗ Si falla, lanza un error con mensaje visible en reporter
      if (result.success !== expectedToPass) {
        throw new Error(`Resultado real: ${actualText} ${statusEmoji} | Esperado: ${expectedText} | Mensaje: ${reason}`);
      }

      // 🟢 Si pasa, se imprime aquí (visible en el `spec` si usas `--logLevel info`)
      console.info(`✓ Caso #${index + 1} - ${expectedToPass ? '✅ Debe pasar' : '❌ Debe fallar'} | ${actualText} ${statusEmoji} | ${reason}`);
    });
  });
});

//  const {
//      clickButtonInContainer,
//      clickElementByText,
//      scrollToText,
//      waitForElementToBeVisible,
//      FakeScan,
//      assertToastTextExists
//  } = require('../../utils/uiHelpers');

// _almacenamientoSelector = 'android=new UiSelector().text("Almacenamiento")';
// _almacenarSelector = 'android=new UiSelector().text("Almacenar")';
// _lblTipoAlmacenar = 'android=new UiSelector().text("Tipo de almacenamiento")';
// _lblMoverRan = 'android=new UiSelector().text("Mover RAN")';
// _msgRANOK = 'android=new UiSelector().text("OK")';



//   describe('test', () => {
//  ;
//        it('Mover RAN ', async () => {
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

//      });
     
       
//   });
 