import { FHLContext } from "@/domain/Context";
import { Season } from "@/domain/Season";
import { Storyline, StorylinesList, StorylinesResponse } from "@/domain/Storyline";
import { ApiError } from "@/domain/errors/FHLApiError";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Pagination } from "@/util";
import { fhlDb } from "@fhl/core/src/db";

export class StorylinesResolver extends BaseResolver {
    protected async resolver(
        parent: Season,
        args: Pagination,
        context: FHLContext
    ): Promise<StorylinesResponse> {
        try {
            const response = await fhlDb.selectFrom("storylines")
                .innerJoin("user_storyline", "user_storyline.storyline_id", "storylines.id")
                .where("storylines.season_id", "=", +parent.id)
                // TODO get Pagination to return proper total
                // .select((col) => col.fn.sum<number>("storylines.id").as("season_storylines"))
                .limit(args.limit)
                .offset(args.offset)
                .selectAll()
                .execute()
            const userIds = response.map((value) => value.user_id)
            const storylines = response.map((storyline) => new Storyline(storyline, userIds))
            return new StorylinesList(args, 1, storylines)
        } catch (e: unknown) {
            return new ApiError(6002, e.toString())
        }
    }
}