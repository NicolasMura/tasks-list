import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '@ses/api-sdk';
import { TaskComponent } from '@ses/task';

import { BehaviorSubject, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'ses-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private searchInputRef!: ElementRef;

  @ViewChild('searchInputRef', { static: false }) private set input(
    searchInputRef: ElementRef,
  ) {
    this.searchInputRef = searchInputRef;
  }

  taskService = inject(TaskService);
  isLoading$ = new BehaviorSubject(false);
  taskForm = this.formBuilder.group({
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.isLoading$.next(true);
    this.taskService
      .fetchTasksFromApi()
      .pipe(
        tap((tasks) => this.taskService.setTasks(tasks)),
        catchError(() => {
          return of([]);
        }),
        tap(() => this.isLoading$.next(false)),
      )
      .subscribe();
  }

  /**
   * Scan for CTRL / CMD + F events
   */
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent): void {
    if (($event.ctrlKey || $event.metaKey) && $event.code === 'KeyF') {
      $event.preventDefault(); // to prevent the browser from opening its own default search box
      this.searchInputRef.nativeElement.focus();
    }
  }

  addTask(): void {
    const description = this.taskForm.get('description')?.value;

    if (description) {
      this.taskService.setTasks([
        {
          id: this.taskService.getTasks()[0]?.id + 1 || 1,
          description,
          completed: false,
        },
        ...this.taskService.getTasks(),
      ]);
      this.taskForm.reset();
      this.taskForm.markAsPristine();
      this.taskService.displayNotification('Task added!', '', 3000);
    }
  }

  toggleTaskCompletion(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.taskService.displayNotification('Task deleted!', '', 3000);
  }
}
