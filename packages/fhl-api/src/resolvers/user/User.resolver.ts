import { FHLContext } from "@/domain/Context";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { UserResponse } from "@/domain/User";
import { SeasonTeam } from "@/domain/Team";

export class UserResolver extends BaseResolver {
  protected async resolver(
    parent: SeasonTeam | unknown,
    args: { id: string },
    context: FHLContext,
  ): Promise<UserResponse> {
    if (parent && parent instanceof SeasonTeam) {
      return await context.datasources.userDatasource.getUser(
        +parent.captainId,
      );
    }
    return await context.datasources.userDatasource.getUser(+args.id);
  }
}
