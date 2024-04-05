import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommentMapping, actionType } from '../../models/comments.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-response-box',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './response-box.component.html',
  styleUrl: './response-box.component.scss',
})
export class ResponseBoxComponent implements OnInit {
  @Input() type: actionType = actionType.SEND;
  @Input() avatar: string = '';
  @Input() commentText?: string = '';
  @Output() updateCommentHandler = new EventEmitter<string>();
  text: string = '';
  RESPONSE_BOX_TYPE = actionType;
  CommentMapping = CommentMapping;

  ngOnInit(): void {
    this.text = this.commentText ? this.commentText : '';
  }

  onSubmit() {
    this.updateCommentHandler.emit(this.text);
    this.text = '';
  }
}
