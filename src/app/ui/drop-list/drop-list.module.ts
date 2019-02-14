import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropListComponent } from './drop-list/drop-list.component';
import { DropItemComponent } from './drop-item/drop-item.component';
import { IconModule } from '../icon';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [DropListComponent, DropItemComponent],
  exports: [DropListComponent, DropItemComponent]
})
export class DropListModule { }
