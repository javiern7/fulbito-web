import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login.page').then(m => m.LoginPage) },

  { path: 'leagues', canActivate: [authGuard], loadComponent: () => import('./features/leagues/leagues.page').then(m => m.LeaguesPage) },

  // ✅ Teams debe ir antes del wildcard
{
  path: 'teams',
  loadChildren: () =>
    import('./features/teams/teams.routes').then(m => m.TEAMS_ROUTES)
},

  { path: '', pathMatch: 'full', redirectTo: 'leagues' },
  { path: '**', redirectTo: 'leagues' }
];
