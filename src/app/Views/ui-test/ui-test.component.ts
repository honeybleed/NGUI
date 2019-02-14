import { Component, Input, OnInit } from '@angular/core';
import { DropItemInfo } from '../../ui/drop-list/drop-item/DropItemInfo';

@Component({
  selector: 'app-ui-test',
  templateUrl: './ui-test.component.html',
  styleUrls: ['./ui-test.component.scss']
})
export class UiTestComponent implements OnInit {
  @Input() minWidth: number;
  items: DropItemInfo[] = [];
  constructor() {
    const firstItem = new DropItemInfo('first', 'close', 'FIRST');
    const secondItem = new DropItemInfo('second', 'right', 'SECOND');
    this.items.push(firstItem, secondItem);
  }

  ngOnInit() {
  }
  itemClicked(name: string) {
    console.log(name);
  }
}
