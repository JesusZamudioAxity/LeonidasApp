const AlmacenamientoCritico = require('../../pageObjects/almacenamiento/almacenamientoCritico.page');
const TestDataManager = require('../../utils/testDataManager');
const { startVideoRecording, stopVideoRecordingAndSave } = require('../../utils/uiHelpers');

const critico = TestDataManager.getalmCriticodata();

describe('📦 Test Almacenamiento crítico', () => {

  it('✅ Almacenar un registro como crítico en línea (datos válidos)', async () => {
    const videoName = 'Critico_DatosValidos';
    await startVideoRecording(); // ⬅️ INICIO VIDEO

    try {
      const { qr, location } = critico.validItem;
      console.log("🧪 Parámetros válidos:", qr, location);

      await AlmacenamientoCritico.goToCritico();
      const result = await AlmacenamientoCritico.critico(qr, location);

      expect(result.success).toBe(true);
      expect(result.reason).toContain('Se almacenó el RAN');

    } finally {
      await stopVideoRecordingAndSave(videoName); // ⬅️ FIN VIDEO
    }
  });

  it('❌ Mostrar alerta por ubicación inválida', async () => {
    const videoName = 'Critico_UbicacionInvalida';
    await startVideoRecording(); // ⬅️ INICIO VIDEO

    try {
      const { qr, location } = critico.locationinvalidItem;
      console.log("🧪 Ubicación inválida:", qr, location);

      await AlmacenamientoCritico.goToCritico();
      const result = await AlmacenamientoCritico.critico(qr, location);

      expect(result.success).toBe(false);
      expect(result.reason).toContain('La ubicación leida no coincide');

    } finally {
      await stopVideoRecordingAndSave(videoName); // ⬅️ FIN VIDEO
    }
  });

  it('❌ Mostrar alerta al usar un QR inválido', async () => {
    const videoName = 'Critico_QRInvalido';
    await startVideoRecording(); // ⬅️ INICIO VIDEO

    try {
      const { qr, location } = critico.invalidItem;
      console.log("🧪 QR inválido:", qr, location);

      await AlmacenamientoCritico.goToCritico();
      const result = await AlmacenamientoCritico.critico(qr, location);

      expect(result.success).toBe(false);
      expect(result.reason).toContain('No hay registros que coincidan');

    } finally {
      await stopVideoRecordingAndSave(videoName); // ⬅️ FIN VIDEO
    }
  });

});
