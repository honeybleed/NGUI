import { AppVersion } from '../../AppVersion';

export interface DoVMPowerPams {
  version: AppVersion;
  args: {
    vmid: string;
    sessionID ?: string;
    action: string;
  };
}
