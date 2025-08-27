import { FHLContext } from "@/domain/FHLContext";
import { CreateTeamResponse, Team } from "@/domain/Team";
import { ApiError } from "@/domain/errors/FHLApiError";
import { BaseUnionResolver } from "@/resolvers/base/BaseUnionResolver";
import { Nullable } from "@/util";
import { GraphQLResolveInfo } from "graphql";

export class CreateTeamResponseResolver extends BaseUnionResolver {
  protected resolveType(
    value: CreateTeamResponse,
    context: FHLContext,
    info: GraphQLResolveInfo
  ): Nullable<string> {
    if (value.constructor === Team) {
      return "Team";
    }

    if (value.constructor === ApiError) {
      return "ApiError";
    }

    return null;
  }
}
