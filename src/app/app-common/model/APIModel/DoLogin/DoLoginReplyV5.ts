import { APIReply, APISession } from '../';

export interface DoLoginReplyV5 extends APIReply {
  data: {
    session: APISession;
    id: string;
    name: string;
  };
}
