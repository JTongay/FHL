import { BaseContext } from "@/domain/Context";
import { BaseResolver } from "../base/BaseResolver";
import { Season, SeasonResponse } from "@/domain/Season";
import { fhlDb } from "@fhl/core/src/db";
import { ApiError } from "@/domain/errors/FHLApiError";

export class SeasonResolver extends BaseResolver {
    protected async resolver(
        parent: never,
        args: { id: string },
        context: BaseContext
    ): Promise<SeasonResponse> {
        try {
            const response = await fhlDb.selectFrom("seasons")
                .where("id", "=", +args.id)
                .selectAll()
                .executeTakeFirstOrThrow()
            return new Season(response);
        } catch (e: unknown) {
            return new ApiError(4001, e.toString())
        }

    }
}