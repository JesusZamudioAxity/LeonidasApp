const AlmacenamientoCritico = require('../../pageObjects/almacenamiento/almacenamientoCritico.page');
const TestDataManager = require('../../utils/testDataManager');

const critico = TestDataManager.getalmCriticodata();

describe('📦 Test Almacenamiento crítico', () => {
  
    it('✅ Almacenar un registro como crítico en línea (datos válidos)', async () => {
        const { qr, location } = critico.validItem;
        console.log("🧪 Parámetros válidos:", qr, location);
        
        await AlmacenamientoCritico.goToCritico();
        await AlmacenamientoCritico.moverRAN(qr, location);
    });


     it('❌ Mostrar alerta por ubicación inválida', async () => {
         const { qr, location } = critico.locationinvalidItem;
         console.log("🧪 Ubicación inválida:", qr, location);
        
         await AlmacenamientoCritico.goToCritico();
         await AlmacenamientoCritico.moverRAN(qr, location);
     });

      it('❌ Mostrar alerta al usar un QR inválido', async () => {
        const { qr, location } = critico.invalidItem;
        console.log("🧪 QR inválido:", qr, location);
        
        await AlmacenamientoCritico.goToCritico();
        await AlmacenamientoCritico.moverRAN(qr, location);
    });

});
