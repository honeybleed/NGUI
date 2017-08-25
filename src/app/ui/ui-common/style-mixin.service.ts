import { Injectable } from '@angular/core';
import { StyleObj, StyleObjGroup } from './styleModel';

@Injectable()
export class StyleMixinService {

  constructor() { }
  mixStyle( targetStyle: StyleObj, attachStyle: StyleObj ): void {
    for ( const item of Object.getOwnPropertyNames(attachStyle) ) {
      targetStyle[item] = {...targetStyle[item], ...attachStyle[item]};
    }
  }
  mixStyleGroup(targetStyleGroup: StyleObjGroup, attachStyleGroup: StyleObjGroup): void {
    for ( const  status of Object.getOwnPropertyNames(attachStyleGroup)){
      const styleWithStatus = attachStyleGroup[status];
      for (const event of Object.getOwnPropertyNames(styleWithStatus)){
        targetStyleGroup[status][event] = {...targetStyleGroup[status][event], ...attachStyleGroup[status][event]};
      }
    }
  }
}
