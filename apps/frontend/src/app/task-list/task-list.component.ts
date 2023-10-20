import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '@ses/api-sdk';
import { TaskComponent } from '@ses/task';
import { tap } from 'rxjs';

@Component({
  selector: 'ses-task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  taskService = inject(TaskService);

  ngOnInit(): void {
    this.taskService
      .fetchTasksFromApi()
      .pipe(tap((tasks) => this.taskService.setTasks(tasks)))
      .subscribe();
  }
}
