import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams: Team[] = [];
  leagueId = 1;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.listByLeague(this.leagueId).subscribe({
      next: data => this.teams = data
    });
  }
}
