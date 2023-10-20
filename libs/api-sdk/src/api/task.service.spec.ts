import { TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ITask } from '../model/task';
import { INITIAL_TASKS, TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, { provide: MatSnackBar, userValue: {} }],
    });
    service = TestBed.inject(TaskService);
  });

  it('create', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchTasksFromApi', () => {
    it('retrieve a list of tasks from the server', () => {
      const tasksMock: ITask[] = INITIAL_TASKS;

      service.fetchTasksFromApi().subscribe((tasks) => {
        expect(tasks).toEqual(tasksMock);
      });
    });

    it('handle errors when retrieving tasks from the server', () => {
      // @TODO
    });
  });

  describe('setTasks', () => {
    it('update the tasks on the server', () => {
      // @TODO
    });

    it('handle errors when updating tasks on the server', () => {
      // @TODO
    });
  });

  describe('deleteTask', () => {
    it('delete a task from the server', () => {
      // @TODO
    });

    it('handle errors when deleting a task from the server', () => {
      // @TODO
    });
  });
});
