import { ComponentClassInterface } from '../../common-model';
export type DropListEvent = 'hover' | 'down' | 'dropdown';
export class DropListInterfaceClassConfig implements ComponentClassInterface {
  disabled = false;
  events = {
    hover: false,
    down: false,
    dropdown: false
  };
  status = null;
  theme = null;
  setEvent(name: DropListEvent) {
    this.events[name] = true;
  }
  unSetEvent(name: DropListEvent) {
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
