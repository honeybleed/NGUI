import { Injectable } from '@angular/core';
import { InitConfigPams, InitConfigReply, DoRegisterPams, DoRegisterReply } from '../app-common';
import { DoLoginPams, DoLoginReplyV3, DoLoginReplyV5 } from '../app-common/model/APIModel/DoLogin';
import { AppCacheService } from '../global';
import { AppVersion } from '../app-common/model/AppVersion';
import { DoGetVMPams, DoGetVMReplyV3, DoGetVMReplyV5 } from '../app-common/model/APIModel/DoGetVM';
declare let electron: any;

@Injectable()
export class RenderEventHandlerService {
  private ipcRenderer = electron.ipcRenderer;
  constructor(private _appCacheService: AppCacheService) { }
  close() {
    this.ipcRenderer.sendSync('win-close');
  }
  initConfig(pams: InitConfigPams) {
    this.ipcRenderer.send('app-config-init', pams);
    this._appCacheService.initVersion(pams.version, pams.versionStr);
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
  doLogin(pams: DoLoginPams) {
    this.ipcRenderer.send('do-login', pams);
    const version = pams.version;
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('do-login-reply', (event, data: DoLoginReplyV3 | DoLoginReplyV5) => {
        if (data.errorNo === 0) {
          if (version === AppVersion.V3) {
            const v3Data = data as DoLoginReplyV3;
            this._appCacheService.username = v3Data.data.NAME;
            this._appCacheService.userid = v3Data.data.ID + '';
          } else {
            const v5Data = data as DoLoginReplyV5;
            this._appCacheService.username = v5Data.data.name;
            this._appCacheService.userid = v5Data.data.id;
            this._appCacheService.sessionid = v5Data.data.session.id;
          }
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }
  doGetVMs(pams: DoGetVMPams) {
    this.ipcRenderer.send('do-get-vm', pams);
    const version = pams.version;
    return new Promise((resolve, reject) => {
      this.ipcRenderer.once('do-get-vm-reply', (event, data: DoGetVMReplyV3 | DoGetVMReplyV5) => {
        if (data.errorNo === 0) {
          if (version === AppVersion.V5) {
            const v5Data = data as DoGetVMReplyV5;
            this._appCacheService.sessionid = v5Data.data.session_id;
          }
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }
  showNew() {
    this.ipcRenderer.send('showNew', () => {
      return new Promise((resolve, reject) => {
        this.ipcRenderer.once('showNew-reply', () => {
          resolve();
        });
      });
    });
  }
  on(event: string, handler: (event: {returnValue: any, sender: any}, data?: any) => void) {
    return this.ipcRenderer.on(event, handler);
  }
}
