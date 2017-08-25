import { Component } from '@angular/core';
import { TextInputSI } from './ui/text-input/text-input-si';

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
    empty: 'book',
    error: 'book',
    success: 'book'
  };
  constructor() {
  }
}
