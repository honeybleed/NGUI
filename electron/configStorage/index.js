const electron = require('electron');
const path = require('path');
const fs = require('fs');

class ConfigStore {
  constructor( defaults ) {
    const configPath = electron.app.getPath('userData');
    // console.log(configPath);
    this.path = path.join(configPath, 'config.json');
    this.data = parseDataFile(this.path, defaults);
  }
  get(key) {
    return this.data[key];
  }
  set(key, value) {
    this.data[key] = value;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}
function parseDataFile(path, defaults) {
  try {
    return JSON.parse(fs.readFileSync(path));
  } catch (err) {
    return defaults;
  }
}
module.exports = ConfigStore;
