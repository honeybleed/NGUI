import { APIReply } from '../';

export interface DoLoginReplyV3 extends APIReply {
  data: {
    ssoVm: number;
    ID: number;
    NAME: string;
    clientPolicy: any
  };
}
