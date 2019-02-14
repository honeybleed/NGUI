import {AfterViewInit, Component} from '@angular/core';
import {RenderEventHandlerService} from '../../elec-relate';
import {WinTitleToolButtonStyle} from '../../elec-relate/win-title-tool-button/WinTitleToolButtonStyle';
import {AppVersion} from '../../app-common/model/AppVersion';
import {ValidateHandlerInterface} from '../../ui/common-model';
import {NotEmptyValidator} from '../../app-common/validateHandler/NotEmptyValidator';
import {NormalStringValidator} from '../../app-common/validateHandler/NormalStringValidator';
import {ConfigKey} from '../../app-common/model/ConfigKey';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-win',
  templateUrl: './login-win.component.html',
  styleUrls: ['./login-win.component.scss']
})
export class LoginWinComponent implements AfterViewInit {
  checkDelay = 200;
  toolButtons = [];
  configDisabled = false;
  loginDisabled = true;
  adminValue = 'admin';
  accountValue = '';
  pwdValue = '';
  isChecked = false;
  inputSI = {
    empty: 'right',
    error: 'alert',
    success: 'right'
  };
  msgStatus= 'normal';
  msg= '请输入登录信息......';
  adminValidateHandlers: ValidateHandlerInterface[];
  accountValidateHandlers: ValidateHandlerInterface[];
  pwdValidateHandlers: ValidateHandlerInterface[];
  adminValidateRet: {ret: boolean, msg: string};
  accountValidateRet: {ret: boolean, msg: string};
  pwdValidateRet: {ret: boolean, msg: string};
  appVersion: AppVersion;
  _admin: string;
  _account: string;
  _pwd: string;
  _keep: boolean;
  constructor(private _renderHandler: RenderEventHandlerService, private _router: Router) {
    const keepUser = this._renderHandler.readConfig(ConfigKey.KeepUser);
    this.appVersion = this._renderHandler.getCache().version;
    this.isChecked = !!(keepUser && keepUser !== 'OFF');
    this._keep = this.isChecked;
    if (this.appVersion === AppVersion.V5) {
      this.adminValidateHandlers = [new NotEmptyValidator('管理员账号不能为空！'), new NormalStringValidator('格式错误(字母、数字、下划线组成字符串)')];
    }
    this.accountValidateHandlers = [new NotEmptyValidator('用户账号不能为空！'), new NormalStringValidator('格式错误(字母、数字、下划线组成字符串)')];
    this.pwdValidateHandlers = [new NotEmptyValidator('用户密码不能为空！'), new NormalStringValidator('格式错误(字母、数字、下划线组成字符串)')];
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
      this._renderHandler.close('login-win', 'fail');
    };
    this.toolButtons.push(closeButton);
    this.accountValidateRet = {
      ret: false,
      msg: ''
    };
    this.adminValidateRet = {
      ret: false,
      msg: ''
    };
    this.pwdValidateRet = {
      ret: false,
      msg: ''
    };
    this._fill_form();
    if ( this.isChecked ) {
      // this.doLogin();
    }
  }
  ngAfterViewInit(): void {
  }

  private _fill_form() {
    if (this.appVersion === AppVersion.V5) {
      const bAdmin = this._renderHandler.readConfig(ConfigKey.Admin);
      if (bAdmin && bAdmin.length > 0) {
        this.adminValue = bAdmin;
      }
    }
    if (this.isChecked) {
      this._account = this._renderHandler.readConfig(ConfigKey.UserName);
      this._pwd = this._renderHandler.doGetTextPwd(this._renderHandler.readConfig(ConfigKey.Password));
      this.accountValue = this._renderHandler.readConfig(ConfigKey.UserName);
      const cipherPwd = this._renderHandler.readConfig(ConfigKey.Password);
      this.pwdValue = this._renderHandler.doGetTextPwd(cipherPwd);
    }
  }
  private _control_login_enable() {
    if (this.appVersion === AppVersion.V5) {
      this.loginDisabled = !(this.accountValidateRet.ret && this.adminValidateRet.ret && this.pwdValidateRet.ret);
    } else {
      this.loginDisabled = !(this.accountValidateRet.ret && this.pwdValidateRet.ret);
    }
  }
  isVersion5(): boolean {
    return this.appVersion !== AppVersion.V3;
    // return true;
  }
  adminChange(admin) {
    this._admin = admin;
  }
  accountChange(account) {
    this._account = account;
  }
  pwdChange(pwd) {
    this._pwd = pwd;
  }
  adminRet(ret) {
    this.adminValidateRet = ret;
    this._control_login_enable();
  }
  accountRet(ret) {
    this.accountValidateRet = ret;
    this._control_login_enable();
  }
  pwdRet(ret) {
    this.pwdValidateRet = ret;
    this._control_login_enable();
  }
  check(value) {
    this._keep = value;
  }
  doLogin() {
    this.configDisabled = true;
    this.loginDisabled = true;
    this.msg = '提交登录请求......';
    this.msgStatus = 'normal';
    if (this._keep) {
      this._renderHandler.writeConfig(ConfigKey.KeepUser, 'ON');
      this._renderHandler.writeConfig(ConfigKey.UserName, this._account);
      this._renderHandler.writeConfig(ConfigKey.Admin, this._admin);
      this._renderHandler.writeConfig(ConfigKey.Password, this._renderHandler.doGetCipherPwd(this._pwd));
    } else {
      this._renderHandler.writeConfig(ConfigKey.KeepUser, 'OFF');
      this._renderHandler.writeConfig(ConfigKey.UserName, '');
      this._renderHandler.writeConfig(ConfigKey.Admin, '');
      this._renderHandler.writeConfig(ConfigKey.Password, '');
    }
    this._renderHandler.doLogin({
      version: this._renderHandler.getCache().version,
      args: {
        username: this._account,
        password: this._renderHandler.doGetCipherPwd(this._pwd),
        admin: this._admin
      }
    }).then((ret) => {
      console.dir(ret);
      return new Promise((resolve) => {
        setTimeout(() => {
          this.msg = '登录成功！';
          this.msgStatus = 'success';
          resolve();
        }, this.checkDelay);
      });
    }).then(() => {
        setTimeout(() => {
          // TODO: Action after login success
          return this._trans_to_vms();
        }, this.checkDelay);
    }).catch((err) => {
      this.msg = err.errorMsg;
      this.msgStatus = 'error';
      this.configDisabled = false;
      this.loginDisabled = false;
    });
  }
  configClick() {
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
      } else {
        this._renderHandler.writeConfig(ConfigKey.CenterIP, center_ip);
        this._renderHandler.writeConfig(ConfigKey.CenterPort, center_port);
      }
    });
  }
  private _trans_to_vms() {
    this._renderHandler.transToVms();
    return this._router.navigate(['/vms-win']);
  }
}
