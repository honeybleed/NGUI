export class WinTitleToolButtonStyle {
  set fontSize(value: number) {
    this._fontSize = value;
  }
  get icon(): string {
    return this._icon;
  }
  set bgColor(value: { normal: string; hover: string }) {
    this._bgColor = value;
  }
  set iconColor(value: { normal: string; hover: string }) {
    this._iconColor = value;
  }
  set height(value: number) {
    this._height = value;
  }
  set width(value: number) {
    this._width = value;
  }
  private _icon: string;
  private _fontSize: number;
  private _width: number;
  private _height: number;
  private _iconColor: {
    normal: string;
    hover: string;
  };
  private _bgColor: {
    normal: string;
    hover: string;
  };
  clickHandler: () => void;
  constructor(iconTag: string) {
    this._icon = iconTag;
    this._width = 20;
    this._height = 20;
    this._fontSize = 20;
    this._bgColor = {
      normal: 'rgba(255,255,255,.2)',
      hover: 'rgba(0,0,0,.2)'
    };
    this._iconColor = {
      normal: '#fff',
      hover: '#fff'
    };
  }
  normalStyle() {
    return {
      'width': this._width + 'px',
      'height': this._height + 'px',
      'background-color': this._bgColor.normal,
      'color': this._iconColor.normal,
      'font-size': this._fontSize + 'px',
      'line-height': this._height + 'px'
    };
  }
  hoverStyle() {
    return {
      'width': this._width + 'px',
      'height': this._height + 'px',
      'background-color': this._bgColor.hover,
      'color': this._iconColor.hover,
      'font-size': this._fontSize + 'px',
      'line-height': this._height + 'px'
    };
  }
}
