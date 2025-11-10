import { db } from "@/db";
import { StorylinesTable, UserStorylineTable } from "@/db/schema/users";
import {
  CreateStorylineParams,
  DeleteStorylineParams,
  Storyline,
  UpdateStorylineParams,
} from "@/domain/Storyline";
import DataLoader from "dataloader";
import { eq, sql } from "drizzle-orm";

export class StorylineDatasource {
  // // TODO This is most likely incorrect
  // private batchStorylines = new DataLoader<number, Storylines>(
  //   async (ids: number[]) => {
  //     const storylineList = await fhlDb
  //       .selectFrom("storylines")
  //       .where("id", "in", ids)
  //       .selectAll()
  //       .execute();
  //     const storylineIdsToStorylineMap = storylineList.reduce(
  //       (mapping, storyline) => {
  //         mapping[storyline.id] = storyline;
  //         return mapping;
  //       },
  //       {}
  //     );
  //     return ids.map((id) => storylineIdsToStorylineMap[id]);
  //   }
  // );
  // async getStoryline(id: number) {
  //   return this.batchStorylines.load(id);
  // }
  // // async getStorylines(ids: number[]) {
  // //     return this.batchStorylines.loadMany(ids);
  // // }
  async createStoryline(params: CreateStorylineParams): Promise<Storyline> {
    return await db.transaction(async (trx) => {

      const storyline = await trx.insert(StorylinesTable).values({
        description: params.description,
        seasonId: +params.seasonId
      }).returning().execute();

      const userStorylines: number[] = []
      for (const userId of params.users) {
        const response = await trx.insert(UserStorylineTable)
          .values({
            userId: +userId,
            storylineId: storyline[0].id
          }).returning({
            userId: UserStorylineTable.userId
          }).execute()

        userStorylines.push(response[0].userId)
      }

      return new Storyline(storyline, userStorylines)
    })
  }
  async updateStoryline(params: UpdateStorylineParams): Promise<Storyline> {
    return await db.transaction(async (trx) => {
      const storyline = await trx.update(StorylinesTable).set({
        description: params.description,
        updatedAt: sql`now()`
      })
        .where(eq(StorylinesTable.id, +params.id))
        .returning()
        .execute()

      // TODO Change the users involved in the storyline?
      // for (const userId of params.users) {
      //
      // }
      return new Storyline(storyline, params.users.map(Number))
    })
  }

  async deleteStoryline(params: DeleteStorylineParams): Promise<boolean> {
    // I think the ON DELETE CASCADE should make the UserStorylineTable entry also be removed?
    await db.delete(StorylinesTable).where(eq(StorylinesTable.id, +params.id))

    return true
  }
}
