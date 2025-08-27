import { BaseResolver } from "../base/BaseResolver";
import { CreateLeagueParams, League, LeagueResponse } from "@/domain/League";
import { Input } from "@/util";
import { ApiError } from "@/domain/errors/FHLApiError";
import { FHLContext } from "@/domain/FHLContext";

export class CreateLeagueResolver extends BaseResolver {
  protected async resolver(
    parent: any,
    args: Input<CreateLeagueParams>,
    context: FHLContext
  ): Promise<LeagueResponse> {
    return await context.datasources.leagueDatasource.createLeague(args.input);
  }
}
