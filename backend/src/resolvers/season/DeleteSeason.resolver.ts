import { BaseResolver } from "../base/BaseResolver";
import { Input } from "@/util";
import { DeleteSeasonParams } from "@/domain/Season";
import { FHLContext } from "@/domain/FHLContext";

export class DeleteSeasonResolver extends BaseResolver {
  protected async resolver(
    parent: any,
    args: Input<DeleteSeasonParams>,
    context: FHLContext
  ): Promise<boolean> {
    return await context.datasources.seasonDatasource.deleteSeason(
      +args.input.id
    );
  }
}
