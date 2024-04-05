import { Injectable } from '@angular/core';
import { CommentStateService } from './comment-state.service';
import { CommentApiService } from './comment-api.service';
import { Observable } from 'rxjs';
import {
  Comment,
  CommentDTO,
  updatePropertyType,
  UserInfo,
} from '../models/comments.models';

@Injectable({
  providedIn: 'root',
})
export class CommentFacadeService {
  constructor(
    private commentStateService: CommentStateService,
    private commentApiService: CommentApiService,
  ) {}

  getComments$(): Observable<Comment[]> {
    return this.commentStateService.getComments$();
  }

  loadComments() {
    this.commentApiService.getAllComments().subscribe((comments) => {
      const mappedComments =
        this.commentStateService.mapDTOsToComments(comments);
      this.commentStateService.setComments(mappedComments);
    });
  }

  getUserInfo$(): Observable<UserInfo> {
    return this.commentStateService.getUserInfo$();
  }
  loadUserInfo() {
    this.commentApiService.getUserInfo().subscribe((info) => {
      this.commentStateService.setUserInfo(info);
    });
  }

  addNewComment(text: string, parentId?: string) {
    const uniqeComment = this.commentStateService.generateComment(
      text,
      undefined,
      updatePropertyType.text,
      parentId,
    );
    this.commentApiService.addComment(uniqeComment).subscribe((result) => {
      if (result) {
        const updatedParentComment = this.commentStateService.modifyComment(
          uniqeComment as Comment,
          parentId,
        );
        if (parentId && updatedParentComment) {
          this.commentApiService
            .updateComment(updatedParentComment)
            .subscribe();
        }
      }
    });
  }
  deleteCommentById(id: string, parentId: string | undefined) {
    this.commentApiService.deleteComment(id).subscribe((result) => {
      if (result) {
        const updatedParentComment = this.commentStateService.modifyComment(
          id,
          parentId ? parentId : undefined,
        );
        if (parentId && updatedParentComment) {
          this.commentApiService
            .updateComment(updatedParentComment)
            .subscribe();
        }
      }
    });
  }
  updateCommentById(
    data: string | number,
    id: string,
    type: updatePropertyType,
  ) {
    const updatedComment: CommentDTO = this.commentStateService.generateComment(
      data,
      id,
      type,
      undefined,
    );
    this.commentApiService.updateComment(updatedComment).subscribe((result) => {
      if (result) {
        const updatedParentComment = this.commentStateService.updateCommentById(
          id,
          updatedComment,
        );
      }
    });
  }
}
