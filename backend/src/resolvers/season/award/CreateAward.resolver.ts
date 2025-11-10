import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Input } from "@/util";
import { AwardResponse, CreateAwardParams } from "@/domain/Award";
import { FHLContext } from "@/domain/FHLContext";

export class CreateAwardResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Input<CreateAwardParams>,
    context: FHLContext
  ): Promise<AwardResponse> {

    return await context.datasources.awardDatasource.createAward(args.input);

  }
}
