import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { API } from '../api/api';

type Role = 'ADMIN' | 'USER';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly token = signal<string | null>(localStorage.getItem('token'));
  readonly role  = signal<Role | null>(localStorage.getItem('role') as Role | null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string; role: Role }>(`${API.base}/auth/login`, { email, password })
      .pipe(tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        this.token.set(res.token);
        this.role.set(res.role);
      }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.token.set(null);
    this.role.set(null);
  }

  isLoggedIn() { return !!this.token(); }
  isAdmin() { return this.role() === 'ADMIN'; }
}
