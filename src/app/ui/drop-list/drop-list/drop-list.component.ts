import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import { DropItemInfo } from '../drop-item/DropItemInfo';
import { DropListInterfaceClassConfig } from './DropListInterfaceClassConfig';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ui-drop-list',
  templateUrl: './drop-list.component.html',
  styleUrls: ['./drop-list.component.scss']
})
export class DropListComponent extends DropListInterfaceClassConfig implements OnInit  {
  @Input() icon: string;
  @Input() label: string;
  @Input() items: DropItemInfo[];
  @Input() width: number;
  @Output() itemClicked = new EventEmitter();
  @ViewChild('comp')
  compView: ElementRef;
  constructor() {
    super();
  }
  itemClick(itemData: {action: string, data: any}) {
    this.itemClicked.emit(itemData);
    this.unSetEvent('dropdown');
  }
  ngOnInit() {
  }
  @HostListener('document:click', ['$event'])
  globalClick(event) {
    if (!event.path.some((element) => {
        return element === this.compView.nativeElement;
      }) && this.events.dropdown) {
      this.unSetEvent('dropdown');
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
  click() {
    if (this.events.dropdown) {
      this.unSetEvent('dropdown');
    } else {
      this.setEvent('dropdown');
    }
  }
}
