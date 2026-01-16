import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../core/api/api';

export interface League {
  id: number;
  name: string;
  city: string | null;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class LeaguesService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<League[]>(`${API.base}/leagues`);
  }

  create(payload: { name: string; city?: string | null; }) {
    return this.http.post<League>(`${API.base}/leagues`, payload);
  }

  deactivate(id: number) {
    return this.http.delete<void>(`${API.base}/leagues/${id}`);
  }
}
