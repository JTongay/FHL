import { db } from "@/db";
import { SeasonsTable } from "@/db/schema/leagues";
import {
  TeamSeasonTable,
  TeamsTable,
  UserTeamSeasonTable,
} from "@/db/schema/users";
import {
  AddPlayerToTeamParams,
  AddTeamToSeasonParams,
  CreateTeamParams,
  LeagueTeam,
  RemovePlayerFromTeamParams,
  SeasonTeam,
  Team,
  UpdateTeamParams,
} from "@/domain/Team";
import { eq, sql, and, or, count } from "drizzle-orm";

export interface TeamTable {
  teamId: number;
  players: number[];
  captainId: number;
  seasonId: number;
  name: string;
  wins: number;
  losses: number;
  leagueId: number;
}

export class TeamRepository {
  public async getTeamsForSeasonWithPlayers(
    seasonId: string
  ): Promise<SeasonTeam[]> {
    const result = await db
      .select({
        teamId: TeamsTable.id,
        name: TeamsTable.name,
        leagueId: TeamsTable.leagueId,
        wins: TeamSeasonTable.wins,
        losses: TeamSeasonTable.losses,
        captainId: TeamSeasonTable.captainId,
        seasonId: TeamSeasonTable.seasonId,
        players: sql<number[]>`(
          SELECT COALESCE(json_agg(player_id), '[]'::json)
          FROM user_team_season 
          WHERE team_id = ${TeamSeasonTable.teamId}
        )`,
      })
      .from(TeamSeasonTable)
      .leftJoin(TeamsTable, eq(TeamSeasonTable.teamId, TeamsTable.id))
      .leftJoin(SeasonsTable, eq(TeamSeasonTable.seasonId, SeasonsTable.id))
      .where(eq(TeamSeasonTable.seasonId, +seasonId))
      .execute();

    return result.map((team) => {
      return new SeasonTeam(team);
    });
  }
  public async getTeamsForSeason(seasonId: string): Promise<SeasonTeam[]> {
    const result = await db
      .select({
        teamId: TeamsTable.id,
        name: TeamsTable.name,
        leagueId: TeamsTable.leagueId,
        wins: TeamSeasonTable.wins,
        losses: TeamSeasonTable.losses,
        captainId: TeamSeasonTable.captainId,
        seasonId: TeamSeasonTable.seasonId,
        players: sql<number[]>`(
          SELECT COALESCE(json_agg(player_id), '[]'::json)
          FROM user_team_season 
          WHERE team_id = ${TeamSeasonTable.teamId}
        )`,
      })
      .from(TeamSeasonTable)
      .leftJoin(TeamsTable, eq(TeamSeasonTable.teamId, TeamsTable.id))
      .where(eq(TeamSeasonTable.seasonId, +seasonId))
      .execute();
    return result.map((team) => {
      return new SeasonTeam(team);
    });
  }

  public async getTeamForSeason({
    seasonId,
    teamId,
  }: {
    seasonId: string;
    teamId: string;
  }): Promise<SeasonTeam> {
    // const result = await fhlDb
    //   .selectFrom("team_season")
    //   .innerJoin("teams", "teams.id", "team_season.team_id")
    //   .select([
    //     "teams.id",
    //     "teams.name",
    //     "teams.league_id",
    //     "teams.created_at", // TODO Figure out if we want the teams date or the team_season date
    //     "teams.updated_at", // TODO Figure out if we want the teams date or the team_season date
    //     "team_season.wins",
    //     "team_season.losses",
    //     "team_season.captain_id",
    //     "team_season.season_id",
    //   ])
    //   .where("season_id", "=", +seasonId)
    //   .where("team_id", "=", +teamId)
    //   .select(({ eb }) => [
    //     jsonArrayFrom(
    //       eb
    //         .selectFrom("user_team_season")
    //         .whereRef("team_id", "=", "team_season.team_id")
    //         .select("player_id")
    //     ).as("players"),
    //   ])
    //   .executeTakeFirstOrThrow();
    const result = await db
      .select({
        teamId: TeamsTable.id,
        name: TeamsTable.name,
        leagueId: TeamsTable.leagueId,
        wins: TeamSeasonTable.wins,
        losses: TeamSeasonTable.losses,
        captainId: TeamSeasonTable.captainId,
        seasonId: TeamSeasonTable.seasonId,
        players: sql<number[]>`(
        SELECT COALESCE(json_agg(player_id), '[]'::json)
        FROM user_team_season 
        WHERE team_id = ${TeamSeasonTable.teamId}
      )`,
      })
      .from(TeamSeasonTable)
      .leftJoin(TeamsTable, eq(TeamSeasonTable.teamId, TeamsTable.id))
      .where(
        and(
          eq(TeamSeasonTable.seasonId, +seasonId),
          eq(TeamSeasonTable.teamId, +teamId)
        )
      )
      .execute();

    // TODO - Can I just return the first or do I need to limit 1?
    return new SeasonTeam(result[0]);
  }
  public async getLeagueTeams(leagueId: string): Promise<Team[]> {
    const result = await db
      .select()
      .from(TeamsTable)
      .where(eq(TeamsTable.leagueId, +leagueId))
      .execute();
    return result.map((team) => new Team(team));
  }
  /**
   * @deprecated - I don't know what I was thinking with this??
   * @param leagueId
   * @returns
   */
  // public async getTeamsForLeague(leagueId: string): Promise<LeagueTeam[]> {
  //   const result = await fhlDb
  //     .selectFrom("user_team_season")
  //     .innerJoin("teams", "teams.id", "user_team_season.team_id")
  //     .innerJoin(
  //       "team_season",
  //       "team_season.season_id",
  //       "user_team_season.season_id"
  //     )
  //     .select([
  //       "player_id",
  //       "team_season.season_id",
  //       "teams.id",
  //       "teams.name",
  //       "teams.league_id",
  //       "teams.created_at", // TODO Figure out if we want the teams date or the team_season date
  //       "teams.updated_at", // TODO Figure out if we want the teams date or the team_season date
  //       "team_season.wins",
  //       "team_season.losses",
  //       "team_season.captain_id",
  //     ])
  //     .where("teams.league_id", "=", +leagueId)
  //     .execute();
  //   const playerIds = result.map((team) => team.player_id);
  //   return result.map((team) => {
  //     const teamData = { ...team, player_ids: playerIds };
  //     return new LeagueTeam(teamData);
  //   });
  // }
  public async getTeamForLeague({
    leagueId,
    teamId,
  }: {
    leagueId: string;
    teamId: string;
  }): Promise<LeagueTeam> {
    const result = await db
      .select({
        playerId: UserTeamSeasonTable.playerId,
        seasonId: UserTeamSeasonTable.seasonId,
        teamId: TeamsTable.id,
        name: TeamsTable.name,
        createdAt: TeamsTable.createdAt,
        updatedAt: TeamsTable.updatedAt,
        leagueId: TeamsTable.leagueId,
        wins: TeamSeasonTable.wins,
        losses: TeamSeasonTable.losses,
        captainId: TeamSeasonTable.captainId,
      })
      .from(UserTeamSeasonTable)
      .leftJoin(TeamsTable, eq(UserTeamSeasonTable.teamId, TeamsTable.id))
      .leftJoin(
        TeamSeasonTable,
        eq(TeamSeasonTable.seasonId, UserTeamSeasonTable.seasonId)
      )
      .where(
        and(eq(TeamsTable.leagueId, +leagueId), eq(TeamsTable.id, +teamId))
      )
      .execute();
    const playerIds = result.map((team) => team.playerId);
    const teamData = { ...result[0], players: playerIds };
    // TODO - I think this is off
    return new LeagueTeam(teamData);
  }

