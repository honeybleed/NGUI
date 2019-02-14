import { Injectable, Optional } from '@angular/core';
import { IconConfig } from '../common-model';

@Injectable()
export class IconService {
  iconConfig: IconConfig;
  constructor(@Optional() config: IconConfig) {
    if (config) {
      this.iconConfig = config;
    } else {
      throw  new Error('IconModule must set a IconConfig!');
    }
  }
  getFontFamily(): string {
    return this.iconConfig.fontFamily;
  }
  getIconMap(): any {
    return this.iconConfig.iconMap;
  }
  getIconCode(tag: string): string {
    return this.iconConfig.iconMap[tag];
  }
}
