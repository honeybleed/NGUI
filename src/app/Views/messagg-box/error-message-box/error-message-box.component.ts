import { Component, OnInit } from '@angular/core';
import { PopupLayerService } from '../../../Components/popup-layer/popup-layer.service';

@Component({
  selector: 'app-error-message-box',
  templateUrl: './error-message-box.component.html',
  styleUrls: ['./error-message-box.component.scss']
})
export class ErrorMessageBoxComponent implements OnInit {

  errorMsg: string;
  buttonText = '';
  constructor(private _popupLayerService: PopupLayerService) {
    this.buttonText = '确定';
  }

  ngOnInit() {
  }
  click() {
    this._popupLayerService.hideLayer();
  }

}
