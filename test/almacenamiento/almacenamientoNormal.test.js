const AlmacenamientoNormal = require('../../pageObjects/almacenamiento/almacenamientoNormal.page');
const TestDataManager = require('../../utils/testDataManager');
const { startVideoRecording, stopVideoRecordingAndSave } = require('../../utils/uiHelpers'); // Asegúrate de tener esto

const normal = TestDataManager.getalmNormaldata();

describe('📦 Test Almacenamiento Normal', () => {

    it('✅ Almacenamiento Normal (datos válidos)', async () => {
         const { qr, location } = normal.validItem;
         console.log("🧪 Parámetros válidos:", qr, location);

         await startVideoRecording('almacenamiento/normal');

         try {
             const result = await AlmacenamientoNormal.normal(qr, location);
             console.log("🔎 Resultado:", result);

             expect(result.success).toBe(true); // Debe pasar correctamente
              expect(result.reason).toContain('Se almacenaron los ranes.'); 
         } finally {
             await stopVideoRecordingAndSave('Normal_Valido');
         }
    });

    it('❌ Alm Normal - Mostrar alerta por ubicación inválida', async () => {
        const { qr, location } = normal.locationinvalidItem;
        console.log("🧪 Ubicación inválida:", qr, location);

        await startVideoRecording('almacenamiento/normal');

        try {
            const result = await AlmacenamientoNormal.normal(qr, location);
            console.log("🔎 Resultado:", result);

            expect(result.success).toBe(false); // Esperamos que falle
            expect(result.reason).toContain('Ubicacion no coincide'); // Mensaje esperado
        } finally {
            await stopVideoRecordingAndSave('Normal_UbicacionInvalida');
        }
    });

    it('❌ Alm Normal - Mostrar alerta al usar un QR inválido', async () => {
        const { qr, location } = normal.invalidItem;
        console.log("🧪 QR inválido:", qr, location);

        await startVideoRecording('almacenamiento/normal');

        try {
            const result = await AlmacenamientoNormal.normal(qr, location);
            console.log("🔎 Resultado:", result);

            expect(result.success).toBe(false); // Esperamos que falle
            expect(result.reason).toContain('RAN incorrecta'); // Mensaje esperado
        } finally {
            await stopVideoRecordingAndSave('Normal_QRInvalido');
        }
    });

});