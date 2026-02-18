// import { BaseContext, FHLContext } from "@/domain/Context";
// import { BaseResolver } from "../base/BaseResolver";
// import { Game, GameResponse } from "@/domain/Game";
// import { fhlDb } from "@fhl/core/src/db";
// import { ApiError } from "@/domain/errors/FHLApiError";

// export class GameResolver extends BaseResolver {
//     protected async resolver(
//         parent: never,
//         args: { id: string },
//         context: FHLContext
//     ): Promise<GameResponse> {
//         try {
//             const response = await fhlDb.selectFrom("games")
//                 .where("id", "=", +args.id)
//                 .selectAll()
//                 .executeTakeFirstOrThrow()
//             return new Game(response)
//         } catch (e: unknown) {
//             return new ApiError(200, e.toString())
//         }
//     }
// }
