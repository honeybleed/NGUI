import {
  Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { VMObj } from '../../app-common/model/VMObj';
import { RenderEventHandlerService } from '../../elec-relate';
import { ConfigKey } from '../../app-common/model/ConfigKey';
import { DropItemInfo } from '../../ui/drop-list/drop-item/DropItemInfo';
import { PopupLayerService } from '../popup-layer/popup-layer.service';
import { RunVmMessageBoxComponent } from '../../Views/messagg-box/run-vm-message-box/run-vm-message-box.component';
import { RerunVmMessageBoxComponent } from '../../Views/messagg-box/rerun-vm-message-box/rerun-vm-message-box.component';
import { StopVmMessageBoxComponent } from '../../Views/messagg-box/stop-vm-message-box/stop-vm-message-box.component';
import { ErrorMessageBoxComponent } from '../../Views/messagg-box/error-message-box/error-message-box.component';

@Component({
  selector: 'app-vm-item',
  templateUrl: './vm-item.component.html',
  styleUrls: ['./vm-item.component.scss']
})
export class VmItemComponent implements OnInit, OnDestroy, DoCheck {
  @Input() vm: VMObj;
  @Output() remoteRequest = new EventEmitter();
  spiceText: string;
  runAction = new DropItemInfo('start', 'run', '启动');
  stopAction = new DropItemInfo('shutdown', 'stop', '关闭');
  reAction = new DropItemInfo('restart', 'rerun', '重启');
  powerActions: DropItemInfo[] = [];
  constructor( private _renderHandler: RenderEventHandlerService , private _popupService: PopupLayerService) {
    this.spiceText = this._renderHandler.readConfig(ConfigKey.SpiceText);
    this.powerActions.push(this.runAction, this.reAction, this.stopAction);
  }
  ngDoCheck(): void {
    if (this.vm.status === 'Running') {
      this.runAction.disabled = true;
      this.stopAction.disabled = false;
      this.reAction.disabled = false;
    } else {
      this.runAction.disabled = false;
      this.stopAction.disabled = true;
      this.reAction.disabled = true;
    }
  }
  ngOnInit() {

  }
  copy(id: string) {
    console.dir(this.vm);
    this._renderHandler.copy(id);
  }
  vm_os_icon(): string {
    if (this.vm.osType === 'Windows') {
      return 'windows';
    } else if (this.vm.osType === 'Linux') {
      return 'linux';
    } else {
      return 'unknown';
    }
  }
  click() {
    this.remoteRequest.emit(this.vm);
    this._renderHandler.callSpice(this.vm.hostip, this.vm.spicePort);
  }
  power(actionData) {
    switch (actionData.action) {
      case 'start':
        this._runVM();
        break;
      case 'restart':
        this._rerunVM();
        break;
      case 'shutdown':
        this._stopVM();
        break;
    }
    this._renderHandler.doVMPowerAction({
      version: this._renderHandler.getCache().version,
      args: {
        vmid: this.vm.id,
        sessionID: this._renderHandler.getCache().sessionid,
        action: actionData.action
      }
    }).catch((err) => {
      console.error(err);
      const errorMsg = '电源操作异常：[' + err.errorNo + ': ' + err.errorMsg + ']';
      this._popupService.setContent(ErrorMessageBoxComponent, {errorMsg: errorMsg});
      this._popupService.showLayer();
    }).then((data) => {
      console.dir(data);
    });
  }
  private _runVM() {
    this._popupService.setContent(RunVmMessageBoxComponent, null).then((comp) => {
      comp.instance['vmName'] = this.vm.name;
    });
    this._popupService.showLayer();
  }
  private _rerunVM() {
    this._popupService.setContent(RerunVmMessageBoxComponent, null).then((comp) => {
      comp.instance['vmName'] = this.vm.name;
    });
    this._popupService.showLayer();
  }
  private _stopVM() {
    this._popupService.setContent(StopVmMessageBoxComponent, null).then((comp) => {
      comp.instance['vmName'] = this.vm.name;
    });
    this._popupService.showLayer();
  }
  ngOnDestroy(): void {
  }
}
