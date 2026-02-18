import { FHLContext } from "@/domain/FHLContext";
import { UsersList, UsersResponse } from "@/domain/User";
import { ApiError } from "@/domain/errors/FHLApiError";
import { BaseUnionResolver } from "@/resolvers/base/BaseUnionResolver";
import { Nullable } from "@/util";
import { GraphQLResolveInfo } from "graphql";

export class UsersResponseResolver extends BaseUnionResolver {
  protected resolveType(
    value: UsersResponse,
    context: FHLContext,
    info: GraphQLResolveInfo
  ): Nullable<string> {
    switch (value.constructor) {
      case UsersList:
        return "UsersList";
      case ApiError:
        return "ApiError";
      default:
        return null;
    }
  }
}
