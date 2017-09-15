import { IconConfig } from './ui';
const iconMap: Map<string, string> = new Map<string, string>();
const fontFamily = 'iconfont';
iconMap.set('logo', '\ue60a');
iconMap.set('close', '\ue627');
iconMap.set('max', '\ue662');
iconMap.set('min', '\ue600');
iconMap.set('normal', '\ue68d');
iconMap.set('right', '\ue618');
iconMap.set('alert', '\ue601');
export  const  icons: IconConfig = {
  fontFamily: fontFamily,
  iconMap: iconMap
};
