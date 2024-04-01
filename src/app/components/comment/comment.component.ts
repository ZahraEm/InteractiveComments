import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comments.models';
import { CustomInputNumberComponent } from '../custom-input-number/custom-input-number.component';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CustomInputNumberComponent, TimeAgoPipe, DeleteWarningComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment: Comment = {} as Comment;
  showDialog: boolean = false;
  onValueChange(value: number) {
    console.log('Value changed to:', value);
  }
  onDelete(comment: Comment) {
    this.showDialog = true;
  }
}
