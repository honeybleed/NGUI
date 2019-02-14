import { APIReply } from '../';

export interface DoVMPowerReplyV5 extends APIReply {
  data: {
    session_id: string;
  };
}
