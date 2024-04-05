import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  actionType,
  Comment,
  CommentDTO,
  updatePropertyType,
  UserInfo,
} from '../models/comments.models';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CommentStateService {
  initialUserInfo: UserInfo = {
    id: '',
    username: '',
    avatar: '',
  };
  comments: Comment[] = [];
  private comments$ = new BehaviorSubject<Comment[]>([]);
  private commentsDTO$ = new BehaviorSubject<CommentDTO[]>([]);
  private userInfo$ = new BehaviorSubject<UserInfo>(this.initialUserInfo);
  constructor() {
    this.comments$.subscribe((result) => {
      this.comments = result;
    });
  }

  getComments$() {
    return this.comments$.asObservable();
  }
  getUserInfo$() {
    return this.userInfo$.asObservable();
  }
  setComments(comments: Comment[]) {
    this.comments$.next(comments);
  }
  setCommentsDTO(comments: CommentDTO[]) {
    this.commentsDTO$.next(comments);
  }
  setUserInfo(userInfo: UserInfo) {
    this.userInfo$.next(userInfo);
  }

  modifyComment(commentOrId: Comment | string, parentId?: string) {
    let comments = this.comments;
    if (typeof commentOrId === 'string') {
      const id = commentOrId;
      const newList = this.findAndUpdateComment(
        id,
        comments,
        actionType.DELETE,
      );
      this.setComments(newList);
      if (parentId) {
        return this.updateParentComment(
          id,
          comments,
          actionType.DELETE,
          parentId,
        );
      }
      return;
    } else {
      const newComment = commentOrId;
      if (!parentId) {
        const updatedComments = [...comments, newComment];
        this.setComments(updatedComments);
        return;
      } else {
        this.findAndUpdateComment(
          parentId,
          comments,
          actionType.REPLY,
          newComment,
        );
        return this.updateParentComment(
          newComment.id,
          comments,
          actionType.REPLY,
          parentId,
        );
      }
    }
  }

  updateCommentById(id: string, updatedCommentDTO: CommentDTO) {
    let comments = this.comments;
    const newList = this.findAndUpdateComment(
      id,
      comments,
      actionType.EDIT,
      updatedCommentDTO,
    );
    this.setComments(newList);
    return null;
  }
  findAndUpdateComment(
    id: string,
    comments: Comment[],
    type: actionType,
    newComment?: Comment | CommentDTO,
  ): Comment[] {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (comment.id === id) {
        switch (type) {
          case actionType.EDIT:
            comment.message = newComment?.message!;
            break;
          case actionType.DELETE:
            comments.splice(i, 1);
            break;
          case actionType.REPLY:
            const number = comment.responses?.length;
            comment.responses[number] = newComment as Comment;
            break;
        }
        return comments;
      }
      if (comment.responses && comment.responses.length > 0) {
        comment.responses = this.findAndUpdateComment(
          id,
          comment.responses,
          type,
          newComment,
        );
      }
    }
    return comments;
  }

  generateComment<T extends Comment | CommentDTO>(
    textOrData: string | number,
    id?: string,
    type?: updatePropertyType,
    parentId?: string,
  ): T {
    const userInfo = this.userInfo$.getValue();
    const comment = this.commentsDTO$.getValue().find((x) => x.id === id);
    const generatedId = id || uuidv4();
    const message =
      typeof textOrData === 'string' ? textOrData : comment?.message || '';
    const rate =
      typeof textOrData === 'number' ? textOrData : comment?.rate || 0;

    const generatedCommentDTO: CommentDTO = {
      id: generatedId,
      parentId: parentId || comment?.parentId || undefined,
      username: comment ? comment.username : userInfo.username,
      avatar: comment ? comment.avatar : userInfo.avatar,
      date: comment ? comment.date : new Date(),
      message: message,
      rate: rate,
      responses: comment?.responses || [],
      isUser: comment ? comment.isUser : true,
    };
    return generatedCommentDTO as T;
  }

  updateParentComment(
    id: string,
    comments: Comment[],
    type: actionType,
    parentId: string,
  ): CommentDTO | null {
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === parentId) {
        if (type === actionType.DELETE) {
          comments[i] = {
            ...comments[i],
            responses: comments[i].responses.filter(
              (response) => response.id !== id,
            ),
          };
        }
        this.setComments(comments);
        return this.mapCommentToDTO(comments[i]);
      }
      if (comments[i].responses.length > 0) {
        this.updateParentComment(id, comments[i].responses, type, parentId);
        this.setComments(comments);
        return this.mapCommentToDTO(comments[i]);
      }
    }
    return null;
  }

  mapDTOsToComments(commentsDTO: CommentDTO[], parentId?: string): Comment[] {
    this.setCommentsDTO(commentsDTO);
    return commentsDTO
      .filter((commentDTO) => commentDTO.parentId === parentId)
      .map((commentDTO) => ({
        id: commentDTO.id,
        parentId: commentDTO.parentId,
        username: commentDTO.username,
        avatar: commentDTO.avatar,
        date: new Date(commentDTO.date),
        message: commentDTO.message,
        rate: commentDTO.rate,
        responses: this.mapDTOsToComments(commentsDTO, commentDTO.id),
        isUser: commentDTO.isUser,
      }));
  }
  mapCommentToDTO(comment: Comment): CommentDTO {
    const responseIds = comment.responses.map((response) => response.id);
    return {
      id: comment.id,
      parentId: comment.parentId,
      username: comment.username,
      avatar: comment.avatar,
      date: comment.date,
      message: comment.message,
      rate: comment.rate,
      responses: responseIds,
      isUser: comment.isUser,
    };
  }
}
