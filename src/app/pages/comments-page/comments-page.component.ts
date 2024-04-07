import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomInputNumberComponent } from '../../components/custom-input-number/custom-input-number.component';
import {
  actionType,
  Comment,
  UpdateComment,
  updatePropertyType,
  UserInfo,
} from '../../models/comments.models';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { CommentComponent } from '../../components/comment/comment.component';
import { ResponseBoxComponent } from '../../components/response-box/response-box.component';
import { CommentFacadeService } from '../../services/comment-facade.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments-page',
  standalone: true,
  imports: [
    FormsModule,
    CustomInputNumberComponent,
    TimeAgoPipe,
    CommentComponent,
    ResponseBoxComponent,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './comments-page.component.html',
  styleUrl: './comments-page.component.scss',
})
export class CommentsPageComponent implements OnInit {
  userInfo$: Observable<UserInfo>;
  comments$: Observable<Comment[]>;
  ACTION_TYPE = actionType;
  constructor(private commentFacadeService: CommentFacadeService) {
    this.userInfo$ = this.commentFacadeService.getUserInfo$();
    this.comments$ = this.commentFacadeService.getComments$();
  }

  ngOnInit(): void {
    this.commentFacadeService.loadUserInfo();
    this.commentFacadeService.loadComments();
  }

  deleteCommentFromList(id: string, parentId?: string) {
    this.commentFacadeService.deleteCommentById(
      id,
      parentId ? parentId : undefined,
    );
  }
  updateCommentData(ev: UpdateComment, parentId?: string) {
    switch (ev.type) {
      case actionType.REPLY:
        this.commentFacadeService.addNewComment(ev.message, parentId);
        break;
      case actionType.EDIT:
        this.commentFacadeService.updateCommentById(
          ev.message,
          ev.id!,
          updatePropertyType.text,
        );
        break;
      case actionType.SEND:
        this.commentFacadeService.addNewComment(ev.message);
        break;
    }
  }
  updateCommentRate(ev: number, comment: Comment) {
    this.commentFacadeService.updateCommentById(
      ev,
      comment.id,
      updatePropertyType.rate,
    );
  }
}
