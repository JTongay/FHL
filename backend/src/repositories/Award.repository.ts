import { db, DBTransaction, type DBSchema } from "@/db";
import {
  AwardSeasonPresenterTable,
  AwardSeasonWinnerTable,
  AwardsTable,
} from "@/db/schema/leagues";
import { Award, CreateAwardParams } from "@/domain/Award";
import { AwardMapper } from "@/domain/mappers/AwardMap";
import { and, eq, sql } from "drizzle-orm";

export class AwardRepository {
  public async getAwardsForUser(id: number): Promise<Award[]> {
    const result = await this.getAwardWinnersAndPresentersBase()
      .where(eq(AwardSeasonWinnerTable.winnerId, id))
      .execute();
    return result.map((award) => AwardMapper.toDomain(award[0]));
  }

  public async getAwardsForSeason(id: number): Promise<Award[]> {
    const result = await this.getAwardWinnersAndPresentersBase()
      .where(eq(AwardSeasonWinnerTable.seasonId, id))
      .execute();
    return result.map((award) => AwardMapper.toDomain(award[0]));
  }

  public async getAwardForSeason({
    seasonId,
    awardId,
  }: {
    seasonId: number;
    awardId: number;
  }): Promise<Award> {
    const result = await this.getAwardWinnersAndPresentersBase().where(
      and(
        eq(AwardSeasonWinnerTable.seasonId, seasonId),
        eq(AwardsTable.id, awardId)
      )
    ).execute;
    return AwardMapper.toDomain(result[0]);
  }

  public async createAward(params: CreateAwardParams): Promise<Award> {
    const { winningUserIds, presentingUserIds, name, description } = params;

    return await db.transaction(async (trx) => {
      const award = await trx
        .insert(AwardsTable)
        .values({
          name,
          description,
        })
        .returning()
        .execute();

      const winningUsers = await this.createAwardWinners(
        trx,
        +params.seasonId,
        award[0].id,
        winningUserIds
      );
      const presentingUSers = await this.createAwardPresenters(
        trx,
        +params.seasonId,
        award[0].id,
        presentingUserIds
      );

      return AwardMapper.toDomain({
        id: award[0].id,
        name: award[0].name,
        description: award[0].description,
        createdAt: award[0].createdAt,
        updatedAt: award[0].updatedAt,
        deletedAt: award[0].deletedAt,
        seasonId: params.seasonId.toString(),
        winners: winningUsers,
        presenters: presentingUSers,
      });
    });
  }

  private async test() {
    return await db.query.TeamSeasonTable.findMany({
      with: {
        players: {
          columns: {
            playerId: true,
          },
        },
      },
    });
  }

  private getAwardWinnersAndPresentersBase() {
    return db
      .select({
        id: AwardsTable.id,
        name: AwardsTable.name,
        description: AwardsTable.description,
        createdAt: AwardsTable.createdAt,
        updatedAt: AwardsTable.updatedAt,
        seasonId: AwardSeasonWinnerTable.seasonId,
        presenters: sql<number[]>`(
            SELECT COALESCE(json_agg(presenter_id), '[]'::json)
            FROM award_season_presenter
            WHERE award_season_presenter.award_id = ${AwardsTable.id}
        )`,
        winners: sql<number[]>`(
            SELECT COALESCE(json_agg(winner_id), '[]'::json)
            FROM award_season_winner
            WHERE award_season_winner.award_id = ${AwardsTable.id}
          )`,
      })
      .from(AwardsTable)
      .leftJoin(
        AwardSeasonWinnerTable,
        eq(AwardSeasonWinnerTable.awardId, AwardsTable.id)
      );
  }

  private async createAwardPresenters(
    db: DBTransaction,
    seasonId: number,
    awardId: number,
    presenters?: string[]
  ): Promise<string[]> {
    const result: string[] = [];
    if (presenters && presenters.length) {
      for await (const presenter of presenters) {
        const response = await db
          .insert(AwardSeasonPresenterTable)
          .values({
            seasonId,
            awardId,
            presenterId: +presenter,
          })
          .returning({
            presenterId: AwardSeasonPresenterTable.presenterId,
          })
          .execute();

        if (response && response.length) {
          result.push(response[0].presenterId.toString());
        }
      }
    }
    return Promise.resolve(result);
  }

  private async createAwardWinners(
    db: DBTransaction,
    seasonId: number,
    awardId: number,
    winners?: string[]
  ): Promise<string[]> {
    const result: string[] = [];
    if (winners && winners.length) {
      for await (const winner of winners) {
        const response = await db
          .insert(AwardSeasonWinnerTable)
          .values({
            seasonId,
            awardId,
            winnerId: +winner,
          })
          .returning({ winnerId: AwardSeasonWinnerTable.winnerId })
          .execute();

        if (response && response.length) {
          result.push(response[0].winnerId.toString());
        }
      }
    }
    return Promise.resolve(result);
  }
}
