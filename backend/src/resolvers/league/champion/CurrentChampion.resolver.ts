import { ApiError } from "@/domain/errors/FHLApiError";
import { FHLContext } from "@/domain/FHLContext";
import { League } from "@/domain/League";
import { User } from "@/domain/User";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Nullable } from "@/util";

export class CurrentChampionResolver extends BaseResolver {
  protected async resolver(
    parent: League,
    args: never,
    context: FHLContext
  ): Promise<Nullable<User> | ApiError> {
    return await context.datasources.leagueDatasource.getCurrentChampion(
      parent.id
    );
  }
}
