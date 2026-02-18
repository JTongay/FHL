import { FHLContext } from "@/domain/FHLContext";
import { RemovePlayerFromTeamParams } from "@/domain/Team";
import { ApiError } from "@/domain/errors/FHLApiError";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Input } from "@/util";

export class RemovePlayerFromTeamResolver extends BaseResolver {
  protected async resolver(
    parent: unknown,
    args: Input<RemovePlayerFromTeamParams>,
    context: FHLContext
  ): Promise<boolean | ApiError> {
    return await context.datasources.teamDatasource.removePlayerFromTeam(
      args.input
    );
  }
}
