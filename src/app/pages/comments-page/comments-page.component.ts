import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomInputNumberComponent } from '../../components/custom-input-number/custom-input-number.component';
import {
  Comment,
  responseBoxType,
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
  RESPONSE_BOX_TYPE = responseBoxType;
  isUserAvatar = '../../../assets/images/avatars/image-juliusomo.png';

  constructor(private commentFacadeService: CommentFacadeService) {
    this.userInfo$ = this.commentFacadeService.getUserInfo$();
    this.comments$ = this.commentFacadeService.getComments$();
  }

  ngOnInit(): void {
    this.commentFacadeService.loadUserInfo();
    this.commentFacadeService.loadComments();
  }
  myValue: number = 0;

  onValueChange(value: number) {
    console.log('Value changed to:', value);
  }
}
