import { Component } from '@angular/core';
import { TextInputSI } from '../../ui';
import { EmptyValidateHandler, LengthValidateHandler, ValidateHandlerInterface } from '../../ui/common-model';
import { RenderEventHandlerService, WinTitleToolButtonStyle } from '../../elec-relate';
import { AppVersion } from '../../app-common/model/AppVersion';
import { DoLoginReplyV3, DoLoginReplyV5 } from '../../app-common/model/APIModel/DoLogin';
import { AppCacheService } from '../../global';

@Component({
  selector: 'app-config-check',
  templateUrl: './config-check.component.html',
  styleUrls: ['./config-check.component.scss']
})
export class ConfigCheckComponent {
  title = 'app';
  placeholder = '请输入用户名';
  isDisabled = false;
  ddd = false;
  inputValue = '';
  label= '用户名';
  testSi: TextInputSI = {
    empty: 'error',
    error: 'alert',
    success: 'right'
  };
  titleIcon = 'logo';
  toolButtons = [];
  validateHandler: ValidateHandlerInterface[] = [new EmptyValidateHandler('用户名不能为空'),
    new LengthValidateHandler(5, 14, '用户名长度在5~14之间')];
  constructor(private _renderHandler: RenderEventHandlerService, private _appCache: AppCacheService) {
    this._renderHandler.initConfig({version: AppVersion.V3, versionStr: 'v3.0.1'}).then((data) => {
      console.dir(data);
    });
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
      this._renderHandler.close();
    };
    this.toolButtons.push(closeButton);
  }
  reg(): void {
    console.log('doreg');
    this._renderHandler.doRegister({version: AppVersion.V5}).then((data) => {
      console.dir('success' + data);
    }).catch((err) => {
      console.dir(err);
    });
  }
  login(): void {
    this._renderHandler.doLogin({
      version: AppVersion.V5,
      args: {
        username: 'henry',
        password: 'hellohenry',
        admin: 'admin'
      }
    }).then((data: DoLoginReplyV5) => {
      console.dir(data);
      this.inputValue = '123123123';
      console.dir(this._appCache);
    }).catch((err) => {
      console.dir(err);

    });
  }
  vms(): void {
    this._renderHandler.doGetVMs({
      version: AppVersion.V5,
      args: {
        id: this._appCache.userid,
        sessionID: this._appCache.sessionid
      }
    }).then((ret) => {
      console.dir(ret);
    }).catch((err) => {
      console.dir(err);
    });
  }
  btClick() {
    console.log('click');
    this._renderHandler.showNew();
  }
}
