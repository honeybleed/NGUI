import {
  Component, Input, OnInit, ViewEncapsulation
} from '@angular/core';
import { IconService } from '../icon.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
 @Input() iconTag: string;
  constructor(private  _iconService: IconService) { }
  ngOnInit() {
  }
  getFontFamily(): string {
    return this._iconService.getFontFamily();
  }
  getIconCode(): string {
    return this._iconService.getIconCode(this.iconTag);
  }
}
