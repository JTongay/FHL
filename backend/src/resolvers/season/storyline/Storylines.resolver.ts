// import {FHLContext} from "@/domain/Context";
// import {Season} from "@/domain/Season";
// import {Storyline, StorylinesList, StorylinesResponse} from "@/domain/Storyline";
// import {ApiError} from "@/domain/errors/FHLApiError";
// import {BaseResolver} from "@/resolvers/base/BaseResolver";
// import {Pagination} from "@/util";
// import {fhlDb} from "@fhl/core/src/db";

// export class StorylinesResolver extends BaseResolver {
//   protected async resolver(
//       parent: Season,
//       args: Pagination,
//       context: FHLContext
//   ): Promise<StorylinesResponse> {
//     try {
//       // TODO: Could potentially be done in one query. https://kysely.dev/docs/examples/SELECT/nested-array
//       const storylines = await fhlDb.selectFrom("storylines")
//           .where("storylines.season_id", "=", +parent.id)
//           .selectAll()
//           .execute();
//       const userIds = await fhlDb.selectFrom("user_storyline")
//           .where("user_storyline.storyline_id", "in", storylines.map((storyline) => storyline.id))
//           .select(["user_id", "storyline_id"])
//           .execute();
//       const response = storylines.map((storyline) => {
//         const users = userIds
//             .filter((user) => user.storyline_id === storyline.id)
//             .map((user) => user.user_id);
//         return {
//           ...storyline,
//           users,
//         };
//       });
//       const storylinesData = response.map((storyline) => new Storyline(storyline, storyline.users));
//       return new StorylinesList(args, 1, storylinesData);
//     } catch (e: unknown) {
//       console.error(e);
//       return new ApiError(6002, e.toString());
//     }
//   }
// }
