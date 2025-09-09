const CerrarASN = require ('../../pageObjects/ASN/cerrasASN.page');
const TestDataManager = require('../../utils/testDataManager');

const cerrarASN = TestDataManager.getcerrarASNData();

 describe('ASN', () => {
    
      it('Flujo de ASN', async () => {
        const {scanCode} = cerrarASN.QR;
        console.log("code" + scanCode)
        await CerrarASN.confirmarASN(scanCode);
     });

 });




//  {
//   "QR": [
//        { "scanCode": "[>|p65715el000|q20|v003435|s13659806|ar0509202|<]" },
//        { "scanCode": "[>|p65715el000|q20|v003435|s13659806|ar0509203|<]" },
//         { "scanCode": "[>|p65715el000|q20|v003435|s13659806|ar0509204|<]" }
//   ]
// }

    //  for (const { scanCode } of cerrarASN.QR) {
    //     it(`Flujo de ASN para QR: ${scanCode}`, async () => {
    //         console.log("Usando QR:", scanCode);
    //         await CerrarASN.confirmarASN(scanCode);
    //     });
    // }
