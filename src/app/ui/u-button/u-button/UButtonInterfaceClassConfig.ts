import { ComponentClassInterface } from '../../common-model';
export type UButtonEvents = 'hover'|'down'|'focus';
export class UButtonInterfaceClassConfig implements ComponentClassInterface {
  events = {
    'hover': false,
    'down': false,
    'focus': false
  };
  status = null;
  theme = null;
  disabled = false;
  setEvent(name: UButtonEvents): void {
    this.events[name] = true;
  }
  unSetEvent(name: UButtonEvents): void {
    this.events[name] = false;
  }
  dumpClasses(): string[] {
    const ret = [];
    if (this.disabled) {
      ret.push('disabled');
      return ret;
    }
    for (const name of Object.getOwnPropertyNames(this.events)) {
      if (this.events[name]) {
        ret.push(name);
      }
    }
    if (this.theme) {
      ret.push(this.theme);
    }
    return ret;
  }
}
