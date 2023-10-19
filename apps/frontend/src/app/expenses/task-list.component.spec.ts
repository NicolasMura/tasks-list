import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ExpensesService,
  INITIAL_LIMIT,
  IRestaurant,
  ITrip,
  NavigationDirection,
  PAGE_SIZE_OPTIONS,
  mocks,
} from '@lu/api-sdk';
import { PaginationComponent } from '@lu/components/pagination';
import { BehaviorSubject, of } from 'rxjs';
import { ExpensesComponent } from './expenses.component';

const expensesTotalCount = 111;
const expensesMock: (ITrip | IRestaurant)[] = new Array(expensesTotalCount)
  .fill(true)
  .map(() => mocks.expenses.getExpenseMock());

const expensesTotalCountSubjectMock = new BehaviorSubject<number>(
  expensesTotalCount,
);
const expensesSubjectMock = new BehaviorSubject<(ITrip | IRestaurant)[]>([]);
const navigationSubjectMock = new BehaviorSubject<NavigationDirection>('first');
const currentPageSubjectMock = new BehaviorSubject<number>(1);

const expensesServiceMock = {
  currentPage$: currentPageSubjectMock.asObservable(),
  currentLimit$: of(INITIAL_LIMIT),
  navigation$: navigationSubjectMock.asObservable(),
  expenses$: expensesSubjectMock.asObservable(),
  expensesTotalCount$: expensesTotalCountSubjectMock.asObservable(),
  expensesSubject$: expensesSubjectMock.asObservable(),
  getCurrentPage: jest.fn().mockReturnValue(currentPageSubjectMock.getValue()),
  setCurrentPage: jest.fn((page: number) => currentPageSubjectMock.next(page)),
  getExpenses: jest.fn(() => {
    expensesSubjectMock.next(expensesMock);
    return of(expensesMock);
  }),
  getExpensesTotalCount: jest.fn().mockReturnValue(expensesTotalCount),
  getCurrentLimit: jest.fn().mockReturnValue(INITIAL_LIMIT),
};

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesComponent, PaginationComponent],
      providers: [{ provide: ExpensesService, useValue: expensesServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('display first page of a list of expenses with paginator', async () => {
    expect(expensesServiceMock.getExpenses).toHaveBeenCalledWith(
      1,
      INITIAL_LIMIT,
    );

    await fixture.whenStable();

    const { debugElement } = fixture;
    const paginator = debugElement.query(By.css('lu-pagination'));

    expect(paginator).toBeTruthy();
    expect(paginator.properties['totalCount']).toBe(expensesTotalCount);
    expect(paginator.properties['currentPage']).toBe(1);
    expect(paginator.properties['currentLimit']).toBe(INITIAL_LIMIT);
    expect(paginator.properties['pageSizeOptions']).toBe(PAGE_SIZE_OPTIONS);
  });

  it('display last page of a list of expenses', () => {
    navigationSubjectMock.next('last');
    expect(expensesServiceMock.getExpenses).toHaveBeenCalledWith(
      Math.ceil(expensesTotalCount / INITIAL_LIMIT),
      INITIAL_LIMIT,
    );
  });
});
