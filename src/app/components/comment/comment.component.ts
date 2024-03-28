import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comments.models';
import { CustomInputNumberComponent } from '../custom-input-number/custom-input-number.component';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CustomInputNumberComponent, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment: Comment = {} as Comment;

  onValueChange(value: number) {
    console.log('Value changed to:', value);
  }
}
