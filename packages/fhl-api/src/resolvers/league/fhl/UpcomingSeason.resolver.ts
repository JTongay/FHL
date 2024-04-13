import { FHLContext } from "@/domain/Context";
import { FHLLeague } from "@/domain/League";
import { Season } from "@/domain/Season";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Nullable } from "@/util";

export class UpcomingSeasonResolver extends BaseResolver {
    protected async resolver(
        parent: FHLLeague,
        args: never,
        context: FHLContext
    ): Promise<Nullable<Season>> {
        return await context.datasources.seasonDatasource.getUpcomingSeason(parent.league.id);
    }

}