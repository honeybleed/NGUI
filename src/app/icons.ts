import { IconConfig } from './ui';
const iconMap: Map<string, string> = new Map<string, string>();
const fontFamily = 'test_icon';
iconMap.set('book', '\ue648');
iconMap.set('error', '\ue631');
iconMap.set('success', '\ue632');
export  const  icons: IconConfig = {
  fontFamily: fontFamily,
  iconMap: iconMap
};
