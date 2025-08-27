import { FHLContext } from "@/domain/FHLContext";
import { AddPlayerToTeamParams } from "@/domain/Team";
import { ApiError } from "@/domain/errors/FHLApiError";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Input } from "@/util";

export class DraftPlayerToTeamResolver extends BaseResolver {
  protected async resolver(
    parent: unknown,
    args: Input<AddPlayerToTeamParams>,
    context: FHLContext
  ): Promise<string | ApiError> {
    return await context.datasources.teamDatasource.draftPlayerToTeam(
      args.input
    );
  }
}
