import { typeResolverMap } from "@/resolvers/base/ResolverMap";
import { UserResponseResolver } from "@/resolvers/user/UserResponse.resolver";
import { UsersResponseResolver } from "@/resolvers/user/UsersResponse.resolver";

export const UnionResolvers = typeResolverMap({
  UserResponse: new UserResponseResolver(),
  UsersResponse: new UsersResponseResolver(),
});
