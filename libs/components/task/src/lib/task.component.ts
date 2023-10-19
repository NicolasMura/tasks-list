import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'ses-task',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() task?: Task;

  toggleCompleted(): void {
    if (this.task) {
      this.task.completed = !this.task.completed;
    }
  }
}
