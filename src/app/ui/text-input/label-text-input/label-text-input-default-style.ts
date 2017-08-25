import { LabelTextInputStyle, LabelTextInputStyleGroup } from './label-text-input-style';

const baseStyle: LabelTextInputStyle = {
  outLine: {
    'background-color': '#eee',
    'padding': '5px 10px',
    'border-bottom': '1px solid #999',
    'transition': 'all .5s'
  },
  label: {
    'font-family': 'Microsoft Yahei',
    'font-size': '16px',
    'padding-right': '5px',
    'color': '#888',
    'transition': 'all .5s'
  },
  inputBlock: {
  },
  input: {
    'background-color': 'transparent',
    'height': '20px',
    'font-size': '16px',
    'border': '0',
    'padding': '0 5px',
    'font-family': 'Microsoft Yahei',
    'color': '#999',
    'transition': 'all .5s'
  },
  si: {
    'color': '#aaa',
    'transition': 'all .5s'
  }
};
const hoverStyle: LabelTextInputStyle = {
  outLine: {
    'background-color': 'transparent',
  }
};
const focusStyle: LabelTextInputStyle = baseStyle;
export  const labelTextInputDefaultStyle: LabelTextInputStyleGroup = {
  normal: {
    base: baseStyle,
    hover: hoverStyle,
    focus: focusStyle
  },
  success: {
    base: baseStyle,
    hover: hoverStyle,
    focus: focusStyle
  },
  error: {
    base: baseStyle,
    hover: hoverStyle,
    focus: focusStyle
  }
};
