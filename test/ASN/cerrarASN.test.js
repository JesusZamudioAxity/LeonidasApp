const CerrarASN = require('../../pageObjects/ASN/cerrasASN.page');
const TestDataManager = require('../../utils/testDataManager');
const { startVideoRecording, stopVideoRecordingAndSave } = require('../../utils/uiHelpers');
const { setupCerrarASN } = require('../../utils/dataHelpers/setUpASN');

const cerrarASN = TestDataManager.getcerrarASNData();

describe('📦 Cierre de ASN', () => {
  for (const { scanCode, resetParams } of cerrarASN.QR) {
    it(`✅ Flujo de cierre de ASN para QR: ${scanCode}`, async () => {
      console.log(scanCode, resetParams)
      const videoName = `CerrarASN_${scanCode}`;
      await setupCerrarASN (resetParams);
      await startVideoRecording('ASN/asn'); // ⬅️ INICIO VIDEO

      try {
        console.log("🔍 Usando QR:", scanCode,resetParams);
        await CerrarASN.confirmarASN(scanCode);

      } finally {
        await stopVideoRecordingAndSave(videoName); // ⬅️ FIN VIDEO
      }
    });
  }
});
