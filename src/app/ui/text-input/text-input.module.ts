import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelTextInputComponent } from './label-text-input/label-text-input.component';
import { IconModule } from '../icon';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
  ],
  declarations: [LabelTextInputComponent],
  exports: [LabelTextInputComponent]
})
export class TextInputModule { }
