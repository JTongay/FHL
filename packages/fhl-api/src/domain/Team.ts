import { TeamTable } from "@/repositories/Team.repository";
import { ApiError } from "./errors/FHLApiError";

export interface BaseTeamTable {
  id: number;
  name: string;
  wins: number;
  losses: number;
  created_at: Date;
  updated_at: Date;
}

export class Team {
  id: string;
  name: string;
  wins: number;
  losses: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(table: BaseTeamTable) {
    this.id = table.id.toString();
    this.name = table.name;
    this.wins = table.wins;
    this.losses = table.losses;
    this.createdAt = table.created_at;
    this.updatedAt = table.updated_at;
  }
}

export class SeasonTeam extends Team {
  captainId: string;
  playerIds: string[];

  constructor(table: TeamTable) {
    super({
      id: table.id,
      name: table.name,
      wins: table.wins,
      losses: table.losses,
      created_at: table.created_at,
      updated_at: table.updated_at,
    });
    this.captainId = table.captain_id.toString();
    this.playerIds = table.players.map(String);
  }
}

export class LeagueTeam extends Team {
  captainId: string;
  leagueId: string;

  constructor(table: TeamTable) {
    super({
      id: table.id,
      name: table.name,
      wins: table.wins,
      losses: table.losses,
      created_at: table.created_at,
      updated_at: table.updated_at,
    });
    this.captainId = table.captain_id.toString();
    this.leagueId = table.league_id.toString();
  }
}

export type CreateTeamParams = {
  name: string;
  leagueId: string;
};

export type AddTeamToSeasonParams = {
  seasonId: string;
  teamId: string;
  captainId: string;
};

export type UpdateTeamParams = {
  teamId: string;
  name: string;
};

export type AddPlayerToTeamParams = {
  seasonId: string;
  teamId: string;
  playerId: string;
};

export type RemovePlayerFromTeamParams = {
  seasonId: string;
  teamId: string;
  playerId: string;
};

export type SeasonTeamResponse = ApiError | SeasonTeam;
export type CreateTeamResponse = ApiError | Team;
export type UpdateTeamResponse = ApiError | Team;
// export type TeamsResponse
