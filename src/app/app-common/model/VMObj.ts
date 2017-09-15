import { AppVersion } from './AppVersion';

export interface VMObj {
  name: string;
  account: string;
  pwd: string;
  osType: string;
  osStr: string;
  mac: string;
  id: string;
  status: string;
  ip: string;
  hostip: string;
  spicePort: string;
  hasRDP: boolean;
  RDPText: string;
  hasSpice: boolean;
  SpiceText: string;
  version: AppVersion;
}
