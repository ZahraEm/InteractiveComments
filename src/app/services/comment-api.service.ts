import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, UserInfo } from '../models/comments.models';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentApiService {
  private url = `${environment.baseUrl}`;
  constructor(private http: HttpClient) {}
  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}/comments`);
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.url}/userInfo`);
  }

  addComment(comments: Comment[]): Observable<Comment[]> {
    return this.http.post<Comment[]>(`${this.url}/comments`, comments);
  }
}