import {resolverMap} from "@/resolvers/base/ResolverMap";
import {ActiveSeasonResolver} from "@/resolvers/league/fhl/ActiveSeason.resolver";
import {BottomFiveUserRecordsResolver} from "@/resolvers/league/fhl/BottomFiveUserRecords.resolver";
import {CurrentChampionResolver} from "@/resolvers/league/fhl/CurrentChampion.resolver";
import {TopFiveUserRecordsResolver} from "@/resolvers/league/fhl/TopFiveUserRecords.resolver";
import { UpcomingSeasonResolver } from "@/resolvers/league/fhl/UpcomingSeason.resolver";

export const FHLResolvers = resolverMap({
  FHL: {
    activeSeason: new ActiveSeasonResolver(),
    currentChampion: new CurrentChampionResolver(),
    upcomingSeason: new UpcomingSeasonResolver(),
    topFiveRecords: new TopFiveUserRecordsResolver(),
    bottomFiveRecords: new BottomFiveUserRecordsResolver(),
  },
});
