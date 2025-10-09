const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'TjFzc2FuMjAyNQ==',
  server: 'localhost',
  port: 2244,
  database: 'WMSLeonidas',
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

async function actualizarStoreLocation({ id, ranNumber, locationId, storeConditionId }) {
  const pool = await sql.connect(config);

  const query = `
    UPDATE WMSLeonidas.dbo.StoreLocation
    SET StoreConditionId = @storeConditionId,
        LocationId = @locationId
    WHERE Id = @id
      AND RANNumber = @ranNumber
  `;

  const result = await pool.request()
    .input('storeConditionId', sql.Int, storeConditionId)
    .input('locationId', sql.Int, locationId)
    .input('id', sql.Int, id)
    .input('ranNumber', sql.VarChar(50), ranNumber.trim())
    .query(query);

  await pool.close();
  return result.rowsAffected[0];
}

async function consultarStoreLocation({ partNumber, ranNumber }) {
  const pool = await sql.connect(config);

  const query = `
    SELECT Id, LocationId, StoreConditionId
    FROM WMSLeonidas.dbo.StoreLocation
    WHERE PartNumber = @partNumber
      AND RANNumber = @ranNumber
  `;

  const result = await pool.request()
    .input('partNumber', sql.VarChar(50), partNumber.trim())
    .input('ranNumber', sql.VarChar(50), ranNumber.trim())
    .query(query);

  await pool.close();
  return result.recordset;
}

async function actualizarTrakingLinker({ asns, statusId }) {
  const pool = await sql.connect(config);

  const query = `
    UPDATE WMSLeonidas.dbo.TrakingLinker
    SET 
        RampDate = NULL,
        StartDownloadDate = NULL,
        StatusId = @statusId,
        EndDownloadDate = NULL
    WHERE asns = @asns
  `;

  const result = await pool.request()
    .input('asns', sql.VarChar(50), asns.trim())
    .input('statusId', sql.Int, statusId)
    .query(query);

  await pool.close();
  return result.rowsAffected[0]; // número de filas actualizadas
}

async function obtenerShipmentIdPorUCL(uclNumber, shipmentStatusId) {
  const pool = await sql.connect(config);

  // Primero, hacemos el UPDATE
  const updateQuery = `
    UPDATE WMSLeonidas.dbo.Shipment
    SET ShipmentStatusId = @shipmentStatusId
    WHERE UCLNumber = @uclNumber
  `;

  const updateResult = await pool.request()
    .input('uclNumber', sql.VarChar(50), uclNumber.trim())
    .input('shipmentStatusId', sql.Int, shipmentStatusId)
    .query(updateQuery);

  // Validamos si se actualizó alguna fila
  if (updateResult.rowsAffected[0] === 0) {
    await pool.close();
    console.warn(`⚠️ No se actualizó ninguna fila con UCLNumber: ${uclNumber}`);
    return null;
  }

  // Luego, hacemos el SELECT para recuperar el Id
  const selectQuery = `
    SELECT Id
    FROM WMSLeonidas.dbo.Shipment
    WHERE UCLNumber = @uclNumber
  `;

  const selectResult = await pool.request()
    .input('uclNumber', sql.VarChar(50), uclNumber.trim())
    .query(selectQuery);

  await pool.close();

  // Validamos si encontramos el registro
  if (selectResult.recordset.length > 0) {
    return selectResult.recordset[0].Id;
  } else {
    console.warn(`⚠️ No se encontró el shipment después del UPDATE con UCLNumber: ${uclNumber}`);
    return null;
  }
}


async function actualizarShipmentDetail({ shipmentId, shipmentDetailStatusId }) {
  const pool = await sql.connect(config);
   const query = `
    UPDATE WMSLeonidas.dbo.ShipmentDetail
    SET ShipmentDetailStatusId = @shipmentDetailStatusId,
        ReceivedQuantiy = NULL,
        ComfirmDate = NULL,
        ComfirmBy = NULL
    WHERE ShipmentId = @shipmentId
  `;

  const result = await pool.request()
    .input('shipmentId', sql.Int, shipmentId)
    .input('shipmentDetailStatusId', sql.Int, shipmentDetailStatusId)
    .query(query);

  await pool.close();
  return result.rowsAffected[0]; // número de filas actualizadas
}

module.exports = {
  actualizarStoreLocation,
  consultarStoreLocation,
  actualizarTrakingLinker, 
  obtenerShipmentIdPorUCL,
  actualizarShipmentDetail
};

