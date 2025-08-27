import { FHLContext } from "@/domain/FHLContext";
import { SeasonTeam } from "@/domain/Team";
import { ApiError } from "@/domain/errors/FHLApiError";
import { BaseUnionResolver } from "@/resolvers/base/BaseUnionResolver";
import { Nullable } from "@/util";
import { GraphQLResolveInfo } from "graphql";

export class SeasonTeamResponseResolver extends BaseUnionResolver {
  protected resolveType(
    value: SeasonTeam,
    context: FHLContext,
    info: GraphQLResolveInfo
  ): Nullable<string> {
    if (value.constructor === SeasonTeam) {
      return "Team";
    }
    if (value.constructor === ApiError) {
      return "ApiError";
    }

    return null;
  }
}
