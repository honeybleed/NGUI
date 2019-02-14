export class DropItemInfo {
  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }
  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }
  get theme(): string {
    return this._theme;
  }

  set theme(value: string) {
    this._theme = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  private _name: string;
  private _theme: string;
  private _disabled: boolean;
  private _icon: string;
  private _label: string;
  private _data: any;
  constructor(name: string, icon: string, label: string) {
    this.name = name;
    this.icon = icon;
    this.label = label;
    this.disabled = false;
    this.theme = null;
  }
}
