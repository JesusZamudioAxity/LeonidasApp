const fs = require('fs');
const path = require('path');

class TestDataManager {
  static getLoginData() {
    const filePath = path.join(__dirname, 'data/loginData.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  static getTrackingData() {
    const filePath = path.join(__dirname, 'data/ASN/trackingData.json');
    if (!Array.isArray(data.validItem)) {
      data.validItem = [data.validItem];
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  static getTrackingData() {
  const filePath = path.join(__dirname, 'data/ASN/trackingData.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')); // <-- Aquí defines "data"

  // Normaliza validItem como array
  if (!Array.isArray(data.validItem)) {
    data.validItem = [data.validItem];
  }

  return data;
}

    static getcerrarASNData() {
    const filePath = path.join(__dirname, 'data/ASN/cerrarASN.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')); // <-- Aquí defines "data"
    // Normaliza QR a array
    if (!Array.isArray(data.QR)) {
      data.QR = [data.QR];
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
}

module.exports = TestDataManager;
