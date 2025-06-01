// import { FHLContext } from "@/domain/Context";
// import { BaseResolver } from "../base/BaseResolver";
// import { League, LeagueResponse } from "@/domain/League";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { fhlDb } from "@fhl/core/src/db";

// export class LeagueResolver extends BaseResolver {
//   protected async resolver(
//     parent: never,
//     args: { id: string },
//     context: FHLContext,
//   ): Promise<LeagueResponse> {
//     try {
//       const response = await fhlDb
//         .selectFrom("leagues")
//         .where("id", "=", +args.id)
//         .selectAll()
//         .executeTakeFirstOrThrow();
//       return new League(response);
//     } catch (e: unknown) {
//       console.error(e);
//       return new ApiError(300, e.toString());
//     }
//   }
// }
