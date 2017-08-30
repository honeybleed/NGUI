import { Component } from '@angular/core';
import { TextInputSI, LengthValidateHandler, EmptyValidateHandler, ValidateHandlerInterface } from './ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  placeholder = '请输入用户名';
  label= '用户名';
  testSi: TextInputSI = {
    empty: 'error',
    error: 'error',
    success: 'success'
  };
  validateHandler: ValidateHandlerInterface[] = [new EmptyValidateHandler('用户名不能为空'),
  new LengthValidateHandler(5, 14, '用户名长度在5~14之间')];
  constructor() {
  }
}
