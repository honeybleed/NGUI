import { Injectable, Optional } from '@angular/core';
import { IconConfig } from './icon-config';

@Injectable()
export class IconService {
  fontFamily: string;
  iconMap: Map<string, string>;
  constructor(@Optional() config: IconConfig) {
    if (config) {
      this.fontFamily = config.fontFamily;
      this.iconMap = config.iconMap;
    } else {
      throw  new Error('IconModule must set a IconConfig!');
    }
  }
  getFontFamily(): string {
    return this.fontFamily;
  }
  getIconMap(): Map<string, string> {
    return this.iconMap;
  }
  getIconCode(tag: string): string {
    return this.iconMap.get(tag);
  }
}
