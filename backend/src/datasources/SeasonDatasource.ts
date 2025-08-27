import { db } from "@/db";
import { SeasonsTable } from "@/db/schema/leagues";
import { TeamSeasonTable } from "@/db/schema/users";
import { SelectSeason } from "@/db/types";
import { ApiError } from "@/domain/errors/FHLApiError";
import {
  CreateFullSeasonParams,
  Season,
  SeasonsList,
  SeasonsResponse,
  UpdateSeasonParams,
} from "@/domain/Season";
import { AddTeamToSeasonParams } from "@/domain/Team";
import { TeamRepository } from "@/repositories/Team.repository";
import { Nullable, Pagination } from "@/util";
import DataLoader from "dataloader";
import { and, count, eq, inArray } from "drizzle-orm";

export class SeasonDatasource {
  private teamRepository: TeamRepository;
  constructor() {
    this.teamRepository = new TeamRepository();
  }

  private batchSeasons = new DataLoader(async (ids: number[]) => {
    const seasonsList = await db
      .select()
      .from(SeasonsTable)
      .where(inArray(SeasonsTable.id, ids))
      .execute();

    if (!seasonsList.length) {
      // TODO: Might be better to throw a typed error here
      throw new Error("Seasons not found");
    }

    const seasonIdsToSeasonMap = seasonsList.reduce((mapping, season) => {
      mapping[season.id] = season;
      return mapping;
    }, {} as Record<string, SelectSeason>);
    return ids.map((id) => seasonIdsToSeasonMap[id]);
  });

  async getSeason(id: number) {
    const season = await this.batchSeasons.load(id);
    return new Season(season);
  }

  async getSeasons(ids: number[]) {
    return this.batchSeasons.loadMany(ids);
  }

  async getSeasonsPaginated({
    limit,
    offset,
  }: Pagination): Promise<SeasonsList | ApiError> {
    try {
      const total = await db
        .select({
          total: count(),
        })
        .from(SeasonsTable)
        .execute();

      const response = await db
        .select()
        .from(SeasonsTable)
        .limit(limit)
        .offset(offset)
        .execute();

      const seasons = response.map((season) => new Season(season));
      return new SeasonsList({ limit, offset }, total[0].total, seasons);
    } catch (e: unknown) {
      console.error("Error fetching seasons:", e);
      return new ApiError(400, e.toString());
    }
  }

  async addTeamToSeason(params: AddTeamToSeasonParams): Promise<string> {
    const teams = await this.teamRepository.countTeamsToSeason(
      +params.seasonId
    );
    if (teams >= 2) {
      throw new Error();
    }

    return await this.teamRepository.addTeamToSeason(params);
  }

  async getActiveSeason(leagueId: string): Promise<Nullable<Season>> {
    const result = await db
      .select()
      .from(SeasonsTable)
      .where(
        and(
          eq(SeasonsTable.isActive, true),
          eq(SeasonsTable.leagueId, +leagueId)
        )
      )
      .execute();

    if (!result || !result.length) {
      return null;
    }

    return new Season(result[0]);
  }

  // async getUpcomingSeason(leagueId: string): Promise<Nullable<Season>> {
  //   // Missin start_date?
  //   const result = await fhlDb
  //     .selectFrom("seasons")
  //     .where("is_active", "=", false)
  //     .where("league_id", "=", +leagueId)
  //     .where("start_date", ">=", sql`now()`)
  //     .orderBy("start_date", "asc")
  //     .selectAll()
  //     .executeTakeFirst();

  //   if (!result) {
  //     return null;
  //   }

  //   return new Season(result);
  // }

  /**
   *
   * @returns The season id of the created season
   */
  async createFullSeason(input: CreateFullSeasonParams): Promise<string> {
    try {
      const season = await db.transaction(async (trans) => {
        const addedSeason = await trans
          .insert(SeasonsTable)
          .values({
            leagueId: +input.leagueId,
            isActive: true,
            // TODO: What do I do with these dates?
            // year: new Date(input.startDate).getFullYear(),
            // startDate: new Date(input.startDate),
            // endDate: new Date(input.endDate),
          })
          .returning({ id: SeasonsTable.id })
          .execute();

        for (const team of input.teams) {
          await trans
            .insert(TeamSeasonTable)
            .values({
              teamId: +team.id,
              seasonId: +addedSeason[0].id,
              captainId: +team.captain,
            })
            .execute();
        }

        return addedSeason[0].id.toString();
      });

      return season;
    } catch (e) {
      console.log(e, "Error insterting a season with: ", e);
      throw e;
    }
  }

  async deleteSeason(id: number): Promise<boolean> {
    try {
      await db.delete(SeasonsTable).where(eq(SeasonsTable.id, id)).execute();
      return true;
    } catch (e) {
      console.error("Error deleting season:", e);
      return false;
    }
  }

  async updateSeason(params: UpdateSeasonParams): Promise<Season | ApiError> {
    try {
      const response = await db
        .update(SeasonsTable)
        .set({
          isActive: params.setActive,
          // year: params.year,
          // startDate: params.startDate,
          // endDate: params.endDate,
          // updatedAt: new Date(),
        })
        .where(eq(SeasonsTable.id, +params.id))
        .returning()
        .execute();

      return new Season(response);
    } catch (e: unknown) {
      console.error("Error updating season:", e);
      return new ApiError(1, e.toString());
    }
  }
}
