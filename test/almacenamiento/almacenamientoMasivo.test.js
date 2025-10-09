const AlmacenamientoMasivo = require('../../pageObjects/almacenamiento/almacenamientoMasivo.page');
const TestDataManager = require('../../utils/testDataManager');
const { startVideoRecording, stopVideoRecordingAndSave } = require('../../utils/uiHelpers'); // Asegúrate de tener esto
const { setupDatosAlmacenamiento } = require('../../utils/dataHelpers/setupDatosAlmacenamiento');


const masivo = TestDataManager.getalmMasivodata();

describe('📦 Test Almacenamiento Masivo', () => {


    it('✅ Almacenamiento Masivo (datos válidos)', async () => {
          const { qr, location, expected } = masivo.validItem;
          console.log("🧪 Parámetros válidos:", qr, location, expected);
          await setupDatosAlmacenamiento(expected);
          await startVideoRecording('almacenamiento/masivo');

          try {
              const result = await AlmacenamientoMasivo.masivo(qr, location);
              console.log("🔎 Resultado:", result);

              expect(result.success).toBe(true); // Debe pasar correctamente
               expect(result.reason).toContain('Se almacenaron'); 
          } finally {
              await stopVideoRecordingAndSave('masivo_Valido');
          }
    });

    it('❌ Alm masivo - Mostrar alerta por ubicación inválida', async () => {
        const { qr, location } = masivo.locationinvalidItem;
        console.log("🧪 Ubicación inválida:", qr, location);

        await startVideoRecording('almacenamiento/masivo');

        try {
            const result = await AlmacenamientoMasivo.masivo(qr, location);
            console.log("🔎 Resultado:", result);

            expect(result.success).toBe(false); // Esperamos que falle
            expect(result.reason).toContain('La ubicación no coicide'); // Mensaje esperado
        } finally {
            await stopVideoRecordingAndSave('masivo_UbicacionInvalida');
        }
    });

    it('❌ Alm masivo - Mostrar alerta al usar un QR inválido', async () => {
        const { qr, location } = masivo.invalidItem;
        console.log("🧪 QR inválido:", qr, location);

        await startVideoRecording('almacenamiento/masivo');

        try {
            const result = await AlmacenamientoMasivo.masivo(qr, location);
            console.log("🔎 Resultado:", result);

            expect(result.success).toBe(false); // Esperamos que falle
            expect(result.reason).toContain('No se encontró el ran.'); // Mensaje esperado
        } finally {
            await stopVideoRecordingAndSave('masivo_QRInvalido');
        }
    });

});