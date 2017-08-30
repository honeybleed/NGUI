import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TextInputSI } from './TextInputSI';
import { ValidateHandlerInterface } from '../../common-model';
import { LabelTextInterfaceClassConfig } from './LabelTextInterfaceClassConfig';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-label-text-input',
  templateUrl: './label-text-input.component.html',
  styleUrls: ['./label-text-input.component.scss']
})
export class LabelTextInputComponent extends LabelTextInterfaceClassConfig implements OnInit {
  get validateRet(): { ret: boolean; msg: string } {
    return this._validateRet;
  }

  set validateRet(value: { ret: boolean; msg: string }) {
    this._validateRet = value;
  }
  @Input() label = 'label';
  @Input() placeHolder = 'please type in some word';
  @Input() isPassword = false;
  @Input() id: string ;
  @Input() name: string;
  @Input() si: TextInputSI;
  @Input() theme: string;
  @Input() info: string;
  @Input() validateHandler: ValidateHandlerInterface[];
  private _validateRet: {ret: boolean, msg: string};
  constructor() {
    super();
  }
  enter() {
    this.setEvent('hover');
  }
  leave() {
    this.unSetEvent('hover');
  }
  focus() {
    this.setEvent('focus');
  }
  blur() {
    this.unSetEvent('focus');
  }
  input(event) {
    let ret: {ret: boolean, msg: string} = {
      ret: true,
      msg: this.info
    };
    for (const handler of this.validateHandler) {
      const tmp = handler.valid(event.target.value);
      if (!tmp.ret) {
        ret = tmp;
        break;
      }
    }
    if (ret.ret) {
      this.changeStatus('success');
    } else {
      this.changeStatus('error');
    }
    this.validateRet = ret;
  }
  siTag() {
    switch (this.status) {
      case null:
        return this.si.empty;
      case 'normal':
        return this.si.empty;
      case 'success':
        return this.si.success;
      case 'error':
        return this.si.error;
    }
  }
  ngOnInit() {
    this.validateRet = {
      ret: false,
      msg: this.info
    };
  }
}
