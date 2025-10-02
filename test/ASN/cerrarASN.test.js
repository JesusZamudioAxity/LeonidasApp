const CerrarASN = require('../../pageObjects/ASN/cerrasASN.page');
const TestDataManager = require('../../utils/testDataManager');
const { startVideoRecording, stopVideoRecordingAndSave } = require('../../utils/uiHelpers');

const cerrarASN = TestDataManager.getcerrarASNData();

describe('📦 Cierre de ASN', () => {
  for (const { scanCode } of cerrarASN.QR) {
    it(`✅ Flujo de cierre de ASN para QR: ${scanCode}`, async () => {
      const videoName = `CerrarASN_${scanCode}`;
      await startVideoRecording('ASN/asn'); // ⬅️ INICIO VIDEO

      try {
        console.log("🔍 Usando QR:", scanCode);
        await CerrarASN.confirmarASN(scanCode);

      } finally {
        await stopVideoRecordingAndSave(videoName); // ⬅️ FIN VIDEO
      }
    });
  }
});
