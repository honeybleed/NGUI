import { IconConfig } from './ui';
const iconMap: Map<string, string> = new Map<string, string>();
const fontFamily = 'test_icon';
iconMap.set('book', '\ue648');
export  const  icons: IconConfig = {
  fontFamily: fontFamily,
  iconMap: iconMap
};
