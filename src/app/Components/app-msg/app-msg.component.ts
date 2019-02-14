import { Component, Input, OnInit } from '@angular/core';
export type AppMsgStatus = 'normal' | 'error' | 'success';
@Component({
  selector: 'app-msg',
  templateUrl: './app-msg.component.html',
  styleUrls: ['./app-msg.component.scss']
})
export class AppMsgComponent implements OnInit {
  @Input() msg: string;
  @Input() status: AppMsgStatus;
  constructor() { }

  ngOnInit() {
  }
  msgClass() {
    if (this.status) {
      return this.status;
    } else {
      return 'normal';
    }
  }
}
