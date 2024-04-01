import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { NgOptimizedImage } from '@angular/common';
import {
  Comment,
  CommentMapping,
  responseBoxType,
  UserInfo,
} from '../../models/comments.models';
import { CommentFacadeService } from '../../services/comment-facade.service';
import { FormsModule } from '@angular/forms';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-response-box',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule],
  templateUrl: './response-box.component.html',
  styleUrl: './response-box.component.scss',
})
export class ResponseBoxComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject();
  initialUserInfo: UserInfo = {
    id: '',
    username: '',
    avatar: '',
  };
  @Input() comment: Comment = {} as Comment;
  @Input() type: responseBoxType = responseBoxType.SEND;
  @Input() avatar: string = '';
  @Output() sendComment = new EventEmitter<Comment>();
  text: string = '';
  userInfo: UserInfo = this.initialUserInfo;
  public CommentMapping = CommentMapping;
  constructor(private commentFacadeService: CommentFacadeService) {}

  ngOnInit(): void {
    this.commentFacadeService.getUserInfo$().subscribe((userInfo) => {
      this.userInfo = userInfo;
    });
  }
  ngOnDestroy() {
    // @ts-ignore
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
  action() {
    this.sendCommentAction();
    // switch (this.type) {
    //   case responseBoxType.SEND:
    //     this.sendCommentAction();
    //     break;
    // }
  }
  generateUniqueID(): Observable<Comment> {
    return this.commentFacadeService
      .getComments$()
      .pipe(map((comments) => this.generateUniqueComment(comments)));
  }

  private generateUniqueComment(comments: Comment[]): Comment {
    let id: string;
    do {
      id = uuidv4();
    } while (comments.some((comment) => comment.id === id));

    return {
      id: id,
      username: this.userInfo.username,
      avatar: this.userInfo.avatar,
      date: new Date(),
      message: this.text,
      rate: 0,
      responses: [],
      isUser: true,
    };
  }
  sendCommentAction() {
    this.generateUniqueID()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((newComment) => {
        this.sendComment.emit(newComment);
        this.text = '';
      });
  }
}
