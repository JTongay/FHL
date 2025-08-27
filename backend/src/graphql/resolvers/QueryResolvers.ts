import { resolverMap } from "@/resolvers/base/ResolverMap";
import { BooyahResolver } from "@/resolvers/Booyah.resolver";
import { HowdyResolver } from "@/resolvers/Howdy.resolver";
import { EventResolver } from "@/resolvers/league/event/Event.resolver";
import { FHLResolver } from "@/resolvers/league/fhl/FHL.resolver";
import { LeagueResolver } from "@/resolvers/league/League.resolver";
import { SeasonResolver } from "@/resolvers/season/Season.resolver";
import { SeasonsResolver } from "@/resolvers/season/Seasons.resolver";
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
    league: new LeagueResolver(),
    season: new SeasonResolver(),
    seasons: new SeasonsResolver(),
    event: new EventResolver(),
    // events: new EventsResolver(),
    fhl: new FHLResolver(),
  },
});
