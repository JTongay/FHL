import { resolverMap } from "@/resolvers/base/ResolverMap";
import { BooyahResolver } from "@/resolvers/Booyah.resolver";
import { HowdyResolver } from "@/resolvers/Howdy.resolver";
import { UserResolver } from "@/resolvers/user/User.resolver";
import { UsersResolver } from "@/resolvers/user/Users.resolver";

export const QueryResolvers = resolverMap({
  Query: {
    booyah: new BooyahResolver(),
    howdy: new HowdyResolver(),
    user: new UserResolver(),
    users: new UsersResolver(),
    // game: new GameResolver(),
    // games: new GamesResolver(),
    // league: new LeagueResolver(),
    // season: new SeasonResolver(),
    // seasons: new SeasonsResolver(),
    // event: new EventResolver(),
    // events: new EventsResolver(),
    // fhl: new FHLResolver(),
  },
});
