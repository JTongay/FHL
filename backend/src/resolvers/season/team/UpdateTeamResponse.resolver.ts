import { FHLContext } from "@/domain/FHLContext";
import { Team, UpdateTeamResponse } from "@/domain/Team";
import { ApiError } from "@/domain/errors/FHLApiError";
import { BaseUnionResolver } from "@/resolvers/base/BaseUnionResolver";
import { Nullable } from "@/util";
import { GraphQLResolveInfo } from "graphql";

export class UpdateTeamResponseResolver extends BaseUnionResolver {
  protected resolveType(
    value: UpdateTeamResponse,
    context: FHLContext,
    info: GraphQLResolveInfo
  ): Nullable<string> {
    switch (value.constructor) {
      case Team:
        return "Team";
      case ApiError:
        return "ApiError";
      default:
        return null;
    }
  }
}
