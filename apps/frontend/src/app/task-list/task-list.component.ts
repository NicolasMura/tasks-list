import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskComponent } from '@ses/task';

export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'ses-task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  tasks: Task[] = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
    { id: 3, description: 'Task 3', completed: false },
  ];
}
