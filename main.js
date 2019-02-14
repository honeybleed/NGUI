const { app, BrowserWindow, dialog } = require('electron');
const { IpcHandler } = require('./electron/ipcMainHandler');
const { VERSION } = require('./electron/httpClients');
const { exec } = require('child_process');
let mainWin, configWin, infoWin;
let mainWinStatus;
const createMainWindow = () => {
  mainWin = new BrowserWindow({
    width: 400,
    title: "OCTDesk",
    height: 300,
    show: false,
    frame: false,
    fullscreen: true,
    resizable: false,
    backgroundColor: '#404B5D',
    icon: __dirname + '/dist/assets/LogoImg.png',
    webPreferences: {
      devTools: false
    }
  });
  mainWin.loadURL(`file://${__dirname}/dist/index.html#/config-check`);
   // mainWin.webContents.openDevTools();
  mainWin.on('closed', () => mainWin = null);

  mainWin.on('ready-to-show', () =>{
    mainWinStatus = 'config-check';
    mainWin.show();
    mainWin.focus();
  });
};
app.on('ready', _ => createMainWindow());
app.on('window-all-closed', _ => process.platform !== 'darwin'&& app.quit());
app.on('activate', _ => mainWin === null&& createMainWindow());


const createConfigWin = () => {
  configWin = new BrowserWindow({
    width: 360,
    height: 350,
    show: false,
    frame: false,
    resizable: false,
    title: 'OCTDesk 配置',
    modal: true,
    parent: mainWin,
    icon: __dirname + '/dist/assets/LogoImg.png',
    webPreferences: {
      devTools: false
    }
  });
  configWin.loadURL(`file://${__dirname}/dist/index.html#/config-set`);
  // configWin.webContents.openDevTools();
  configWin.on('closed', () => configWin = null);
  configWin.show();
  configWin.focus();
  configWin.on('ready-to-show', () => {

  });
};
const createInfoWin = () => {
  infoWin = new BrowserWindow({
    width: 450,
    height: 550,
    show: false,
    frame: false,
    title: 'OCTDesk 信息',
    resizable: false,
    modal: true,
    icon: __dirname + '/dist/assets/LogoImg.png',
    parent: mainWin,
    webPreferences: {
      devTools: false
    }
  });
  infoWin.loadURL(`file://${__dirname}/dist/index.html#/app-info`);
  // infoWin.webContents.openDevTools();
  infoWin.on('closed', () => infoWin = null);
  infoWin.show();
  infoWin.focus();
  infoWin.on('ready-to-show', () => {

  });
};

new IpcHandler('check-boot', (event, data) => {
  exec('octdesk check', (error, stdout, stderr) => {
    if (error) {
      console.error(error);
    } else {
      event.sender.send('check-boot-reply', stdout);
    }
  });
}).listen();

new IpcHandler('set-boot', (event, data) => {
  exec('octdesk set', (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      event.sender.send('set-boot-reply', {
        ret: false
      });
    } else {
      event.sender.send('set-boot-reply', {
        ret: true
      });
    }
  });
}).listen();

new IpcHandler('unset-boot', (event, data) => {
  exec('octdesk unset', (error, stdout, stderr) => {
    if(error) {
      console.error(error);
      event.sender.send('unset-boot-reply', {
        ret: false
      });
    } else {
      event.sender.send('unset-boot-reply', {
        ret: true
      });
    }
  });
}).listen();

new IpcHandler('win-close', (event,data) => {
  if(data.tag === 'config-check') {
    mainWin.close();
  } else if(data.tag === 'config-set') {
    configWin.close();
    mainWin.webContents.send('config-set-close', {
      tag: data.tag,
      value: data.value
    });
  } else if(data.tag === 'login-win') {
    mainWin.close();
  } else if(data.tag === 'vms-win') {
    mainWin.close();
  } else if(data.tag === 'app-info-win') {
    infoWin.close();
  }
  event.returnValue = null;
}).listen();

new IpcHandler('show-config-set', (event) => {
  createConfigWin();
  event.returnValue = null;
}).listen();

new IpcHandler('show-app-info', (event) => {
  createInfoWin();
  event.returnValue = null;
}).listen();

let cache = {};
function mixCache(data) {
  for(let name of Object.getOwnPropertyNames(data)) {
    cache[name] = data[name];
  }
}

new IpcHandler('async-cache', (event, data) => {
  if(data) {
    mixCache(data);
  }
  event.returnValue = cache;
}).listen();

new IpcHandler('trans-to-login', (event) => {
  // if (mainWin.isMaximized()) {
  //   mainWin.unmaximize();
  // }
  // if (cache.version === VERSION.VERSION_5){
  //   mainWin.setSize(370, 470, true);
  // } else {
  //   mainWin.setSize(370, 410, true);
  // }
  mainWinStatus = 'login-win';
  event.returnValue = null;
}).listen();

new IpcHandler('trans-to-vms', (event) => {
  // mainWin.setSize(780, 500, true);
  mainWinStatus = 'vms-win';
  event.returnValue = null;
}).listen();

new IpcHandler('maximize', (event) => {
  // mainWin.maximize();
  event.returnValue = null;
}).listen();

new IpcHandler('un-maximize', (event) => {
  // mainWin.unmaximize();
  event.returnValue = null;
}).listen();

new IpcHandler('minimize', (event) => {
  mainWin.minimize();
  event.returnValue = null;
}).listen();

new IpcHandler('call-spice', (event, data) => {
  const cmd = 'remote-viewer -f spice://' + data.ip + ':' + data.port;
  exec(cmd, (error, stdout, stderr) => {
    if(error) {
      console.error(stderr);
      console.error(error);
      dialog.showErrorBox(error.name, error.message);
    } else {
      console.log(stdout);
    }
  });
}).listen();

require('./electron/apiHandler');


