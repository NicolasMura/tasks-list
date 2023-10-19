import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ExpensesService,
  INITIAL_LIMIT,
  NavigationDirection,
  PAGE_SIZE_OPTIONS,
} from '@lu/api-sdk';
import { PaginationComponent } from '@lu/components/pagination';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  pairwise,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'lu-expenses',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './expenses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent implements OnInit {
  private readonly destroy: DestroyRef = inject(DestroyRef);

  expensesService = inject(ExpensesService);
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  isLoading$ = new BehaviorSubject(false);

  ngOnInit(): void {
    const limit$ = this.expensesService.currentLimit$.pipe(
      startWith(INITIAL_LIMIT),
    );
    const navigation$ = this.expensesService.navigation$.pipe(
      startWith('first' as NavigationDirection),
    );

    const pagination$ = combineLatest([limit$, navigation$]).pipe(
      tap(() => this.isLoading$.next(true)),
      pairwise(),
      switchMap(([first, second]) => {
        const limit = second[0];
        const page =
          first[0] !== second[0] || Number.isNaN(first[0])
            ? 1
            : this.getPage(second[1]);

        this.expensesService.setCurrentPage(page);

        return this.expensesService.getExpenses(page, limit).pipe(
          catchError((error) => {
            this.isLoading$.next(false);
            throw error;
          }),
        );
      }),
      tap(() => this.isLoading$.next(false)),
    );

    pagination$.pipe(takeUntilDestroyed(this.destroy)).subscribe();
  }

  updateLimit(limit: number): void {
    this.expensesService.setLimit(limit);
  }

  goTo(event: NavigationDirection): void {
    this.expensesService.setNavigation(event);
  }

  getPage(direction: NavigationDirection): number {
    const lastPage = Math.ceil(
      this.expensesService.getExpensesTotalCount() /
        this.expensesService.getCurrentLimit(),
    );
    let page = this.expensesService.getCurrentPage();

    if (direction === 'first' && page > 1) {
      page = 1;
    }

    if (direction === 'previous' && page > 1) {
      page = page - 1;
    }

    if (direction === 'next' && page < lastPage) {
      page = page + 1;
    }

    if (direction === 'last' && page < lastPage) {
      page = lastPage;
    }

    return page;
  }
}
