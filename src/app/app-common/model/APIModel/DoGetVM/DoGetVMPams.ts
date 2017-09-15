import { AppVersion } from '../../AppVersion';

export interface DoGetVMPams {
  version: AppVersion;
  args: {
    id: string;
    sessionID: string;
  };
}
