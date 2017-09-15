const { app, BrowserWindow } = require('electron');
const { IpcHandler } = require('./electron/ipcMainHandler');
const { InitConfig, ReadConfig, WriteConfig } = require('./electron/nativeTools');
const { DoRegister } = require('./electron/apiHandler');
let win, test;
const createWindow = () => {
  win = new BrowserWindow({
    width: 600,
    height: 400,
    show: false,
    frame: false,
    resizable: false,
    webPreferences: {
      //devTools: false
    }
  });
  win.loadURL(`file://${__dirname}/dist/index.html`);
  win.webContents.openDevTools();
  win.on('closed', () => win = null);
  win.on('ready-to-show', () =>{
    win.show();
    win.focus();
  });
};
const createNewWindow = () => {
  test = new BrowserWindow({
    width: 600,
    height: 400,
    show: false,
    frame: false,
    resizable: false,
    modal: true,
    parent: win,
    webPreferences: {
      //devTools: false
    }
  });
  test.loadURL(`file://${__dirname}/dist/index.html`);
  //test.webContents.openDevTools();
  test.on('closed', () => win = null);
  test.on('ready-to-show', () => {
    test.show();
    test.focus();
  });
};

app.on('ready', _ => createWindow());
app.on('window-all-closed', _ => process.platform !== 'darwin'&& app.quit());
app.on('activate', _ => win === null&& createWindow());
new IpcHandler('win-close', () => {
  win.close();
}).listen();
new IpcHandler('showNew', () => {
  createNewWindow();
}).listen();
require('./electron/apiHandler');


