import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  @Input() min: number = 0; // Minimum value
  @Output() valueChange = new EventEmitter<number>();

  increment() {
    this.value += this.step;
    this.emitValueChange();
  }

  decrement() {
    if (this.value - this.step >= this.min) {
      this.value -= this.step;
      this.emitValueChange();
    }
  }

  onChange() {
    if (this.value < this.min) {
      this.value = this.min;
    }
    this.emitValueChange();
  }

  private emitValueChange() {
    this.valueChange.emit(this.value);
  }
}