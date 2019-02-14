import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DropItemInterfaceClassConfig } from './DropItemInterfaceClassConfig';
import { DropItemInfo } from './DropItemInfo';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-drop-item',
  templateUrl: './drop-item.component.html',
  styleUrls: ['./drop-item.component.scss']
})
export class DropItemComponent extends DropItemInterfaceClassConfig implements OnInit {
  @Input() info: DropItemInfo;
  @Output() uClick = new EventEmitter();
  @Input() disabled: boolean;
  constructor() {
    super();
  }
  click() {
    if (!this.disabled) {
      this.uClick.emit({
        action: this.info.name,
        data: this.info.data
      });
    }
  }
  enter() {
    this.setEvent('hover');
  }
  leave() {
    this.unSetEvent('hover');
  }
  down() {
    this.setEvent('down');
  }
  up() {
    this.unSetEvent('down');
  }
  ngOnInit() {
  }

}
