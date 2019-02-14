import { Component } from '@angular/core';
import { RenderEventHandlerService, WinTitleToolButtonStyle } from '../../elec-relate';
import { AppVersion } from '../../app-common/model/AppVersion';
import { AppMsgStatus } from '../../Components/app-msg/app-msg.component';
import { ConfigKey } from '../../app-common/model/ConfigKey';
import { Router } from '@angular/router';
interface CheckResult {
  errorType: 'ip' | 'port' | 'register' | 'init';
  msg: string;
}
@Component({
  selector: 'app-config-check',
  templateUrl: './config-check.component.html',
  styleUrls: ['./config-check.component.scss']
})
export class ConfigCheckComponent {
  checkDelay = 200;
  toolButtons = [];
  msg = '检查配置......';
  msgStatus: AppMsgStatus;
  flushDisabled = true;
  configDisabled = true;
  constructor(private _renderHandler: RenderEventHandlerService, private _router: Router) {
    const closeButton: WinTitleToolButtonStyle = new WinTitleToolButtonStyle('close');
    closeButton.bgColor = {
      normal: 'rgba(245, 105, 92,.5)',
      hover: 'rgb(245, 105, 92)'
    };
    closeButton.iconColor = {
      normal: '#FFF',
      hover: '#ffffff'
    };
    closeButton.clickHandler = () => {
      this._renderHandler.close('config-check');
    };
    this.toolButtons.push(closeButton);
    this._do_config_check();
  }
  version(): string {
    // return '123';
     return this._renderHandler.getCache().versionStr;
  }
  reCheck() {
    this.msgStatus = 'normal';
    this.flushDisabled = true;
    this.configDisabled = true;
    this._do_config_check();
  }
  private _check_ip() {
    const ip = this._renderHandler.readConfig(ConfigKey.CenterIP);
    return new Promise((resolve, reject) => {
      if (ip && ip.trim().length > 0) {
        resolve();
      } else {
        const ipRet: CheckResult = {
          errorType: 'ip',
          msg: 'Center IP 配置异常！'
        };
        reject(ipRet);
      }
    });
  }
  private _check_port() {
    const port = this._renderHandler.readConfig(ConfigKey.CenterPort);
    return new Promise((resolve, reject) => {
      if (port && port.trim().length > 0) {
        resolve();
      } else {
        const ipRet: CheckResult = {
          errorType: 'port',
          msg: 'Center PORT 配置异常！'
        };
        reject(ipRet);
      }
    });
  }
  private _check_register() {
    return new Promise((resolve, reject) => {
      const version = this._renderHandler.getCache().version;
      this._renderHandler.doRegister({
        version: version
      }).then(() => {
        resolve();
      }).catch((err) => {
        const ipRet: CheckResult = {
          errorType: 'register',
          msg: err.errorMsg
        };
        reject(ipRet);
      });
    });
  }
  private _solve_check_error(ret: CheckResult) {
    switch (ret.errorType) {
      case 'init':
        break;
      case 'ip':
        this.configDisabled = false;
        break;
      case 'port':
        this.configDisabled = false;
        break;
      case 'register':
        this.configDisabled = false;
        this.flushDisabled = false;
        break;
      default:
        break;
    }
    this.msgStatus = 'error';
    this.msg = ret.msg;
  }
  private _do_config_check() {
    this._renderHandler.initConfig({version: AppVersion.V5, versionStr: 'v5.0.1-release'}).then((data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.msg = '检查 Center IP ......';
          resolve();
        }, this.checkDelay);
      });
    }, (err) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject({
            errorType: 'init',
            msg: '配置文件操作异常！'
          });
        }, this.checkDelay);
      });
    }).then(() => {
      return this._check_ip();
    }).then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.msg = '检查 Center PORT ......';
          resolve();
        }, this.checkDelay);
      });
    }).then(() => {
      return this._check_port();
    }).then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.msg = '检查终端注册状态 ......';
          resolve();
        }, this.checkDelay);
      });
    }).then(() => {
      return this._check_register();
    }).then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.msg = '配置检测成功！';
          this.msgStatus = 'success';
          resolve();
        }, this.checkDelay);
      });
    }).then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, this.checkDelay);
      });
    }).then(() => {
      // TODO: Config Check Succeeded
      this._trans_to_login();
    }).catch((err) => {
      this._solve_check_error(err);
    });
  }
  showConfig() {
    let center_ip = this._renderHandler.readConfig(ConfigKey.CenterIP);
    if (!center_ip) {
      center_ip = '';
    }
    let center_port = this._renderHandler.readConfig(ConfigKey.CenterPort);
    if (!center_port) {
      center_port = '';
    }
    this._renderHandler.showConfigSet().then((data: any) => {
      if (data.value === 'success') {
        this._trans_to_login();
      } else {
        this._renderHandler.writeConfig(ConfigKey.CenterIP, center_ip);
        this._renderHandler.writeConfig(ConfigKey.CenterPort, center_port);
      }
    });
  }
  private _trans_to_login() {
    this._renderHandler.transToLogin();
    this._router.navigate(['/login-win']);
  }
}

