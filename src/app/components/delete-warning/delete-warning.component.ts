import { Component, EventEmitter, Output } from '@angular/core';
import { dialogResponse } from '../../models/comments.models';

@Component({
  selector: 'app-delete-warning',
  standalone: true,
  imports: [],
  templateUrl: './delete-warning.component.html',
  styleUrl: './delete-warning.component.scss',
})
export class DeleteWarningComponent {
  DIALOG_RESPONSE = dialogResponse;
  @Output() dialogResponse = new EventEmitter<dialogResponse>();

  onAction(response: dialogResponse) {
    this.dialogResponse.emit(response);
  }
}
