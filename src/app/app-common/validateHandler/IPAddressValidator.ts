import { ValidateHandlerInterface } from '../../ui/common-model';

export class IPAddressValidator implements ValidateHandlerInterface {
  errorMsg: string;
  regStr = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
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
