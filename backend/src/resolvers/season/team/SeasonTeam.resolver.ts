import { FHLContext } from "@/domain/FHLContext";
import { Season } from "@/domain/Season";
import { SeasonTeamResponse } from "@/domain/Team";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class SeasonTeamResolver extends BaseResolver {
  protected async resolver(
    parent: Season,
    args: { id: string },
    context: FHLContext
  ): Promise<SeasonTeamResponse> {
    return await context.datasources.teamDatasource.getTeamForSeason({
      seasonId: parent.id,
      teamId: args.id,
    });
  }
}
