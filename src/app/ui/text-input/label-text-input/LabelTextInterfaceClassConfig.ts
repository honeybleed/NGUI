import {ComponentClassInterface} from '../../common-model';
export type LabelTextInputEvents = 'hover'| 'focus';
export type LabelTextInputStatus = null|'normal'|'error'|'success';
export class LabelTextInterfaceClassConfig implements ComponentClassInterface {
  disabled = false;
  events = {
    'hover': false,
    'focus': false
  };
  status: LabelTextInputStatus = null;
  theme = null;
  setEvent(name: LabelTextInputEvents): void {
    this.events[name] = true;
  }
  unSetEvent(name: LabelTextInputEvents): void {
    this.events[name] = false;
  }
  changeStatus(status: LabelTextInputStatus): void {
    this.status = status;
  }
  setTheme(theme: string): void {
    this.theme = theme;
  }
  dumpClasses(): string[] {
    const ret = [];
    if (this.disabled) {
      ret.push('disabled');
      return ret;
    }
    for ( const name of Object.getOwnPropertyNames(this.events) ){
      if (this.events[name]) {
        ret.push(name);
      }
    }
    if (this.status) {
      ret.push(this.status);
    }
    if (this.theme) {
      ret.push(this.theme);
    }
    return ret;
  }
}
