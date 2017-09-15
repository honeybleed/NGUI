const { ipcMain } = require('electron');
class IpcHandler {
  constructor(event, handler) {
    this.event = event;
    this.handler = handler;
  }
  listen() {
    ipcMain.on(this.event, this.handler);
  }
}
module.exports = {
  IpcHandler
};
