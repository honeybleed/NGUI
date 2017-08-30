import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { IconConfig } from '../common-model';
import { IconService } from './icon.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IconComponent],
  providers: [IconService],
  exports: [IconComponent]
})
export class IconModule {
  constructor (@Optional() @SkipSelf() parentModule: IconModule) {
    if (parentModule) {
      throw new Error('IconModule is Loaded already!');
    }
  }
  static  forRoot(config: IconConfig): ModuleWithProviders {
    return {
      ngModule: IconModule,
      providers: [
        {provide: IconConfig, useValue: config}
      ]
    };
  }
}
