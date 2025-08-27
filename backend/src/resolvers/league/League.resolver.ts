import { FHLContext } from "@/domain/FHLContext";
import { BaseResolver } from "../base/BaseResolver";
import { LeagueResponse } from "@/domain/League";

export class LeagueResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: { id: string },
    context: FHLContext
  ): Promise<LeagueResponse> {
    return await context.datasources.leagueDatasource.getLeague(+args.id);
  }
}
