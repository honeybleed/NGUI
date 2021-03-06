import {
  Component, Input, OnInit, ViewEncapsulation
} from '@angular/core';
import { WinTitleToolButtonStyle } from '../win-title-tool-button/WinTitleToolButtonStyle';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-win-title',
  templateUrl: './win-title.component.html',
  styleUrls: ['./win-title.component.scss']
})
export class WinTitleComponent implements OnInit {
  @Input() toolButtons: [WinTitleToolButtonStyle];
  @Input() icon: string;
  @Input() iconWidth: number;
  @Input() toolsWidth: number;
  @Input() titleText: string;
  @Input() isDrag = true;
  ngOnInit() {
  }
  constructor() {
  }
}
