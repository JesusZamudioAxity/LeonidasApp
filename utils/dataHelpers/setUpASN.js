const { actualizarTrakingLinker,obtenerShipmentIdPorUCL,actualizarShipment,
  actualizarShipmentDetail } = require('../db-test');

async function setupTrackingLinker(resetParams) {
  try {
    const { asns, statusId } = resetParams || {};

    if (!asns || typeof statusId !== 'number') {
      console.warn('⚠️ resetParams inválidos. Se omitirá el reset de TrackingLinker.');
      return;
    }

    console.log(`🔁 Reseteando TrackingLinker: ASN = ${asns}, StatusID = ${statusId}`);
    const rowsAffected = await actualizarTrakingLinker({ asns, statusId });

    if (rowsAffected === 0) {
      console.warn(`⚠️ No se actualizó ningún registro en TrakingLinker para ASN ${asns}`);
    }

  } catch (error) {
    console.error('❌ Error en setupTrackingLinker:', error.message);
    throw error;
  }
}

/**
 * 🔒 Setup para cerrar ASN
 */
async function setupCerrarASN({ uclNumber, shipmentStatusId, shipmentDetailStatusId }) {
  try {
    const shipmentId = await obtenerShipmentIdPorUCL(uclNumber, shipmentStatusId);
    if (!shipmentId) {
      throw new Error(`❌ No se encontró Shipment para UCLNumber ${uclNumber}`);
    }
    
    await actualizarShipmentDetail({ shipmentId, shipmentDetailStatusId });

    console.log(`✅ Setup para cierre de ASN ${uclNumber} completado.`);
  } catch (error) {
    console.error('❌ Error en setupCerrarASN:', error.message);
    throw error;
  }
}



module.exports = { setupTrackingLinker,setupCerrarASN };
