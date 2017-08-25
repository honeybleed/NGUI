import { StyleObj, StyleObjGroup } from '../../ui-common/styleModel';

export interface LabelTextInputStyle extends  StyleObj {
  outLine?: {[key: string]: string};
  label?: {[key: string]: string};
  inputBlock?: {[key: string]: string};
  input?: {[key: string]: string};
  si?: {[key: string]: string};
}
export interface LabelTextInputStyleGroup extends StyleObjGroup {
  normal: {
    base: LabelTextInputStyle,
    hover: LabelTextInputStyle,
    focus: LabelTextInputStyle
  };
  success: {
    base: LabelTextInputStyle,
    hover: LabelTextInputStyle,
    focus: LabelTextInputStyle
  };
  error: {
    base: LabelTextInputStyle,
    hover: LabelTextInputStyle,
    focus: LabelTextInputStyle
  };
}
