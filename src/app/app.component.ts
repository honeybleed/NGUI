import { Component } from '@angular/core';
import { TextInputSI, LengthValidateHandler, EmptyValidateHandler, ValidateHandlerInterface } from './ui';
import { WinTitleToolButtonStyle } from './elec-relate/win-title-tool-button/WinTitleToolButtonStyle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _router: Router) {
     this._router.navigate(['config-check']);
  }
}
