// import {FHLContext} from "@/domain/Context";
// import {Season} from "@/domain/Season";
// import {Storyline, StorylineResponse} from "@/domain/Storyline";
// import {ApiError, FHLApiError} from "@/domain/errors/FHLApiError";
// import {BaseResolver} from "@/resolvers/base/BaseResolver";
// import {fhlDb} from "@fhl/core/src/db";

// export class StorylineResolver extends BaseResolver {
//   protected async resolver(
//       parent: Season,
//       args: never,
//       context: FHLContext
//   ): Promise<StorylineResponse> {
//     try {
//       const response = await fhlDb.selectFrom("user_storyline")
//           .innerJoin("storylines", "storylines.id", "storyline_id")
//           .where("storylines.id", "=", +parent.id)
//           .selectAll()
//           .execute();
//       console.log(response, "Response");
//       if (!response.length) {
//         throw new FHLApiError({message: "storyline not found", code: 1, debugInformation: "storyline not found"});
//       }

//       const users = response.map((user) => user.id);

//       return new Storyline(response[0], users);
//     } catch (e: unknown) {
//       return new ApiError(6004, e.toString());
//     }
//   }
// }
