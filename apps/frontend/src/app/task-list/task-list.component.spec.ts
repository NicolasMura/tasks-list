import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { INITIAL_TASKS, ITask, TaskService } from '@ses/api-sdk';
import { BehaviorSubject, of } from 'rxjs';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    const tasksSubject = new BehaviorSubject<ITask[]>([]);
    const taskServiceMock = {
      tasks$: tasksSubject.asObservable(),
      fetchTasksFromApi: jest.fn().mockReturnValue(of(INITIAL_TASKS)),
      setTasks: jest.fn((tasks: ITask[]) => tasksSubject.next(tasks)),
    };

    await TestBed.configureTestingModule({
      imports: [TaskListComponent, NoopAnimationsModule],
      providers: [
        TaskService,
        { provide: TaskService, useValue: taskServiceMock },
        { provide: MatSnackBar, userValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('display a list of tasks', () => {
    expect(taskService.fetchTasksFromApi).toHaveBeenCalled();

    const { debugElement } = fixture;
    const taskList = debugElement.queryAll(By.css('ses-task'));

    expect(taskList.length).toBe(INITIAL_TASKS.length);
    expect(taskList[0].nativeElement.textContent).toContain(
      INITIAL_TASKS[0].description,
    );
  });

  xdescribe('addTask', () => {
    it('add a task to the task list', () => {
      // @TODO
    });

    it('do not add a task if the description is empty', () => {
      // @TODO
    });
  });

  xdescribe('toggleTaskCompletion', () => {
    it('toggle the completion status of a task', () => {
      // @TODO
    });
  });

  xdescribe('deleteTask', () => {
    it('delete a task from the task list', () => {
      // @TODO
    });
  });
});
