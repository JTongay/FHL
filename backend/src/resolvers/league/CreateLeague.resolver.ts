// import { FHLContext } from "@/domain/Context";
// import { BaseResolver } from "../base/BaseResolver";
// import { CreateLeagueParams, League, LeagueResponse } from "@/domain/League";
// import { Input } from "@/util";
// import { fhlDb } from "@fhl/core/src/db";
// import { ApiError } from "@/domain/errors/FHLApiError";

// export class CreateLeagueResolver extends BaseResolver {
//     protected async resolver(
//         parent: any,
//         args: Input<CreateLeagueParams>,
//         context: FHLContext,
//     ): Promise<LeagueResponse> {
//         try {
//             const response = await fhlDb
//                 .insertInto("leagues")
//                 .values({
//                     name: args.input.name,
//                 })
//                 .returningAll()
//                 .executeTakeFirstOrThrow();

//             return new League(response);
//         } catch (e: unknown) {
//             return new ApiError(123, e.toString());
//         }
//     }
// }
