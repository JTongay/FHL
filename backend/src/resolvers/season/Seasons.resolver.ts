import { BaseResolver } from "../base/BaseResolver";
import { Pagination } from "@/util";
import { Season, SeasonsList, SeasonsResponse } from "@/domain/Season";
import { ApiError } from "@/domain/errors/FHLApiError";
import { FHLContext } from "@/domain/FHLContext";

export class SeasonsResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Pagination,
    context: FHLContext
  ): Promise<SeasonsResponse> {
    return await context.datasources.seasonDatasource.getSeasonsPaginated(args);
  }
}
