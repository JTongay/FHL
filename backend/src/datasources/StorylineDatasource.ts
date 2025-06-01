import {CreateStorylineParams, Storyline, UpdateStorylineParams} from "@/domain/Storyline";
import {fhlDb} from "@fhl/core/src/db";
import {Storylines} from "@fhl/core/src/sql.generated";
import DataLoader from "dataloader";
import {Selectable} from "kysely";

export class StorylineDatasource {
  // TODO This is most likely incorrect
  private batchStorylines = new DataLoader<number, Selectable<Storylines>>(
      async (ids: number[]) => {
        const storylineList = await fhlDb.selectFrom("storylines")
            .where("id", "in", ids)
            .selectAll()
            .execute();

        const storylineIdsToStorylineMap = storylineList.reduce((mapping, storyline) => {
          mapping[storyline.id] = storyline;
          return mapping;
        }, {});

        return ids.map((id) => storylineIdsToStorylineMap[id]);
      });

  async getStoryline(id: number) {
    return this.batchStorylines.load(id);
  }

  // async getStorylines(ids: number[]) {
  //     return this.batchStorylines.loadMany(ids);
  // }


  async createStoryline(params: CreateStorylineParams): Promise<Storyline> {
    return fhlDb.transaction().execute(async () => {
      const storyline = await fhlDb.insertInto("storylines")
          .values({
            description: params.description,
            season_id: +params.seasonId,
          })
          .returningAll()
          .executeTakeFirstOrThrow();
      const userStorylines: number[] = [];
      for (const userId of params.users) {
        const response = await fhlDb.insertInto("user_storyline")
            .values({
              user_id: +userId,
              storyline_id: storyline.id,
            })
            .returning("user_storyline.user_id")
            .executeTakeFirstOrThrow();
        userStorylines.push(+response);
      }

      return new Storyline(storyline, userStorylines);
    });
  }

  // async updateStoryline(params: UpdateStorylineParams): Promise<Storyline> {
  //     return fhlDb.transaction().execute(async () => {
  //         const storyline = fhlDb.updateTable("storylines")
  //             .set({
  //                 description: params.description,
  //                 updated_at: new Date()
  //             })
  //             .returningAll()
  //             .executeTakeFirstOrThrow();
  //         const userStorylines: number[] = []
  //         params.users.forEach(async (userId) => {
  //             const response = await fhlDb.updateTable()
  //         });

  //     })
  // }
}
