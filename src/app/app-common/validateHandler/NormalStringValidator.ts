import { ValidateHandlerInterface } from '../../ui/common-model';

export class NormalStringValidator implements ValidateHandlerInterface {
  errorMsg: string;
  regStr = /^[a-zA-Z0-9_]+$/;
  constructor(errorMsg: string) {
    this.errorMsg = errorMsg;
  }

  valid(value: string): { ret: boolean; msg: string } {
    if (value.match(this.regStr)) {
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
