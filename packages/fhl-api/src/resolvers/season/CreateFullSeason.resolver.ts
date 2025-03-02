import { FHLContext } from "@/domain/Context";
import { BaseResolver } from "../base/BaseResolver";
import { Input } from "@/util";
import { CreateFullSeasonParams } from "@/domain/Season";
import { ValidateNewSeason } from "@/usecase/validation/ValidateNewSeason";

/**
 * We want to create a season with the team captains and teams already selected.
 */
export class CreateFullSeason extends BaseResolver {
  protected async resolver(
    parent: unknown,
    args: Input<CreateFullSeasonParams>,
    context: FHLContext,
  ): Promise<unknown> {
    if (ValidateNewSeason()) {
      return await context.datasources.seasonDatasource.createFullSeason(
        args.input,
      );
    }
  }
}
