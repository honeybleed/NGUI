import { AppVersion } from '../app-common/model/AppVersion';

export interface GlobalCache {
  userid?: string;
  sessionid?: string;
  username?: string;
  versionStr?: string;
  version?: AppVersion;
}
