import { FHLContext } from "@/domain/FHLContext";
import { LeagueTeam } from "@/domain/Team";
import { User } from "@/domain/User";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class UserTeamHistoryResolver extends BaseResolver {
  protected async resolver(
    parent: User,
    args: never,
    context: FHLContext
  ): Promise<LeagueTeam[]> {
    return await context.datasources.teamDatasource.getUserTeamHistory(
      parent.id
    );
  }
}
