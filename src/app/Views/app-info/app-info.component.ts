import { Component, OnInit } from '@angular/core';
import { RenderEventHandlerService } from '../../elec-relate';
import { WinTitleToolButtonStyle } from '../../elec-relate/win-title-tool-button/WinTitleToolButtonStyle';
import { ConfigKey } from '../../app-common/model/ConfigKey';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss']
})
export class AppInfoComponent implements OnInit {
  changeBootDisabled = true;
  withBoot = false;
  toolButtons = [];
  clientID: string;
  clientVer: string;
  centerIP: string;
  centerPort: string;
  userID: string;
  userName: string;
  constructor(private _renderHandler: RenderEventHandlerService) {
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
      this._renderHandler.close('app-info-win', 'fail');
    };
    this.toolButtons.push(closeButton);
  }

  ngOnInit() {
    const cache = this._renderHandler.getCache();
    this.clientID = this._renderHandler.readConfig(ConfigKey.ClientID);
    this.clientVer = cache.versionStr;
    this.centerIP = this._renderHandler.readConfig(ConfigKey.CenterIP);
    this.centerPort = this._renderHandler.readConfig(ConfigKey.CenterPort);
    this.userID = cache.userid;
    this.userName = cache.username;
  }
  private _init_with_boot() {
    this.withBoot = false;
  }
  check(value: boolean) {
    console.log('with boot: ' + value);
  }
}
