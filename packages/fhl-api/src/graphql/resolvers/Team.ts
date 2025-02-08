import { resolverMap } from "@/resolvers/base/ResolverMap";
import { UserResolver } from "@/resolvers/user/User.resolver";
import { TeamUsersResolver } from "@/resolvers/user/team/Users.resolver";

export const TeamResolvers = resolverMap({
  Team: {
    captain: new UserResolver(),
    members: new TeamUsersResolver(),
  },
});
