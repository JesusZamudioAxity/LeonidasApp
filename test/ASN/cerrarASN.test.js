const CerrarASN = require ('../../pageObjects/ASN/cerrasASN.page');
const TestDataManager = require('../../utils/testDataManager');

const cerrarASN = TestDataManager.getcerrarASNData();

 describe('ASN', () => {
     for (const { scanCode } of cerrarASN.QR) {
         it(`Flujo de ASN para QR: ${scanCode}`, async () => {
             console.log("Usando QR:", scanCode);
             await CerrarASN.confirmarASN(scanCode);
         });
     }

 });