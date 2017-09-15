import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UButtonComponent } from './u-button/u-button.component';
import { IconModule } from '../icon';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [UButtonComponent],
  exports: [UButtonComponent]
})
export class UButtonModule { }
