import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelTextInputComponent } from './label-text-input/label-text-input.component';
import { IconModule } from '../icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    FormsModule
  ],
  declarations: [LabelTextInputComponent],
  exports: [LabelTextInputComponent]
})
export class TextInputModule { }
