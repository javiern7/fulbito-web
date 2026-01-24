import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  form!: FormGroup;
  leagueId = 1;

  defaultLogos: string[] = [
    'assets/teams/logos/logo1.svg',
    'assets/teams/logos/logo2.svg',
    'assets/teams/logos/logo3.svg',
    'assets/teams/logos/logo4.svg'
  ];

  selectedLogo = this.defaultLogos[0];

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      shortName: ['', [Validators.required, Validators.maxLength(10)]],
      colorPrimary: ['#1e40af', Validators.required],
      colorSecondary: ['#22c55e', Validators.required]
    });
  }

  pickLogo(logo: string): void {
    this.selectedLogo = logo;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = { ...this.form.value, logoUrl: this.selectedLogo };

    this.teamService.create(this.leagueId, payload).subscribe({
      next: () => this.router.navigate(['/teams']),
      error: err => console.error(err)
    });
  }

  cancel(): void {
    this.router.navigate(['/teams']);
  }
}
