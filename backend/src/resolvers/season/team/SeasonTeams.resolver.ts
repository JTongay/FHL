import { FHLContext } from "@/domain/FHLContext";
import { Season } from "@/domain/Season";
import { SeasonTeam } from "@/domain/Team";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class SeasonTeamsResolver extends BaseResolver {
  protected async resolver(
    parent: Season,
    args: unknown, // TODO Pagination
    context: FHLContext
  ): Promise<SeasonTeam[]> {
    return await context.datasources.teamDatasource.getTeamsForSeason(
      parent.id
    );
  }
}
