import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { WinTitleToolButtonStyle } from './WinTitleToolButtonStyle';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-win-title-tool-button',
  templateUrl: './win-title-tool-button.component.html',
  styleUrls: ['./win-title-tool-button.component.scss']
})
export class WinTitleToolButtonComponent implements OnInit {

  @Input() config: WinTitleToolButtonStyle;
  currentStyle: {[key: string]: string};
  constructor() {

  }
  click() {
    this.config.clickHandler();
  }
  enter() {
    this.currentStyle = this.config.hoverStyle();
  }
  leave() {
    this.currentStyle = this.config.normalStyle();
  }
  ngOnInit() {
    this.currentStyle = this.config.normalStyle();
  }
}
