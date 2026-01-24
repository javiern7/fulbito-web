import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/auth.guard';

export const TEAMS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/team-list/team-list.component').then(m => m.TeamListComponent)
  },
  {
    path: 'new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/team-form/team-form.component').then(m => m.TeamFormComponent)
  }
];
