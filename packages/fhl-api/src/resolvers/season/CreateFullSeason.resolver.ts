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
    // Business Logic to Validate
    // Inspect the input
    // - Return an error if there are duplicate ids on keys
    //    This should be done through the repository, or I should be injecting the repositories
    //    on the context instead.
    // - Return an error if the minimum number of seasons in the request don't match whatever I set here.
    //   Minimum number I think should be 2
    // - Return an error if the startDate is after the endDate
    if (ValidateNewSeason()) {
      return await context.datasources.seasonDatasource.createFullSeason(
        args.input,
      );
    }
  }
}
