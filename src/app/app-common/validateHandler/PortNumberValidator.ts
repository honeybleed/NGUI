import { ValidateHandlerInterface } from '../../ui/common-model';

export class PortNumberValidator implements ValidateHandlerInterface {
  regStr = /^[0-9]+[0-9]*]*$/;
  errorMsg: string;
  constructor(errorMsg: string) {
    this.errorMsg = errorMsg;
  }
  valid(value: string): { ret: boolean; msg: string } {
    if (value.match(this.regStr) && Number(value) >= 0 && Number(value) <= 65525) {
      return {
        ret: true,
        msg: ''
      };
    } else {
      return {
        ret: false,
        msg: this.errorMsg
      };
    }
  }
}

