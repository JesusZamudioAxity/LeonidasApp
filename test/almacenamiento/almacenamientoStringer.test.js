const AlmacenamientoStringer = require('../../pageObjects/almacenamiento/almacenamientoStringer.page');
const TestDataManager = require('../../utils/testDataManager');
const { startVideoRecording, stopVideoRecordingAndSave } = require('../../utils/uiHelpers');

const stringer = TestDataManager.getalmStringerdata();

describe('📦 Test Almacenamiento stringer', () => {

    it('✅ Almacenamiento stringer (datos válidos)', async () => {
        const { qr, location } = stringer.validItem;
        console.log("🧪 Parámetros válidos:", qr, location);
        await startVideoRecording(); // ⬅️ INICIO VIDEO
        try {
            await AlmacenamientoStringer.goToStringer();
            const result = await AlmacenamientoStringer.stringer(qr, location);

            expect(result.success).toBe(true);
            expect(result.reason).toContain('Se alamacenó el RAN');
        } finally {
            await stopVideoRecordingAndSave(`Stringer_Valido`);
        }
    });

    it('❌ Alm Normal - Alerta por ubicación inválida', async () => {
        const { qr, location } = stringer.locationinvalidItem;
        console.log("🧪 Ubicación inválida:", qr, location);
        await startVideoRecording(); // ⬅️ INICIO VIDEO
        try {
            await AlmacenamientoStringer.goToStringer();
            const result = await AlmacenamientoStringer.stringer(qr, location);

            expect(result.success).toBe(false);
            expect(result.reason).toContain('Ubicacion no coincide');
        } finally {
            await stopVideoRecordingAndSave(`Stringer_UbicacionInvalida`);
        }
    });

    it('❌ Alm Normal - Alerta por QR inválido', async () => {
        const { qr, location } = stringer.invalidItem;
        console.log("🧪 QR inválido:", qr, location);
        await startVideoRecording(); // ⬅️ INICIO VIDEO
        try {
            await AlmacenamientoStringer.goToStringer();
            const result = await AlmacenamientoStringer.stringer(qr, location);

            expect(result.success).toBe(false);
            expect(result.reason).toContain('El ran leido no se encontró.');
        } finally {
            await stopVideoRecordingAndSave(`Stringer_QRInvalido`);
        }
    });

});
