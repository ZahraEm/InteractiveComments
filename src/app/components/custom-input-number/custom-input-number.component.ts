import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-custom-input-number',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-input-number.component.html',
  styleUrl: './custom-input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputNumberComponent {
  @Input() value: number = 0;
  @Input() step: number = 1;
  @Input() min: number = 0;
  @Output() valueChange = new EventEmitter<number>();
  private valueSubject = new Subject<number>();
  constructor() {
    this.valueSubject.pipe(debounceTime(300)).subscribe(() => {
      this.emitValueChange();
    });
  }
  increment() {
    this.value += this.step;
    this.valueSubject.next(this.value);
  }

  decrement() {
    if (this.value - this.step >= this.min) {
      this.value -= this.step;
      this.valueSubject.next(this.value);
    }
  }

  onChange() {
    if (this.value < this.min) { // Ensure value is not below min after manual input
      this.value = this.min;
    }
    this.emitValueChange();
  }

  private emitValueChange() {
    this.valueChange.emit(this.value);
  }
}