  public async getUserTeamHistory(userId: string): Promise<LeagueTeam[]> {
    const result = await db
      .select({
        playerId: UserTeamSeasonTable.playerId,
        seasonId: UserTeamSeasonTable.seasonId,
        teamId: TeamsTable.id,
        name: TeamsTable.name,
        createdAt: TeamsTable.createdAt,
        updatedAt: TeamsTable.updatedAt,
        leagueId: TeamsTable.leagueId,
        wins: TeamSeasonTable.wins,
        losses: TeamSeasonTable.losses,
        captainId: TeamSeasonTable.captainId,
      })
      .from(UserTeamSeasonTable)
      .leftJoin(TeamsTable, eq(UserTeamSeasonTable.teamId, TeamsTable.id))
      .leftJoin(
        TeamSeasonTable,
        eq(TeamSeasonTable.seasonId, UserTeamSeasonTable.seasonId)
      )
      .where(
        or(
          eq(UserTeamSeasonTable.playerId, +userId),
          eq(TeamSeasonTable.captainId, +userId)
        )
      )
      .execute();
    const playerIds = result.map((team) => team.playerId);
    return result.map((team) => {
      const teamData = { ...team, players: playerIds };
      return new LeagueTeam(teamData);
    });
  }

  public async createTeam(params: CreateTeamParams): Promise<Team> {
    const result = await db
      .insert(TeamsTable)
      .values({
        name: params.name,
        leagueId: +params.leagueId,
      })
      .returning()
      .execute();
    return new Team(result[0]);
  }

  public async addTeamToSeason(params: AddTeamToSeasonParams): Promise<string> {
    const result = await db
      .insert(TeamSeasonTable)
      .values({
        captainId: +params.captainId,
        seasonId: +params.seasonId,
        teamId: +params.teamId,
      })
      .returning({ teamId: TeamSeasonTable.teamId })
      .execute();

    return result[0].teamId.toString();
  }

  public async countTeamsToSeason(seasonId: number): Promise<number> {
    const result = await db
      .select({
        count: count(),
      })
      .from(TeamSeasonTable)
      .where(eq(TeamSeasonTable.seasonId, seasonId))
      .execute();

    return result[0].count || 0;
  }

  public async updateTeam(params: UpdateTeamParams): Promise<Team> {
    const result = await db
      .update(TeamsTable)
      .set({
        name: params.name,
        updatedAt: sql`now()`,
      })
      .where(eq(TeamsTable.id, +params.teamId))
      .returning()
      .execute();

    return new Team(result[0]);
  }

  public async addPlayerToTeam(params: AddPlayerToTeamParams): Promise<string> {
    const result = await db
      .insert(UserTeamSeasonTable)
      .values({
        seasonId: +params.seasonId,
        teamId: +params.teamId,
        playerId: +params.playerId,
      })
      .returning({
        id: UserTeamSeasonTable.playerId,
      })
      .execute();

    return result[0].id.toString();
  }

  public async removePlayerFromTeam(
    params: RemovePlayerFromTeamParams
  ): Promise<boolean> {
    await db
      .delete(UserTeamSeasonTable)
      .where(
        and(
          eq(UserTeamSeasonTable.playerId, +params.playerId),
          eq(UserTeamSeasonTable.seasonId, +params.seasonId),
          eq(UserTeamSeasonTable.teamId, +params.teamId)
        )
      )
      .execute();

    return true;
  }
}
