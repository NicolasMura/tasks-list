import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { ITask } from '../model/task';

const INITIAL_TASKS: ITask[] = [
  { id: 1, description: 'Task 1', completed: false },
  { id: 2, description: 'Task 2', completed: true },
  { id: 3, description: 'Task 3', completed: false },
];

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<ITask[]>([]);

  tasks$ = this.tasksSubject.asObservable();

  fetchTasksFromApi(): Observable<ITask[]> {
    return of(INITIAL_TASKS).pipe(delay(500)); // simulate an API call
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

  completeTask(taskId: number): void {
    const tasks = this.getTasks().map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    this.tasksSubject.next(tasks);
  }
}
