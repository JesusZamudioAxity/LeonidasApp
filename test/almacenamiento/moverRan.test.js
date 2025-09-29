const AlmacenamientoRAN = require('../../pageObjects/almacenamiento/moverRan.page');
const TestDataManager = require('../../utils/testDataManager');
const { startVideoRecording, stopVideoRecordingAndSave } = require('../../utils/uiHelpers'); // helpers

const ranData = TestDataManager.getmoverRANdata();

describe('📦 Test de Mover RAN', () => {
  ranData.items.forEach((ran, index) => {
    const expectedToPass = ran.shouldPass ?? true;

    it(`Caso #${index + 1} - ${expectedToPass ? '✅ Debe pasar' : '❌ Debe fallar'}`, async () => {
      const videoName = `MoverRAN_Caso_${index + 1}_${expectedToPass ? 'DebePasar' : 'DebeFallar'}`;
      await startVideoRecording(); // ⬅️ INICIO VIDEO

      try {
        const result = await AlmacenamientoRAN.moverRAN(ran.qr, ran.location);

        const statusEmoji = result.success ? '✅' : '❌';
        const expectedText = expectedToPass ? 'PASAR' : 'FALLAR';
        const actualText = result.success ? 'PASÓ' : 'FALLÓ';
        const reason = result.message || result.reason || 'Sin mensaje';

        if (result.success !== expectedToPass) {
          throw new Error(`Resultado real: ${actualText} ${statusEmoji} | Esperado: ${expectedText} | Mensaje: ${reason}`);
        }

        console.info(`✓ Caso #${index + 1} - ${expectedToPass ? '✅ Debe pasar' : '❌ Debe fallar'} | ${actualText} ${statusEmoji} | ${reason}`);
      
      } finally {
        await stopVideoRecordingAndSave(videoName); // ⬅️ FIN VIDEO
      }
    });
  });
});
