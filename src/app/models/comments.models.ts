export interface Comment {
  id: string;
  parentId?: string;
  username: string;
  avatar: string;
  date: Date;
  message: string;
  rate: number;
  responses: Comment[];
  isUser: boolean;
}
export interface CommentDTO {
  id: string;
  parentId?: string;
  username: string;
  avatar: string;
  date: Date;
  message: string;
  rate: number;
  responses: string[];
  isUser: boolean;
}
export interface UserInfo {
  id: string;
  username: string;
  avatar: string;
}
export enum actionType {
  SEND = '1',
  EDIT = '2',
  REPLY = '3',
  DELETE = '4',
}
export const CommentMapping: Record<actionType, string> = {
  [actionType.SEND]: 'SEND',
  [actionType.REPLY]: 'REPLY',
  [actionType.EDIT]: 'UPDATE',
  [actionType.DELETE]: 'DELETE',
};

export enum dialogResponse {
  yes = '1',
  no = '2',
}

export interface UpdateComment {
  message: string;
  type: actionType;
  id?: string;
}
export enum updatePropertyType {
  text = '1',
  rate = '2',
}
