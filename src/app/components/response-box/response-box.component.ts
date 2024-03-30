import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {
  Comment,
  CommentMapping,
  responseBoxType,
  UserInfo,
} from '../../models/comments.models';
import { CommentFacadeService } from '../../services/comment-facade.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-response-box',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule],
  templateUrl: './response-box.component.html',
  styleUrl: './response-box.component.scss',
})
export class ResponseBoxComponent implements OnInit {
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
  action() {
    switch (this.type) {
      case responseBoxType.SEND:
        const newComment: Comment = {
          id: this.userInfo.id,
          username: this.userInfo.username,
          avatar: this.userInfo.avatar,
          date: new Date(),
          message: this.text,
          rate: 0,
          responses: [],
          isUser: true,
        };
        this.sendComment.emit(newComment);
        this.text = '';
    }
  }
}
