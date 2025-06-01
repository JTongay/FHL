// import {FHLContext} from "@/domain/Context";
// import {BaseResolver} from "../base/BaseResolver";
// import {Pagination} from "@/util";
// import {Season, SeasonsList, SeasonsResponse} from "@/domain/Season";
// import {fhlDb} from "@fhl/core/src/db";
// import {ApiError} from "@/domain/errors/FHLApiError";

// export class SeasonsResolver extends BaseResolver {
//   protected async resolver(
//       parent: never,
//       args: Pagination,
//       context: FHLContext
//   ): Promise<SeasonsResponse> {
//     try {
//       const total = await fhlDb.selectFrom("seasons")
//           .select(
//               (season) => season.fn.sum("id").as("seasons_count")
//           )
//           .executeTakeFirstOrThrow();
//       const response = await fhlDb.selectFrom("seasons")
//           .selectAll()
//           .limit(args.limit)
//           .offset(args.offset)
//           .execute();
//       const seasons = response.map((season) => new Season(season));
//       return new SeasonsList(args, total.seasons_count as number, seasons);
//     } catch (e: unknown) {
//       return new ApiError(400, e.toString());
//     }
//   }
// }
