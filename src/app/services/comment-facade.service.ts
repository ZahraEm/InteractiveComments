import { Injectable } from '@angular/core';
import { CommentStateService } from './comment-state.service';
import { CommentApiService } from './comment-api.service';
import { Observable } from 'rxjs';
import { UserInfo, Comment } from '../models/comments.models';

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
    console.log('CommentFacadeService');
    this.commentApiService.getAllComments().subscribe((comments) => {
      this.commentStateService.setComments(comments);
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
}
