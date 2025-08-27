import { FHLContext } from "@/domain/FHLContext";
import { UpdateTeamParams, UpdateTeamResponse } from "@/domain/Team";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Input } from "@/util";

export class UpdateTeamResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Input<UpdateTeamParams>,
    context: FHLContext
  ): Promise<UpdateTeamResponse> {
    return await context.datasources.teamDatasource.updateTeam(args.input);
  }
}
