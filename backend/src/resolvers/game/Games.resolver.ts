// import { BaseContext, FHLContext } from "@/domain/Context";
// import { BaseResolver } from "../base/BaseResolver";
// import { Pagination } from "@/util";
// import { Game, GamesList, GamesResponse } from "@/domain/Game";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { fhlDb } from "@fhl/core/src/db";

// export class GamesResolver extends BaseResolver {
//     protected async resolver(
//         parent: never,
//         args: Pagination,
//         context: FHLContext
//     ): Promise<GamesResponse> {
//         try {
//             const total = await fhlDb.selectFrom("games")
//                 .select(
//                     (games) => games.fn.sum("id").as("all_games")
//                 )
//                 .executeTakeFirstOrThrow()
//             const response = await fhlDb.selectFrom("games")
//                 .selectAll()
//                 .limit(args.limit)
//                 .offset(args.offset)
//                 .execute()
//             const games = response.map((game) => new Game(game))
//             return new GamesList(args, total.all_games as number, games)
//         } catch (e: unknown) {
//             return new ApiError(2001, e.toString())
//         }
//     }
// }
