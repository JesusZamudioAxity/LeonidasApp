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

  static getmoverRANdata() {
    const filePath = path.join(__dirname, 'data/almacenamiento/moverRAN.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')); // <-- Aquí defines "data"
    // Normaliza QR a array
    if (!Array.isArray(data.items)) {
      data.items = [data.items];
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  
  static getalmCriticodata() {
    const filePath = path.join(__dirname, 'data/almacenamiento/almcritico.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data;
  }

  static getalmNormaldata() {
    const filePath = path.join(__dirname, 'data/almacenamiento/almnormal.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data;
  }

  static getalmMixedata() {
    const filePath = path.join(__dirname, 'data/almacenamiento/almmixed.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data;
  }

  static getalmStringerdata() {
    const filePath = path.join(__dirname, 'data/almacenamiento/almstringer.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data;
  }

  static getalmMasivodata() {
    const filePath = path.join(__dirname, 'data/almacenamiento/almasivo.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data;
  }
}

module.exports = TestDataManager;
