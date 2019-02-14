import { Component, OnInit } from '@angular/core';
import { PopupLayerService } from '../../../Components/popup-layer/popup-layer.service';

@Component({
  selector: 'app-rerun-vm-message-box',
  templateUrl: './rerun-vm-message-box.component.html',
  styleUrls: ['./rerun-vm-message-box.component.scss']
})
export class RerunVmMessageBoxComponent implements OnInit {

  vmName: string;
  buttonText = '';
  intervalID;
  countSecond = 3;
  constructor(private _popupLayerService: PopupLayerService) {
    this.countSecond = 3;
    this.buttonText = '确定(' + this.countSecond + ')';
    this.intervalID = setInterval(() => {
      this.countSecond --;
      this.buttonText = '确定(' + this.countSecond + ')';
      if (this.countSecond === 0) {
        clearInterval(this.intervalID);
        this._popupLayerService.hideLayer();
      }
    }, 1000);
  }

  ngOnInit() {
  }
  click() {
    clearInterval(this.intervalID);
    this._popupLayerService.hideLayer();
  }

}
