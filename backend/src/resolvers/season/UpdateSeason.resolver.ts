// import { FHLContext } from "@/domain/Context";
// import { BaseResolver } from "../base/BaseResolver";
// import { Input } from "@/util";
// import { Season, SeasonResponse, UpdateSeasonParams } from "@/domain/Season";
// import { fhlDb } from "@fhl/core/src/db";
// import { ApiError } from "@/domain/errors/FHLApiError";

// export class UpdateSeasonResolver extends BaseResolver {
//     protected async resolver(
//         parent: never,
//         args: Input<UpdateSeasonParams>,
//         context: FHLContext
//     ): Promise<SeasonResponse> {
//         try {
//             const response = await fhlDb.updateTable("seasons")
//                 .where("id", "=", +args.input.id)
//                 .set({
//                     is_active: args.input.setActive,
//                     year: args.input.year,
//                     updated_at: new Date(),
//                     start_date: args.input.startDate,
//                     end_date: args.input.endDate
//                 })
//                 .returningAll()
//                 .executeTakeFirstOrThrow()
//             return new Season(response)
//         } catch (e: unknown) {
//             return new ApiError(1, e.toString())
//         }
//     }
// }
