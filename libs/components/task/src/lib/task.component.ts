import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ITask } from '@ses/api-sdk';

@Component({
  selector: 'ses-task',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() task?: ITask;

  @Output() toggleTaskCompletion = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();

  toggleCompleted(): void {
    if (this.task) {
      this.toggleTaskCompletion.emit(this.task.id);
    }
  }

  deleteNote(): void {
    if (this.task) {
      this.deleteTask.emit(this.task.id);
    }
  }
}
