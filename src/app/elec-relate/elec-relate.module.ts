import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderEventHandlerService } from './render-event-handler.service';
import { WinTitleComponent } from './win-title/win-title.component';
import { IconModule } from '../ui/icon';
import { WinTitleToolButtonComponent } from './win-title-tool-button/win-title-tool-button.component';
import { GlobalModule } from '../global';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    GlobalModule
  ],
  declarations: [WinTitleComponent, WinTitleToolButtonComponent],
  exports: [WinTitleComponent, WinTitleToolButtonComponent],
  providers: [RenderEventHandlerService]
})
export class ElecRelateModule { }
