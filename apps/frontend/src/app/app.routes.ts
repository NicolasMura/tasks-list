import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./task-list/task-list.component').then(
        ({ TaskListComponent }) => TaskListComponent
      ),
  },
];
