// import {Award, CreateAwardParams} from "@/domain/Award";
// import {AwardMapper} from "@/domain/mappers/AwardMap";
// import {fhlDb} from "@fhl/core/src/db";
// import {Database} from "@fhl/core/src/sql.generated";
// import {Transaction} from "kysely";
// import {jsonArrayFrom} from "kysely/helpers/postgres";

import { db } from "@/db";
import {
  AwardSeasonRelations,
  AwardSeasonTable,
  AwardsTable,
} from "@/db/schema/leagues";
import { eq, sql } from "drizzle-orm";

// export interface AwardTable {
//     id: number;
//     description: string | null;
//     name: string;
//     created_at: Date;
//     updated_at: Date;
//     season_id: number | null;
//     presenters: {
//         presenter_id: number | null;
//     }[];
//     winners: {
//         winner_id: number | null;
//     }[];
// }

export class AwardRepository {
  public async getAwardsForUser(id: number): Promise<Award[]> {
    // const result = await this.getAwardWinnersAndPresentersBase()
    //   .where("award_season_winner.winning_user_id", "=", id)
    //   .execute();
    // return result.map((award) => AwardMapper.toDomain(award));
  }
  //   public async getAwardsForSeason(id: number): Promise<Award[]> {
  //     const result = await this.getAwardWinnersAndPresentersBase()
  //         .where("award_season_winner.season_id", "=", id)
  //         .execute();
  //     return result.map((award) => AwardMapper.toDomain(award));
  //   }
  //   public async getAwardForSeason(
  //       {seasonId, awardId}: { seasonId: number, awardId: number }
  //   ): Promise<Award> {
  //     const result = await this.getAwardWinnersAndPresentersBase()
  //         .where("award_season_winner.season_id", "=", seasonId)
  //         .where("awards.id", "=", awardId)
  //         .executeTakeFirstOrThrow();
  //     return AwardMapper.toDomain(result);
  //   }
  //   public async createAward(params: CreateAwardParams): Promise<Award> {
  //     const {winningUserIds, presentingUserIds} = params;
  //     return await fhlDb.transaction().execute(async (db) => {
  //       const award = await db
  //           .insertInto("awards")
  //           .values({
  //             name: params.name,
  //             description: params.description,
  //           })
  //           .returningAll()
  //           .executeTakeFirstOrThrow();
  //       const winningUsers = await this.createAwardWinners(db, +params.seasonId, award.id, winningUserIds);
  //       const presentingUsers = await this.createAwardPresenters(db, +params.seasonId, award.id, presentingUserIds);
  //       // return AwardMapper.toDomain({
  //       //     id: award.id,
  //       //     name: award.name,
  //       //     description: award.name,
  //       //     created_at: award.created_at,
  //       //     updated_at: award.updated_at,
  //       //     season_id: +params.seasonId,
  //       //     winners: winningUserIds
  //       // })
  //       return {
  //         id: award.id.toString(),
  //         name: award.name,
  //         description: award.description,
  //         createdAt: award.created_at,
  //         updatedAt: award.updated_at,
  //         seasonId: params.seasonId,
  //         winningUserIds: winningUsers,
  //         presentingUserIds: presentingUsers,
  //       };
  //     });
  //   }

  private getAwardWinnersAndPresentersBase() {
    // return fhlDb
    //   .selectFrom("awards")
    //   .leftJoin(
    //     "award_season_winner",
    //     "award_season_winner.award_id",
    //     "awards.id"
    //   )
    //   .select((eb) => [
    //     "awards.id",
    //     "awards.name",
    //     "awards.description",
    //     "awards.created_at",
    //     "awards.updated_at",
    //     "award_season_winner.season_id",
    //     jsonArrayFrom(
    //       eb
    //         .selectFrom("award_season_presenter")
    //         .whereRef("award_season_presenter.award_id", "=", "awards.id")
    //         .select("award_season_presenter.presenter_id as presenter_id")
    //     ).as("presenters"),
    //     jsonArrayFrom(
    //       eb
    //         .selectFrom("award_season_winner")
    //         .whereRef("award_season_winner.award_id", "=", "awards.id")
    //         .select("award_season_winner.winning_user_id as winner_id")
    //     ).as("winners"),
    //   ]);
    // return db
    //   .select({
    //     id: AwardsTable.id,
    //     name: AwardsTable.name,
    //     description: AwardsTable.description,
    //     createdAt: AwardsTable.createdAt,
    //     updatedAt: AwardsTable.updatedAt,
    //     seasonId: AwardSeasonWinnerTable.seasonId,
    //     presenters: sql<number[]>`(
    //         SELECT COALESCE(json_agg())
    //     )`
    //   })
    //   .from(AwardsTable)
    //   .leftJoin(AwardSeasonWinnerTable, eq(AwardSeasonTable.awardId, AwardsTable.id));
  }
  //   private async createAwardPresenters(
  //       db: Transaction<Database>,
  //       seasonId: number,
  //       awardId: number,
  //       presenters?: string[]
  //   ): Promise<string[]> {
  //     const result: string[] = [];
  //     if (presenters && presenters.length) {
  //       for await (const presenter of presenters) {
  //         const response = await db.insertInto("award_season_presenter")
  //             .values({
  //               season_id: seasonId,
  //               award_id: awardId,
  //               presenter_id: +presenter,
  //             })
  //             .returning("presenter_id")
  //             .executeTakeFirstOrThrow();
  //         if (response && response.presenter_id) {
  //           result.push(response.presenter_id.toString());
  //         }
  //       }
  //     }
  //     return Promise.resolve(result);
  //   }
  //   private async createAwardWinners(
  //       db: Transaction<Database>,
  //       seasonId: number,
  //       awardId: number,
  //       winners?: string[]
  //   ): Promise<string[]> {
  //     const result: string[] = [];
  //     if (winners && winners.length) {
  //       for await (const winner of winners) {
  //         const response = await db.insertInto("award_season_winner")
  //             .values({
  //               season_id: seasonId,
  //               award_id: awardId,
  //               winning_user_id: +winner,
  //             })
  //             .returning("winning_user_id")
  //             .executeTakeFirstOrThrow();
  //         if (response && response.winning_user_id) {
  //           result.push(response.winning_user_id.toString());
  //         }
  //       }
  //     }
  //     return Promise.resolve(result);
  //   }
}
