import { BaseResolver } from "../base/BaseResolver";
import { Input } from "@/util";
import { SeasonResponse, UpdateSeasonParams } from "@/domain/Season";
import { FHLContext } from "@/domain/FHLContext";

export class UpdateSeasonResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Input<UpdateSeasonParams>,
    context: FHLContext
  ): Promise<SeasonResponse> {
    return await context.datasources.seasonDatasource.updateSeason(args.input);
  }
}
