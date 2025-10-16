const { actualizarStoreLocation, consultarStoreLocation } = require('../db-test');

async function setupDatosAlmacenamiento(expected) {
  try {
    const { id, ranNumber, locationId, storeConditionId, partNumber } = expected;

    await actualizarStoreLocation({ id, ranNumber, locationId, storeConditionId });

    const resultados = await consultarStoreLocation({ partNumber, ranNumber });

    if (!Array.isArray(resultados) || resultados.length === 0) {
      throw new Error(`❌ No se encontraron registros para RAN ${ranNumber}`);
    }

    const resultado = resultados[0];

    if ((resultado.id || resultado.Id) !== id) {
      throw new Error(`❌ ID no coincide. Esperado: ${id}, Recibido: ${resultado.id || resultado.Id}`);
    }
    if ((resultado.locationId || resultado.LocationId) !== locationId) {
      throw new Error(`❌ LocationId no coincide. Esperado: ${locationId}, Recibido: ${resultado.locationId || resultado.LocationId}`);
    }
    if ((resultado.storeConditionId || resultado.StoreConditionId) !== storeConditionId) {
      throw new Error(`❌ StoreConditionId no coincide. Esperado: ${storeConditionId}, Recibido: ${resultado.storeConditionId || resultado.StoreConditionId}`);
    }

    return resultado;

  } catch (error) {
    // Puedes agregar logs personalizados si quieres trazar desde qué helper falló
    console.error('❌ Error en setupDatosAlmacenamiento:', error.message);
    throw error; // Rethrow para que el test falle
  }
}

module.exports = { setupDatosAlmacenamiento };



    // expect(Array.isArray(resultados)).toBe(true);
    // expect(resultados.length).toBeGreaterThan(0);

    // const resultado = resultados[0];
    // resultadoConsultado = resultado; // Guardamos para posibles validaciones futuras

    // expect(resultado.id || resultado.Id).toBe(expected.id);
    // expect(resultado.locationId || resultado.LocationId).toBe(expected.locationId);
    // expect(resultado.storeConditionId || resultado.StoreConditionId).toBe(expected.storeConditionId);