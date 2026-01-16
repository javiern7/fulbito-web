import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit() {
    this.error = null;
    if (this.form.invalid) return;

    this.loading = true;
    const { email, password } = this.form.getRawValue();

    this.auth.login(email!, password!)
      .subscribe({
        next: () => { this.loading = false; this.router.navigateByUrl('/leagues'); },
        error: () => { this.loading = false; this.error = 'Credenciales inválidas'; }
      });
  }
}
