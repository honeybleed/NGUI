import { Component, OnInit } from '@angular/core';
import { AppMsgStatus } from '../../Components/app-msg/app-msg.component';
import { RenderEventHandlerService } from '../../elec-relate';
import { WinTitleToolButtonStyle } from '../../elec-relate/win-title-tool-button/WinTitleToolButtonStyle';
import { ConfigKey } from '../../app-common/model/ConfigKey';
import { ValidateHandlerInterface } from '../../ui/common-model';
import { NotEmptyValidator } from '../../app-common/validateHandler/NotEmptyValidator';
import { IPAddressValidator } from '../../app-common/validateHandler/IPAddressValidator';
import { PortNumberValidator } from '../../app-common/validateHandler/PortNumberValidator';
import { AppVersion } from '../../app-common/model/AppVersion';

@Component({
  selector: 'app-config-set',
  templateUrl: './config-set.component.html',
  styleUrls: ['./config-set.component.scss']
})
export class ConfigSetComponent implements OnInit {
  checkDelay = 200;
  inputSI = {
    empty: 'right',
    error: 'alert',
    success: 'right'
  };
  ip = '';
  port = '';
  ipValue = '';
  portValue = '';
  toolButtons = [];
  allowIPValidate = true;
  allowPortValidate = true;
  msg = '填写或编辑配置信息......';
  msgStatus: AppMsgStatus;
  registerDisabled = true;
  ipValidateHandlers: ValidateHandlerInterface[];
  portValidateHandlers: ValidateHandlerInterface[];
  ipValidateResult: {ret: boolean, msg: string};
  portValidateResult: {ret: boolean, msg: string};
  constructor(private _renderHandler: RenderEventHandlerService) {
    this.ipValidateHandlers = [new NotEmptyValidator('Center IP 不能为空'), new IPAddressValidator('Center IP 地址格式错误 (IP v4 地址格式)')];
    this.portValidateHandlers = [new NotEmptyValidator('Center Port 不能为空'), new PortNumberValidator('Center Port 格式错误 (0 - 65535 整数)')];
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
      this._renderHandler.close('config-set', 'fail');
    };
    this.toolButtons.push(closeButton);
    this.ipValidateResult = {
      ret: false,
      msg: ''
    };
    this.portValidateResult = {
      ret: false,
      msg: ''
    };
  }
  clientID(): string {
    return this._renderHandler.readConfig(ConfigKey.ClientID);
  }
  ngOnInit() {
    this.ipValue = this._renderHandler.readConfig(ConfigKey.CenterIP);
    const port = this._renderHandler.readConfig(ConfigKey.CenterPort);
    if (!port || port.trim().length === 0) {
      this.portValue = this._renderHandler.getCache().version === AppVersion.V3 ? '8080' : '6443';
    } else {
      this.portValue = port;
    }
  }
  ipChange(ip) {
    this.ip = ip;
  }
  portChange(port) {
    this.port = port;
  }
  ipRet (ret) {
    this.ipValidateResult = ret;
    this._control_edit_enable();
  }
  portRet (ret) {
    this.portValidateResult = ret;
    this._control_edit_enable();
  }
  private _control_edit_enable() {
    this.registerDisabled = !(this.ipValidateResult.ret && this.portValidateResult.ret);
  }
  doRegister() {
    this.msgStatus = 'normal';
    this.msg = '提交注册信息......';
    this.registerDisabled = true;
    this._renderHandler.writeConfig(ConfigKey.CenterIP, this.ip);
    this._renderHandler.writeConfig(ConfigKey.CenterPort, this.port);
      const version = this._renderHandler.getCache().version;
      this._renderHandler.doRegister({
        version: version
      }).then(() => {
        this.msg = '注册成功！';
        this.msgStatus = 'success';
        setTimeout(() => {
          this._renderHandler.close('config-set', 'success');
        }, this.checkDelay);
      }).catch((err) => {
        setTimeout(() => {
          this.msg = err.errorMsg;
          this.msgStatus = 'error';
          this.registerDisabled = false;
        }, this.checkDelay);
      });
  }
}
