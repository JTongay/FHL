import { FHLContext } from "@/domain/FHLContext";
import { CreateTeamParams, CreateTeamResponse } from "@/domain/Team";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Input } from "@/util";

export class CreateTeamResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Input<CreateTeamParams>,
    context: FHLContext
  ): Promise<CreateTeamResponse> {
    return await context.datasources.teamDatasource.createTeam(args.input);
  }
}
