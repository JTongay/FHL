import { FHLContext } from "@/domain/FHLContext";
import { AddTeamToSeasonParams } from "@/domain/Team";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Input } from "@/util";

export class AddTeamToSeasonResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Input<AddTeamToSeasonParams>,
    context: FHLContext
  ): Promise<string> {
    return await context.datasources.seasonDatasource.addTeamToSeason(
      args.input
    );
  }
}
