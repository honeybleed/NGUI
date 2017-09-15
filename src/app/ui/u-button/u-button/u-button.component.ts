import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { UButtonInterfaceClassConfig } from './UButtonInterfaceClassConfig';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-u-button',
  templateUrl: './u-button.component.html',
  styleUrls: ['./u-button.component.scss']
})
export class UButtonComponent extends UButtonInterfaceClassConfig implements OnInit {

  @Input() iconTag: string;
  @Input() showText: string;
  @Input() theme: string;
  @Input() disabled: boolean;
  @Output() uClick = new EventEmitter();
  constructor() {
    super();
  }
  hasIcon(): boolean {
    return (!!this.iconTag && this.iconTag.trim().length > 0);
  }
  icon(): string {
    return this.iconTag;
  }
  text(): string {
    return this.showText;
  }
  enter() {
    this.setEvent('hover');
  }
  leave() {
    this.unSetEvent('hover');
  }
  focus() {
    this.setEvent('focus');
  }
  blur() {
    this.unSetEvent('focus');
  }
  down() {
    this.setEvent('down');
  }
  up() {
    this.unSetEvent('down');
    if (!this.disabled) {
      this.uClick.emit();
    }
  }
  ngOnInit() {
  }

}
