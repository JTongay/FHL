import DataLoader from "dataloader";
import { fhlDb } from "@fhl/core/src/db";
import { Award, AwardsList, CreateAwardParams } from "@/domain/Award";
import { Pagination } from "@/util";
import { AwardRepository } from "@/repositories/Award.repository";

export class AwardDatasource {
  private awardRepo: AwardRepository;
  constructor() {
    this.awardRepo = new AwardRepository();
  }
  private batchAwards = new DataLoader(async (ids: number[]) => {
    const awardsList = await fhlDb
      .selectFrom("award_season_winner")
      .where("id", "in", ids)
      // .innerJoin("")
      .selectAll()
      .execute();
    // Dataloader expects you to return a list with the results ordered just like the list in the arguments were
    // Since the database might return the results in a different order the following code sorts the results accordingly
    const awardIdsToAwardMap = awardsList.reduce((mapping, award) => {
      mapping[award.id] = award;
      return mapping;
    }, {} as { [key: string]: Record<string, any> }); // TODO fix the type here
    return ids.map((id) => awardIdsToAwardMap[id]);
  });

  async getAward(id: number) {
    return this.batchAwards.load(id);
  }

  async getAwards(ids: number[]) {
    return this.batchAwards.loadMany(ids);
  }

  async createAward(params: CreateAwardParams): Promise<Award> {
    try {
      return await this.awardRepo.createAward(params);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getAwardForSeason(
    { seasonId, awardId }: { seasonId: number, awardId: number }
  ): Promise<Award> {
    return await this.awardRepo.getAwardForSeason({ seasonId, awardId });
  }

  async getAwardsForSeason(seasonId: number, pagination: Pagination) {
    const awards = await this.awardRepo.getAwardsForSeason(seasonId);

    return new AwardsList(pagination, awards.length, awards);
  }

  async getAwardsForUser(userId: number, pagination: Pagination) {
    const awards = await this.awardRepo.getAwardsForUser(userId);

    return new AwardsList(pagination, awards.length, awards);
  }
}

