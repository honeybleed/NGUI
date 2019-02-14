import { ValidateHandlerInterface } from '../../ui/common-model';

export class NotEmptyValidator implements ValidateHandlerInterface {
  errorMsg: string;
  constructor(errorMsg: string) {
    this.errorMsg = errorMsg;
  }
  valid(value: string): { ret: boolean; msg: string } {
    if (value && value.trim() !== '') {
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
