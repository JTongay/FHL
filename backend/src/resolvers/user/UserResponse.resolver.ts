import { FHLContext } from "@/domain/FHLContext";
import { GraphQLResolveInfo } from "graphql";
import { BaseUnionResolver } from "../base/BaseUnionResolver";
import { User, UserResponse } from "@/domain/User";
import { ApiError } from "@/domain/errors/FHLApiError";

export class UserResponseResolver extends BaseUnionResolver {
  protected resolveType(
    value: UserResponse,
    context: FHLContext,
    info: GraphQLResolveInfo
  ): string | null {
    switch (value.constructor) {
      case User:
        return "User";
      case ApiError:
        return "ApiError";
      default:
        return null;
    }
  }
}
