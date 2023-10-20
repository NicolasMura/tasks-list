import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  first,
  of,
} from 'rxjs';
import { ITask } from '../model/task';

export const INITIAL_TASKS: ITask[] = [
  { id: 3, description: 'Task 3', completed: false },
  { id: 2, description: 'Task 2', completed: true },
  { id: 1, description: 'Task 1', completed: false },
];

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<ITask[]>([]);
  private errorMessageSubject = new BehaviorSubject<string>('');
  private snackBar = inject(MatSnackBar);

  tasks$ = this.tasksSubject.asObservable();
  errorMessage$ = this.errorMessageSubject.asObservable();

  fetchTasksFromApi(): Observable<ITask[]> {
    return of(INITIAL_TASKS).pipe(
      first(),
      delay(500), // just to simulate an API call
      catchError((error) => {
        this.handleError(error);
        throw error;
      }),
    );
  }

  setTasks(tasks: ITask[]): void {
    this.tasksSubject.next(tasks);
  }

  getTasks(): ITask[] {
    return this.tasksSubject.getValue();
  }

  deleteTask(taskId: number): void {
    const tasks = this.getTasks().filter((task) => task.id !== taskId);
    this.tasksSubject.next(tasks);
  }

  toggleTaskCompletion(taskId: number): void {
    const tasks = this.getTasks().map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this.tasksSubject.next(tasks);
  }

  displayNotification(message: string, action = '', duration = 0): void {
    this.snackBar.open(message, action, { duration });
  }

  handleError(error: HttpErrorResponse) {
    const { message } = error;

    if (message) {
      this.errorMessageSubject.next(message);
      this.displayNotification(message, '', 5000);
    }
  }
}
