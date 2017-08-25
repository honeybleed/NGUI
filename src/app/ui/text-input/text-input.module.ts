import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelTextInputComponent } from './label-text-input/label-text-input.component';
import { IconModule } from '../icon/icon.module';
import { UiCommonModule } from '../ui-common/ui-common.module';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    UiCommonModule
  ],
  declarations: [LabelTextInputComponent],
  exports: [LabelTextInputComponent]
})
export class TextInputModule { }
