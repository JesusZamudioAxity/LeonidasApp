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

