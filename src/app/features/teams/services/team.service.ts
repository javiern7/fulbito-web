import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamService {

  private baseUrl = '/api/teams';

  constructor(private http: HttpClient) {}

  listByLeague(leagueId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/league/${leagueId}`);
  }

  create(leagueId: number, team: Partial<Team>): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/league/${leagueId}`, team);
  }
}
