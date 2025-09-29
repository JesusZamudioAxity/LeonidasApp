const AlmacenamientoMixed = require('../../pageObjects/almacenamiento/almacenamientoMixed.page');
const TestDataManager = require('../../utils/testDataManager');
const { startVideoRecording, stopVideoRecordingAndSave } = require('../../utils/uiHelpers'); // Asegúrate de tener esto

const mixed = TestDataManager.getalmMixedata();

describe('📦 Test Almacenamiento Mixed', () => {

    it('✅ Almacenamiento Mixed (datos válidos)', async () => {
        const { qr, location } = mixed.validItem;
        console.log("🧪 Parámetros válidos:", qr, location);
        await startVideoRecording();

        try {
            const result = await AlmacenamientoMixed.mixed(qr, location);
            console.log("🔎 Resultado:", result);

            expect(result.success).toBe(true);
            expect(result.reason).toContain('Se almacenó mixed correctamente.');
        } finally {
            await stopVideoRecordingAndSave('Mixed_Valido');
        }
    });

    it('❌ Alm Mixed - Mostrar alerta por ubicación inválida', async () => {
        const { qr, location } = mixed.locationinvalidItem;
        console.log("🧪 Ubicación inválida:", qr, location);

        await startVideoRecording();

        try {
            const result = await AlmacenamientoMixed.mixed(qr, location);
            console.log("🔎 Resultado:", result);

            expect(result.success).toBe(false); // Esperamos fallo
            expect(result.reason).toContain('Ubicacion no coincide'); // Validamos mensaje
        } finally {
            await stopVideoRecordingAndSave('Mixed_UbicacionInvalida');
        }
    });

    it('❌ Alm Mixed - Mostrar alerta al usar un QR inválido', async () => {
        const { qr, location } = mixed.invalidItem;
        console.log("🧪 QR inválido:", qr, location);

        await startVideoRecording();

        try {
            const result = await AlmacenamientoMixed.mixed(qr, location);
            console.log("🔎 Resultado:", result);

            expect(result.success).toBe(false); // Esperamos fallo
            expect(result.reason).toContain('Elemento no encontrado');
        } finally {
            await stopVideoRecordingAndSave('Mixed_QRInvalido');
        }
    });

});



// const AlmacenamientoMixed = require('../../pageObjects/almacenamiento/almacenamientoMixed.page');
// const TestDataManager = require('../../utils/testDataManager');

// const mixed = TestDataManager.getalmMixedata();

// describe('📦 Test Almacenamiento Mixed', () => {
  
//     // it('✅ Almacenamiento Mixed (datos válidos)', async () => {
//     //     const { qr, location } = mixed.validItem;
//     //     console.log("🧪 Parámetros válidos:", qr, location);
        
//     //     await AlmacenamientoMixed.goToMixed();
//     //     await AlmacenamientoMixed.mixed(qr, location);
//     // });


//      it('❌Alm Normal Mostrar alerta por ubicación inválida', async () => {
//          const { qr, location } = mixed.locationinvalidItem;
//          console.log("🧪 Ubicación inválida:", qr, location);
        
//          await AlmacenamientoMixed.goToMixed();
//          await AlmacenamientoMixed.mixed(qr, location);
//      });

//       it('❌Alm Normal Mostrar alerta al usar un QR inválido', async () => {
//         const { qr, location } = mixed.invalidItem;
//         console.log("🧪 QR inválido:", qr, location);
        
//         await AlmacenamientoMixed.goToMixed();
//         await AlmacenamientoMixed.mixed(qr, location);
//     });

// });