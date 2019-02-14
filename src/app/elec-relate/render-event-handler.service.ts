import { Injectable } from '@angular/core';
import { InitConfigPams, InitConfigReply, DoRegisterPams, DoRegisterReply } from '../app-common';
import { DoLoginPams, DoLoginReplyV3, DoLoginReplyV5 } from '../app-common/model/APIModel/DoLogin';
import { AppVersion } from '../app-common/model/AppVersion';
import { DoGetVMPams, DoGetVMReplyV3, DoGetVMReplyV5 } from '../app-common/model/APIModel/DoGetVM';
import { GlobalCache } from './GlobalCache';
import { ConfigKey } from '../app-common/model/ConfigKey';
import { DoVMPowerPams, DoVMPowerReplyV3, DoVMPowerReplyV5 } from '../app-common/model/APIModel/DoVMPower';
declare let electron: any;

@Injectable()
export class RenderEventHandlerService {
  private ipcRenderer = electron.ipcRenderer;
  private clipboard = electron.clipboard;
  constructor() { }
  copy(txt: string) {
    this.clipboard.writeText(txt + '');
  }
  close(tag: string, value?: any) {
    this.ipcRenderer.sendSync('win-close', {tag: tag, value: value});
  }
  initConfig(pams: InitConfigPams) {
    this.ipcRenderer.send('app-config-init', pams);
    this.asyncCache({
      version: pams.version,
      versionStr: pams.versionStr
    });
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('app-config-init-reply', (event, data: InitConfigReply) => {
        if (data.errorNo === 0) {
          resolve(data);
        } else {
          reject(data.errorMsg);
        }
      });
    });
  }
  callSpice(ip: string, port: string) {
    this.ipcRenderer.send('call-spice', {
      ip: ip,
      port: port
    });
  }
  doRegister(pams: DoRegisterPams) {
    this.ipcRenderer.send('do-register', pams);
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('do-register-reply', (event, data: DoRegisterReply) => {
        if (data.errorNo === 0) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }
  doVMPowerAction(pams: DoVMPowerPams) {
    this.ipcRenderer.send('do-vm-power-action', pams);
    const version = pams.version;
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('do-vm-power-action-reply', (event, data: DoVMPowerReplyV3 | DoVMPowerReplyV5) => {
        if (data.errorNo === 0) {
          if (version === AppVersion.V5) {
            const v5Data = data as DoVMPowerReplyV5;
            this.asyncCache({
              sessionid: v5Data.data.session_id
            });
          }
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }
  doLogin(pams: DoLoginPams) {
    this.ipcRenderer.send('do-login', pams);
    const version = pams.version;
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('do-login-reply', (event, data: DoLoginReplyV3 | DoLoginReplyV5) => {
        if (data.errorNo === 0) {
          if (version === AppVersion.V3) {
            const v3Data = data as DoLoginReplyV3;
            this.asyncCache({
              username: v3Data.data.NAME,
              userid: v3Data.data.ID + ''
            });
          } else {
            const v5Data = data as DoLoginReplyV5;
            this.asyncCache({
              username: v5Data.data.name,
              userid: v5Data.data.id,
              sessionid: v5Data.data.session.id
            });
          }
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }
  doGetTextPwd(cipherPwd: string) {
    return this.ipcRenderer.sendSync('get-txt-pwd', cipherPwd);
  }
  doGetCipherPwd(ori: string) {
    return this.ipcRenderer.sendSync('get-cipher-pwd', ori);
  }
  doGetVMs(pams: DoGetVMPams) {
    this.ipcRenderer.send('do-get-vm', pams);
    const version = pams.version;
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('do-get-vm-reply', (event, data: DoGetVMReplyV3 | DoGetVMReplyV5) => {
        if (data.errorNo === 0) {
          if (version === AppVersion.V5) {
            const v5Data = data as DoGetVMReplyV5;
            this.asyncCache({
              sessionid: v5Data.data.session_id
            });
          }
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }
  showConfigSet() {
    this.ipcRenderer.send('show-config-set');
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('config-set-close', (event, data) => {
        resolve(data);
      });
    });
  }
  showInfoWin() {
    this.ipcRenderer.sendSync('show-app-info');
  }
  checkBoot() {
    this.ipcRenderer.send('check-boot');
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('check-boot-reply', (event, data) => {
        if (data === 'yes') {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  setBoot() {
    this.ipcRenderer.send('set-boot');
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('set-boot-reply', (event, data) => {
        if (data.ret) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
  unsetBoot() {
    this.ipcRenderer.send('unset-boot');
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('unset-boot-reply', (event, data) => {
        if (data.ret) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
  transToLogin() {
    this.ipcRenderer.sendSync('trans-to-login');
  }
  transToVms() {
    this.ipcRenderer.sendSync('trans-to-vms');
  }
  on(event: string, handler: (event: {returnValue: any, sender: any}, data?: any) => void) {
    return this.ipcRenderer.on(event, handler);
  }
  send(event: string, data?: any) {
    return this.ipcRenderer.send(event, data);
  }
  private asyncCache( data: GlobalCache ): GlobalCache {
    return this.ipcRenderer.sendSync('async-cache', data);
  }
  setCache(data: GlobalCache) {
    this.asyncCache(data);
  }
  getCache(): GlobalCache {
    return this.asyncCache(null);
  }
  readConfig(key: ConfigKey): string {
    return this.ipcRenderer.sendSync('read-config', {key: ConfigKey[key]});
  }
  writeConfig(key: ConfigKey, value: string) {
    return this.ipcRenderer.sendSync('write-config', {key: ConfigKey[key], value: value});
  }
  maximize() {
    return this.ipcRenderer.sendSync('maximize');
  }
  unMaximize() {
    return this.ipcRenderer.sendSync('un-maximize');
  }
  minimize() {
    return this.ipcRenderer.sendSync('minimize');
  }
}
