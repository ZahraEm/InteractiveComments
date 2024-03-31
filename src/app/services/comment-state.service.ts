import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment, UserInfo } from '../models/comments.models';

@Injectable({
  providedIn: 'root',
})
export class CommentStateService {
  initialUserInfo: UserInfo = {
    id: '',
    username: '',
    avatar: '',
  };
  private comments$ = new BehaviorSubject<Comment[]>([]);
  private userInfo$ = new BehaviorSubject<UserInfo>(this.initialUserInfo);
  constructor() {}

  getComments$() {
    return this.comments$.asObservable();
  }
  getUserInfo$() {
    return this.userInfo$.asObservable();
  }
  setComments(comments: Comment[]) {
    this.comments$.next(comments);
  }
  setUserInfo(userInfo: UserInfo) {
    this.userInfo$.next(userInfo);
  }

  addNewComment(newComment: Comment) {
    const currentComments = this.comments$.getValue();
    const updatedComments = [...currentComments, newComment];
    this.setComments(updatedComments);
    return updatedComments;
  }
}
