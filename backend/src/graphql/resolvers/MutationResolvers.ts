import { resolverMap } from "@/resolvers/base/ResolverMap";
import { CreateLeagueResolver } from "@/resolvers/league/CreateLeague.resolver";
import { CreateFullSeasonResolver } from "@/resolvers/season/CreateFullSeason.resolver";
import { DeleteSeasonResolver } from "@/resolvers/season/DeleteSeason.resolver";
import { UpdateSeasonResolver } from "@/resolvers/season/UpdateSeason.resolver";
import { TestResolver } from "@/resolvers/Test.resolver";
import { CreateUserResolver } from "@/resolvers/user/CreateUser.resolver";
import { UpdateUserResolver } from "@/resolvers/user/UpdateUser.resolver";

export const MutationResolvers = resolverMap({
  Mutation: {
    createUser: new CreateUserResolver(),
    updateUser: new UpdateUserResolver(),
    createFullSeason: new CreateFullSeasonResolver(),
    updateSeason: new UpdateSeasonResolver(),
    deleteSeason: new DeleteSeasonResolver(),
    createLeague: new CreateLeagueResolver(),
    createTest: new TestResolver(),
  },
});
