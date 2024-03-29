import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment, UserInfo } from '../models/comments.models';

@Injectable({
  providedIn: 'root',
})
export class CommentStateService {
  // Provide initial values for id, username, and avatar
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
}
