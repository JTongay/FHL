import { FHLContext } from "@/domain/FHLContext";
import { BaseResolver } from "../base/BaseResolver";
import { SeasonResponse } from "@/domain/Season";
import { ApiError } from "@/domain/errors/FHLApiError";

export class SeasonResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: { id: string },
    context: FHLContext
  ): Promise<SeasonResponse> {
    try {
      return await context.datasources.seasonDatasource.getSeason(+args.id);
    } catch (e: unknown) {
      return new ApiError(4001, e.toString());
    }
  }
}
