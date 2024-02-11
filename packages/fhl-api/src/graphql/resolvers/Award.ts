import { resolverMap } from "@/resolvers/base/ResolverMap";
import { AwardPresentersResolver } from "@/resolvers/season/award/AwardPresenters.resolver";
import { AwardWinnersResolver } from "@/resolvers/season/award/AwardWinners.resolver";

export const AwardResolvers = resolverMap({
    Award: {
        winners: new AwardWinnersResolver(),
        presenters: new AwardPresentersResolver()
    }
});