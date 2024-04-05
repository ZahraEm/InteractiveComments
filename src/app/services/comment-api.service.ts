import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, CommentDTO, UserInfo } from '../models/comments.models';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentApiService {
  private url = `${environment.baseUrl}`;
  constructor(private http: HttpClient) {}
  getAllComments(): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.url}/comments`);
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.url}/userInfo`);
  }

  addComment(comment: CommentDTO | Comment): Observable<CommentDTO[]> {
    return this.http.post<CommentDTO[]>(`${this.url}/comments`, comment);
  }

  deleteComment(id: string): Observable<CommentDTO> {
    return this.http.delete<CommentDTO>(`${this.url}/comments/${id}`);
  }

  updateComment(comment: CommentDTO): Observable<CommentDTO> {
    return this.http.put<CommentDTO>(
      `${this.url}/comments/${comment.id}`,
      comment,
    );
  }
}
