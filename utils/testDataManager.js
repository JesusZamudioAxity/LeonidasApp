const fs = require('fs');
const path = require('path');

class TestDataManager {
  static getLoginData() {
    const filePath = path.join(__dirname, 'data/loginData.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  static getTrackingData() {
    const filePath = path.join(__dirname, 'data/trackingData.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
}

module.exports = TestDataManager;
