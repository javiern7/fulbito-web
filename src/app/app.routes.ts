import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login.page').then(m => m.LoginPage) },
  { path: 'leagues', canActivate: [authGuard], loadComponent: () => import('./features/leagues/leagues.page').then(m => m.LeaguesPage) },

  { path: '', pathMatch: 'full', redirectTo: 'leagues' },
  { path: '**', redirectTo: 'leagues' },
];
