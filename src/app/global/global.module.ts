import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCacheService } from './app-cache.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AppCacheService]
})
export class GlobalModule { }
