import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Comment,
  dialogResponse,
  actionType,
  UpdateComment,
  UserInfo,
} from '../../models/comments.models';
import { CustomInputNumberComponent } from '../custom-input-number/custom-input-number.component';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';
import { ResponseBoxComponent } from '../response-box/response-box.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CustomInputNumberComponent,
    TimeAgoPipe,
    DeleteWarningComponent,
    ResponseBoxComponent,
    JsonPipe,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment: Comment = {} as Comment;
  @Input() userInfo: UserInfo = {} as UserInfo;
  @Output() deleteCommentHandler = new EventEmitter<string>();
  @Output() updateCommentHandler = new EventEmitter<UpdateComment>();
  @Output() changeRateHandler = new EventEmitter<number>();
  showDialog: boolean = false;
  isEdit = false;
  isReply = false;
  protected readonly RESPONSE_BOX_TYPE = actionType;
  onValueChange(value: number) {
    this.changeRateHandler.emit(value);
  }
  triggerDeleteCommentDialog() {
    this.showDialog = true;
  }
  handleDeleteCommentDialogResponse(response: dialogResponse) {
    if (response === dialogResponse.yes) {
      this.deleteCommentHandler.emit(this.comment.id);
      this.showDialog = false;
    } else {
      this.showDialog = false;
    }
  }

  handleCommentUpdate(text: string, type: actionType, id?: string) {
    const data: UpdateComment = {
      message: text,
      type: type,
      id: id,
    };
    this.isEdit = false;
    this.isReply = false;
    this.updateCommentHandler.emit(data);
  }
}
