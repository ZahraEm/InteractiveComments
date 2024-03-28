import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CommentMapping, responseBoxType } from '../../models/comments.models';

@Component({
  selector: 'app-response-box',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './response-box.component.html',
  styleUrl: './response-box.component.scss',
})
export class ResponseBoxComponent {
  @Input() comment: Comment = {} as Comment;
  @Input() type: responseBoxType = responseBoxType.SEND;
  @Input() avatar: string = '';
  public CommentMapping = CommentMapping;
}
