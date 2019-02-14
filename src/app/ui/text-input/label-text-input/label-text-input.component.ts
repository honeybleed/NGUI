import {
  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { TextInputSI } from './TextInputSI';
import { ValidateHandlerInterface } from '../../common-model';
import { LabelTextInterfaceClassConfig } from './LabelTextInterfaceClassConfig';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-label-text-input',
  templateUrl: './label-text-input.component.html',
  styleUrls: ['./label-text-input.component.scss']
})
export class LabelTextInputComponent extends LabelTextInterfaceClassConfig implements OnChanges {
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
  @Input() disabled: boolean;
  @Input() info: string;
  @Input() validateHandler: ValidateHandlerInterface[];
  @Output() valueChange = new EventEmitter();
  @Input() value;
  @Output() validateFail = new EventEmitter();
  @Input() allowValidate: boolean;
  @Input() inputWidth: number;
  @Input() labelWidth: number;
  @Input() labelAlign: string;
  private _validateRet: {ret: boolean, msg: string};
  constructor() {
    super();
    this.validateRet = {
      ret: false,
      msg: this.info
    };
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
    if (this.allowValidate) {
      let ret: {ret: boolean, msg: string} = {
        ret: true,
        msg: this.info
      };
      if (!this.validateHandler) {
        this.validateHandler = [];
      }
      for (const handler of this.validateHandler) {
        const tmp = handler.valid(event);
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
      this.validateFail.emit(this.validateRet);
    }
    this.valueChange.emit(event);
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
  ngOnChanges(changes: SimpleChanges): void {
    const valueChange = changes['value'];
    setTimeout(() => {
      this.input(valueChange.currentValue ? valueChange.currentValue : '');
    });
  }
}
