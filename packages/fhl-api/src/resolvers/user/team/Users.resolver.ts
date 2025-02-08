import { FHLContext } from "@/domain/Context";
import { SeasonTeam } from "@/domain/Team";
import { User } from "@/domain/User";
import { ApiError } from "@/domain/errors/FHLApiError";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class TeamUsersResolver extends BaseResolver {
  protected async resolver(
    parent: SeasonTeam,
    args: unknown,
    context: FHLContext,
  ): Promise<User[] | ApiError> {
    return await context.datasources.userDatasource.getUsersBatch(
      parent.playerIds.map(Number),
    );
  }
}
