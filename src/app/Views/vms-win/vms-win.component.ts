import { Component, OnInit } from '@angular/core';
import { RenderEventHandlerService } from '../../elec-relate';
import { WinTitleToolButtonStyle } from '../../elec-relate/win-title-tool-button/WinTitleToolButtonStyle';
import { VMObj } from '../../app-common/model/VMObj';
import { AppVersion } from '../../app-common/model/AppVersion';
import { DoGetVMReplyV3, DoGetVMReplyV5 } from '../../app-common/model/APIModel/DoGetVM';
import { Router } from '@angular/router';
import { ConfigKey } from '../../app-common/model/ConfigKey';

@Component({
  selector: 'app-vms-win',
  templateUrl: './vms-win.component.html',
  styleUrls: ['./vms-win.component.scss']
})
export class VmsWinComponent implements OnInit {
  autoLoadId: any;
  autoLoadDelay = 5000;
  checkDelay = 1500;
  toolButtons = [];
  vms: VMObj[];
  title = '';
  isMax = false;
  msgStatus = 'normal';
  msg = '正在载入......';
  showMsg = true;
  appVersion: AppVersion;
  isLoading = false;
  constructor(private _renderHandler: RenderEventHandlerService, private _router: Router) {
    this._fill_tool_buttons();
    this.title = 'OCTDesk ' + '[' + this._renderHandler.getCache().versionStr + '] [' + this._renderHandler.getCache().username + ']';
    this.appVersion = this._renderHandler.getCache().version;
    this._load_vms();
  }
  private _update_vm_obj(target: VMObj, fill: VMObj) {
    target.name = fill.name;
    target.account = fill.account;
    target.pwd = fill.pwd;
    target.osType = fill.osType;
    target.osStr = fill.osStr;
    target.mac = fill.mac;
    target.id = fill.id;
    target.status = fill.status;
    target.ip = fill.ip;
    target.hostip = fill.hostip;
    target.spicePort = fill.spicePort;
    target.hasRDP = fill.hasRDP;
    target.RDPText = fill.RDPText;
    target.hasSpice = fill.hasSpice;
    target.SpiceText = fill.SpiceText;
    target.version = fill.version;
  }
  private _fill_tool_buttons() {
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
      this._renderHandler.close('vms-win', 'fail');
    };
    const maxButton: WinTitleToolButtonStyle = new WinTitleToolButtonStyle('max');
    maxButton.clickHandler = () => {
      if (this.isMax) {
        this.isMax = false;
        maxButton.icon = 'max';
        this._renderHandler.unMaximize();
      } else {
        this.isMax = true;
        maxButton.icon = 'normal';
        this._renderHandler.maximize();
      }
    };
    const minButton: WinTitleToolButtonStyle = new WinTitleToolButtonStyle('min');
    minButton.clickHandler = () => {
      this._renderHandler.minimize();
    };
    const infoButton: WinTitleToolButtonStyle = new WinTitleToolButtonStyle('alert');
    infoButton.clickHandler = () => {
      this.showAppInfo();
    };
    const configButton: WinTitleToolButtonStyle = new WinTitleToolButtonStyle('config');
    configButton.clickHandler = () => {
      this.showConfig();
    };
    const flushButton: WinTitleToolButtonStyle = new WinTitleToolButtonStyle('flush');
    flushButton.clickHandler = () => {
      if (!this.isLoading) {
        this._load_vms();
      }
    };
    const logoutButton: WinTitleToolButtonStyle = new WinTitleToolButtonStyle('logout');
    logoutButton.clickHandler = () => {
      return this._trans_to_login();
    };
    this.toolButtons.push(logoutButton, flushButton, configButton, infoButton, minButton, maxButton, closeButton);
  }
  ngOnInit() {
  }
  private _update_vm_list(vms: VMObj[]) {
    for (let i = 0; i < this.vms.length; i++) {
      const matchIndex = vms.findIndex((item) => {
        return this.vms[i].id === item.id;
      });
      if (matchIndex < 0) {
        // todo: find deleted vm index;
        this.vms.splice(i, 1);
      }
    }
    for (const vm of vms) {
      const matchIndex = this.vms.findIndex((item, index) => {
        return item.id === vm.id;
      });
      if (matchIndex < 0) {
        this.vms.push(vm);
      } else {
         this._update_vm_obj(this.vms[matchIndex], vm);
      }
    }
  }
  private _auto_reload() {
    this._renderHandler.doGetVMs({
      version: this._renderHandler.getCache().version,
      args: {
        id: this._renderHandler.getCache().userid,
        sessionID: this._renderHandler.getCache().sessionid
      }
    }).then((data) => {
      let newVms = [];
        if (this.appVersion === AppVersion.V3) {
          const v3Data = data as DoGetVMReplyV3;
          newVms = v3Data.data;
        } else {
          const v5Data = data as DoGetVMReplyV5;
          newVms = v5Data.data.vms;
        }
        this._update_vm_list(newVms);
    }).catch((err) => {
      console.error(err);
    });
  }
  private _load_vms() {
    clearInterval(this.autoLoadId);
    this.vms = [];
    this.isLoading = true;
    this.msgStatus = 'normal';
    this.msg = '正在载入......';
    this.showMsg = true;
    this._renderHandler.doGetVMs({
      version: this._renderHandler.getCache().version,
      args: {
        id: this._renderHandler.getCache().userid,
        sessionID: this._renderHandler.getCache().sessionid
      }
    }).then((data) => {
      setTimeout(() => {
        if (this.appVersion === AppVersion.V3) {
          const v3Data = data as DoGetVMReplyV3;
          this.vms = v3Data.data;
        } else {
          const v5Data = data as DoGetVMReplyV5;
          this.vms = v5Data.data.vms;
        }
        this.showMsg = false;
        this.isLoading = false;
        this.autoLoadId = setInterval(() => { this._auto_reload(); }, this.autoLoadDelay);
      }, this.checkDelay);
    }).catch((err) => {
      setTimeout(() => {
        this.msgStatus = 'error';
        this.msg = '载入失败：' + err.errorMsg;
        this.isLoading = false;
      }, this.checkDelay);
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
        return this._trans_to_login();
      } else {
        this._renderHandler.writeConfig(ConfigKey.CenterIP, center_ip);
        this._renderHandler.writeConfig(ConfigKey.CenterPort, center_port);
      }
    });
  }
  showAppInfo() {
    this._renderHandler.showInfoWin();
  }
  private _trans_to_login() {
    this._renderHandler.transToLogin();
    return this._router.navigate(['/login-win']);
  }
}
