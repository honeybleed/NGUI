const { DoGet, DoPostV5, DoPostV3, VERSION } = require('../httpClients');
const { ReadConfig, WriteConfig, InitConfig, GetCipherPwd } = require('../nativeTools');
const { IpcHandler } = require('../ipcMainHandler');

function getVMInfoV3(vm) {
  let _name = vm.name;
  let _account = vm.account;
  let _pwd = vm.password;
  let _osType, _osStr;
  if(vm.osType === 2) {
    _osType = 'Linux';
    _osStr = vm.osVersion;
  } else if (vm.osType === 1) {
    _osType = 'Windows';
    _osStr = _osType + '/' + vm.osVersion;
  } else {
    _osType = 'UnKnown OS';
    _osStr = _osType
  }
  let _mac = vm.mac;
  let _id = vm.id;
  let _status = vm.state === 2 ? 'Running' : 'Stopped';
  let _ip = vm.ip;
  let _hostip = vm.hostIP;
  let _spiceport = vm.spicePort;
  return ret = {
    name: _name,
    account: _account,
    pwd: _pwd,
    osType: _osType,
    osStr: _osStr,
    mac: _mac,
    id: _id,
    status: _status,
    ip: _ip,
    hostip: _hostip,
    spicePort: _spiceport
  };
}
function getVMInfoV5(vm) {
  let _name = vm.name;
  let _account = vm.account ? vm.account : 'Administrator';
  let _pwd = vm.password ? vm.password : '000000';
  let _osType, _osStr;
  if (vm.osType === 'Linux') {
    _osType = 'Linux';
    _osStr = vm.osVersion;
  } else if (vm.osType === 'Windows') {
    _osType = 'Windows';
    _osStr = _osType + '/' + vm.osVersion;
  } else {
    _osType = 'UnKnown OS';
    _osStr = _osType;
  }
  let _mac = vm.mac;
  let _id = vm.id;
  let _status = vm.status;
  let _ip = vm.ip;
  let _hostip = vm.hostip;
  let _spiceport = vm.port + '';
  return ret = {
    name: _name,
    account: _account,
    pwd: _pwd,
    osType: _osType,
    osStr: _osStr,
    mac: _mac,
    id: _id,
    status: _status,
    ip: _ip,
    hostip: _hostip,
    spicePort: _spiceport
  };
}
const InitConfigListener = new IpcHandler('app-config-init', (event, data) => {
  InitConfig();
  WriteConfig('Version', data.versionStr);
  event.sender.send('app-config-init-reply', {errorNo: 0, data: {}});
}).listen();
const DoRegisterListener = new IpcHandler('do-register', (event, data) => {
  const version = data.version;
  if (version === VERSION.VERSION_3) {
    const pams = new Map();
    pams.set('type', ReadConfig('Platform'));
    pams.set('clientId', ReadConfig('ClientID'));
    pams.set('mac', '00:00:00:00:00:00');
    pams.set('version', ReadConfig('Version'));
    DoGet('vdclient/register', pams).then((ret) => {
      event.sender.send('do-register-reply', {errorNo: 0, data: ret});
    }).catch((err) => {
      event.sender.send('do-register-reply', {errorNo: err.errorNo, errorMsg: err.errorMsg});
    });
  } else {
    const pams = {
      module: 'client',
      api: 'octlink.center.v5.client.APIClientRegister',
      paras: {
        type: ReadConfig('Platform'),
        clientId: ReadConfig('ClientID'),
        mac: '00:00:00:00:00:00',
        version: ReadConfig('Version'),
        timeout: 0
      },
      async: false,
      session: {
        uuid: '00000000000000000000000000000000',
        skey: ReadConfig('SKEY')
      }
    };
    DoPostV5(pams).then((ret) => {
      event.sender.send('do-register-reply', {errorNo: 0, data: ret});
    }).catch((err) => {
      event.sender.send('do-register-reply', {errorNo: err.errorNo, errorMsg: err.errorMsg});
    });
  }
}).listen();
const DoLoginListener = new IpcHandler('do-login', (event, data) => {
  const version = data.version;
  if (version === VERSION.VERSION_3) {
    const pams = {
      name: data.args.username,
      cipherPassword: GetCipherPwd(data.args.password)
    };
    DoPostV3('tuser/login', null, pams).then((ret) => {
      event.sender.send('do-login-reply', {errorNo:0, data: ret});
    }).catch((err) => {
      event.sender.send('do-login-reply', {errorNo: err.errorNo, errorMsg: err.errorMsg});
    })
  } else {
    const pams = {
      module: 'enduser',
      api: 'octlink.center.v5.enduser.APIEnduserLogin',
      paras: {
        'cipherPassword': GetCipherPwd(data.args.password),
        'name': data.args.username,
        'account': data.args.admin,
        'timeout': 0
      },
      async: false,
      session: {
        uuid: '00000000000000000000000000000000',
        skey: ReadConfig('SKEY')
      }
    };
    DoPostV5(pams).then((ret) => {
      event.sender.send('do-login-reply', {errorNo:0, data: ret});
    }).catch((err) => {
      event.sender.send('do-login-reply', {errorNo: err.errorNo, errorMsg: err.errorMsg});
    });
  }
}).listen();

const DoGetVMListener = new IpcHandler('do-get-vm', (event, data) => {
  const version = data.version;
  if (version === VERSION.VERSION_3) {
    DoGet('tuser/' + data.args.id + '/listvms', null).then((ret) => {
      let infoData = [];
      for (let i = 0; i < ret.length; i++) {
        infoData.push(getVMInfoV3(ret[i]));
      }
      event.sender.send('do-get-vm-reply', {errorNo:0, data: infoData});
    }).catch((err) => {
      event.sender.send('do-get-vm-reply', {errorNo: err.errorNo, errorMsg: err.errorMsg});
    });
  } else {
    const pams = {
      module: 'enduser',
      api: 'octlink.center.v5.enduser.APIShowBandVms',
      paras: {
        id: data.args.id,
        timeout: 0
      },
      async: false,
      session: {
        uuid: data.args.sessionID,
        skey: ReadConfig('SKEY')
      }
    };
    DoPostV5(pams).then((ret) => {
      let infoData = [];
      for (let i = 0; i < ret.vms.length; i++) {
        infoData.push(getVMInfoV5(ret.vms[i]));
      }
      ret.vms = infoData;
      event.sender.send('do-get-vm-reply', {errorNo:0, data: ret});
    }).catch((err) => {
      event.sender.send('do-get-vm-reply', {errorNo: err.errorNo, errorMsg: err.errorMsg});
    });
  }
}).listen();
