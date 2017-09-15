export interface ComponentClassInterface {
  events: {[name: string]: boolean};
  status: string;
  theme: string;
  disabled: boolean;
  dumpClasses(): string[];
}
