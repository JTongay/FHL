import { CreateFullSeasonParams, Season } from "@/domain/Season";
import { AddTeamToSeasonParams } from "@/domain/Team";
import { TeamRepository } from "@/repositories/Team.repository";
import { Nullable } from "@/util";
import { fhlDb } from "@fhl/core/src/db";
import { Seasons } from "@fhl/core/src/sql.generated";
import DataLoader from "dataloader";
import { Selectable, sql } from "kysely";

export class SeasonDatasource {
  private teamRepository: TeamRepository;
  constructor() {
    this.teamRepository = new TeamRepository();
  }

  private batchSeasons = new DataLoader<number, Selectable<Seasons>>(
    async (ids: number[]) => {
      const seasonsList = await fhlDb
        .selectFrom("seasons")
        .where("id", "in", ids)
        .selectAll()
        .execute();
      if (!seasonsList.length) {
        // TODO: Might be better to throw a typed error here
        throw new Error("Seasons not found");
      }

      const seasonIdsToSeasonMap = seasonsList.reduce(
        (mapping, season) => {
          mapping[season.id] = season;
          return mapping;
        },
        {} as Record<string, Selectable<Seasons>>,
      );
      return ids.map((id) => seasonIdsToSeasonMap[id]);
    },
  );

  async getSeason(id: number) {
    const season = await this.batchSeasons.load(id);
    return new Season(season);
  }

  async getSeasons(ids: number[]) {
    return this.batchSeasons.loadMany(ids);
  }

  async addTeamToSeason(params: AddTeamToSeasonParams): Promise<string> {
    const teams = await this.teamRepository.countTeamsToSeason(
      +params.seasonId,
    );
    if (teams >= 2) {
      throw new Error();
    }

    return await this.teamRepository.addTeamToSeason(params);
  }

  async getActiveSeason(leagueId: string): Promise<Nullable<Season>> {
    const result = await fhlDb
      .selectFrom("seasons")
      .where("is_active", "=", true)
      .where("league_id", "=", +leagueId)
      .selectAll()
      .executeTakeFirst();

    if (!result) {
      return null;
    }

    return new Season(result);
  }

  async getUpcomingSeason(leagueId: string): Promise<Nullable<Season>> {
    const result = await fhlDb
      .selectFrom("seasons")
      .where("is_active", "=", false)
      .where("league_id", "=", +leagueId)
      .where("start_date", ">=", sql`now()`)
      .orderBy("start_date", "asc")
      .selectAll()
      .executeTakeFirst();

    if (!result) {
      return null;
    }

    return new Season(result);
  }

  /**
   *
   * @returns The season id of the created season
   */
  async createFullSeason(input: CreateFullSeasonParams): Promise<string> {
    // Inspect the input, throw an error if there are duplicate ids on keys
    // This should be done through the repository, or I should be injecting the repositories
    // on the context instead. Doesn't super matter if it's just me, but maybe come back to this
    // idea if things become a hindrance
    try {
      const season = await fhlDb.transaction().execute(async (trans) => {
        console.log(input, "Input in the DataSource");
        const addedSeason = await trans
          .insertInto("seasons")
          .values({
            league_id: +input.leagueId,
            is_active: true,
            year: new Date(input.startDate).getFullYear(),
            start_date: new Date(input.startDate),
            end_date: new Date(input.endDate),
          })
          .returning("id")
          .executeTakeFirstOrThrow();

        for (const team of input.teams) {
          await trans
            .insertInto("team_season")
            .values({
              team_id: +team.id,
              season_id: +addedSeason.id,
              captain_id: +team.captain,
            })
            .executeTakeFirstOrThrow();
        }

        return addedSeason.id.toString();
      });

      return season;
    } catch (e) {
      console.log(e, "Error insterting a season with: ", e);
      throw e;
    }
  }
}
