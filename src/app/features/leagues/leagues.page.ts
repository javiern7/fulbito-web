import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { LeaguesService, League } from './leagues.service';
import { AuthService } from '../../core/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './leagues.page.html',
})
export class LeaguesPage {
  private fb = inject(FormBuilder);
  public auth = inject(AuthService);
  private leaguesSvc = inject(LeaguesService);

  leagues: League[] = [];
  loading = false;
  error: string | null = null;

  form = this.fb.group({
    name: ['', [Validators.required]],
    city: ['']
  });

  constructor() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.leaguesSvc.list().subscribe({
      next: (data) => { this.leagues = data; this.loading = false; },
      error: () => { this.error = 'No se pudo cargar ligas'; this.loading = false; }
    });
  }

  create() {
    if (!this.auth.isAdmin() || this.form.invalid) return;

    const { name, city } = this.form.getRawValue();
    this.leaguesSvc.create({ name: name!, city: city || null }).subscribe({
      next: () => { this.form.reset(); this.refresh(); },
      error: () => { this.error = 'No se pudo crear liga'; }
    });
  }

  deactivate(id: number) {
    if (!this.auth.isAdmin()) return;

    this.leaguesSvc.deactivate(id).subscribe({
      next: () => this.refresh(),
      error: () => { this.error = 'No se pudo desactivar'; }
    });
  }

  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
