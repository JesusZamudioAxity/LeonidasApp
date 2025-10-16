const AlmacenamientoRAN = require('../../pageObjects/almacenamiento/moverRan.page');
const TestDataManager = require('../../utils/testDataManager');
const { startVideoRecording, stopVideoRecordingAndSave } = require('../../utils/uiHelpers'); // helpers
const { setupDatosAlmacenamiento } = require('../../utils/dataHelpers/setupDatosAlmacenamiento');

const ran = TestDataManager.getmoverRANdata();
//const ranData = TestDataManager.getmoverRANdata();

describe('📦 Test de Mover RAN', () => {
    for (const { qr, location, expected } of ran.validItem3y4) {
      it('✅ Mover RAN a 3 y 4 (datos válidos)', async () => {
          console.log("🧪 Parámetros válidos:", qr, location,expected);
          
          await setupDatosAlmacenamiento(expected);
          await startVideoRecording('almacenamiento/moverRAN'); // ⬅️ INICIO VIDEO
          
          try {
  
              const result = await AlmacenamientoRAN.moverRAN(qr, location);
  
              expect(result.success).toBe(true);
              expect(result.message).toContain('Se movió el RAN');
          } finally {
              await stopVideoRecordingAndSave(`MoverRAN3y4_Valido`);
          }
      });
    }  

      it('✅ Mover RAN a 1 y 2 (datos válidos)', async () => {
        const { qr, location, expected } = ran.validItem1y2;
        console.log("🧪 Parámetros válidos:", qr, location,expected);
        
        await setupDatosAlmacenamiento(expected);
        await startVideoRecording('almacenamiento/moverRAN'); // ⬅️ INICIO VIDEO
        
        try {

            const result = await AlmacenamientoRAN.moverRAN(qr, location);

            expect(result.success).toBe(true);
            expect(result.message).toContain('Se movió el RAN');
        } finally {
            await stopVideoRecordingAndSave(`MoverRAN1y2_Valido`);
        }
      });
  
      it('❌ Mover RAN - Alerta por ubicación inválida', async () => {
          const { qr, location } = ran.locationinvalidItem;
          console.log("🧪 Ubicación inválida:", qr, location);
          await startVideoRecording('almacenamiento/moverRAN'); // ⬅️ INICIO VIDEO
          try {
  
              const result = await AlmacenamientoRAN.moverRAN(qr, location);
  
              expect(result.success).toBe(false);
              expect(result.message).toContain('no está registrada o no existe');
          } finally {
              await stopVideoRecordingAndSave(`MoverRAN_UbicacionInvalida`);
          }
      });
  
      it('❌ Mover RAN - Alerta por QR inválido', async () => {
          const { qr, location } = ran.invalidItem;
          console.log("🧪 QR inválido:", qr, location);
          await startVideoRecording('almacenamiento/moverRAN'); // ⬅️ INICIO VIDEO
          try {
 
              const result = await AlmacenamientoRAN.moverRAN(qr, location);
  
              expect(result.success).toBe(false);
              expect(result.message).toContain('El ran leido no se encontró');
          } finally {
              await stopVideoRecordingAndSave(`MoverRAN_QRInvalido`);
          }
      });
});

