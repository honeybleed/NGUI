import { APIReply } from '../';
import { VMObj } from '../../VMObj';

export interface DoGetVMReplyV3 extends APIReply {
  data: VMObj[] | null;
}
