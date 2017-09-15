import { APIReply, APISession } from '../';
import { VMObj } from '../../VMObj';

export interface DoGetVMReplyV5 extends APIReply {
  data: {
    session_id: string;
    total: number;
    vms: VMObj[];
  };
}
