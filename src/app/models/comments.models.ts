export interface Comment {
  id: string;
  username: string;
  avatar: string;
  date: Date;
  message: string;
  rate: number;
  responses: Comment[];
  isUser: boolean;
}
export enum responseBoxType {
  SEND = '1',
  UPDATE = '2',
  REPLY = '3',
}
export const CommentMapping: Record<responseBoxType, string> = {
  [responseBoxType.SEND]: 'SEND',
  [responseBoxType.REPLY]: 'REPLY',
  [responseBoxType.UPDATE]: 'UPDATE',
};
