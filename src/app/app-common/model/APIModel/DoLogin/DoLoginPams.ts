import { AppVersion } from '../../AppVersion';
import { APISession } from '../';

export interface DoLoginPams {
  version: AppVersion;
  args: {
    username: string;
    password: string;
    admin?: string | null;
  };
}
