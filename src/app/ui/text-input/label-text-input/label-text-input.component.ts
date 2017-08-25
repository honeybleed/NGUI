import { Component, Input, OnInit } from '@angular/core';
import { TextInputSI } from '../text-input-si';
import { LabelTextInputStyle, LabelTextInputStyleGroup } from './label-text-input-style';
import { labelTextInputDefaultStyle } from './label-text-input-default-style';
import { StyleMixinService } from '../../ui-common/style-mixin.service';

@Component({
  selector: 'ui-label-text-input',
  templateUrl: './label-text-input.component.html',
  styleUrls: ['./label-text-input.component.scss']
})
export class LabelTextInputComponent implements OnInit {
  @Input() label = 'label';
  @Input() placeHolder = 'please type in some word';
  @Input() isPassword = false;
  @Input() id: string ;
  @Input() name: string;
  @Input() si: TextInputSI;
  @Input() styleGroup: LabelTextInputStyleGroup;
  currentStyle: LabelTextInputStyle;
  constructor(private _styleMixinService: StyleMixinService) {
    if (this.styleGroup) {
      const tmpGroup = {...labelTextInputDefaultStyle};
      this._styleMixinService.mixStyleGroup(tmpGroup, this.styleGroup);
      this.styleGroup = tmpGroup;
    } else {
      this.styleGroup = {...labelTextInputDefaultStyle};
    }
    this.currentStyle = {...this.styleGroup.normal.base};
  }
  enter() {
    this._styleMixinService.mixStyle(this.currentStyle, this.styleGroup.normal.hover);
  }
  leave() {
   this._styleMixinService.mixStyle(this.currentStyle, this.styleGroup.normal.base);
  }
  ngOnInit() {
  }
}
