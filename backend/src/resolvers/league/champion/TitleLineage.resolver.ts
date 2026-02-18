import { ApiError } from "@/domain/errors/FHLApiError";
import { FHLContext } from "@/domain/FHLContext";
import { ChampionLineageParams, TitleChange, League } from "@/domain/League";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class TitleLineageResolver extends BaseResolver {
  protected async resolver(
    parent: League,
    args: ChampionLineageParams,
    context: FHLContext
  ): Promise<TitleChange[] | ApiError> {
    return await context.datasources.leagueDatasource.getTitleLineage(
      parent.id,
      args
    );
  }
}
