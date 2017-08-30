import {ValidateHandlerInterface} from './ValidateHandlerInterface';

export class EmptyValidateHandler implements ValidateHandlerInterface {
  errorMsg: string;
  constructor(errorMsg: string) {
    this.errorMsg = errorMsg;
  }
  valid(name: string): {ret: boolean, msg: string} {
    if (name && name.trim() !== '') {
      return {
        ret: true,
        msg: 'name'
      };
    } else {
      return {
        ret: false,
        msg: this.errorMsg
      };
    }
  }
}
export class LengthValidateHandler implements ValidateHandlerInterface {
  min: number;
  max: number;
  errorMsg: string;
  constructor(min: number, max: number, errorMsg: string) {
    this.max = max;
    this.min = min;
    this.errorMsg = errorMsg;
  }
  valid(value: string): { ret: boolean; msg: string } {
    if (value.length < this.min) {
      return {
        ret: false,
        msg: this.errorMsg
      };
    }
    if (value.length > this.max) {
      return {
        ret: false,
        msg: this.errorMsg
      };
    }
    return {
      ret: true,
      msg: ''
    };
  }
}
