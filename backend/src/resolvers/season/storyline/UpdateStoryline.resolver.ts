// import {BaseResolver} from "@/resolvers/base/BaseResolver";
// import {FHLContext} from "@/domain/Context";
// import {Input} from "@/util";
// import {Storyline, StorylineResponse, UpdateStorylineParams} from "@/domain/Storyline";
// import {fhlDb} from "@fhl/core/src/db";
// import {ApiError} from "@/domain/errors/FHLApiError";

// export class UpdateStorylineResolver extends BaseResolver {
//   protected async resolver(
//       parent: never,
//       args: Input<UpdateStorylineParams>,
//       context: FHLContext
//   ): Promise<StorylineResponse> {
//     try {
//       return fhlDb.transaction().execute(async () => {
//         const response = await fhlDb.updateTable("storylines")
//             .where("id", "=", +args.input.id)
//             .set({
//               description: args.input.description,
//             })
//             .returningAll()
//             .executeTakeFirstOrThrow();
//         for (const userId of args.input.users) {
//           await fhlDb.updateTable("user_storyline")
//               .where("storyline_id", "=", +args.input.id)
//               .set({
//                 user_id: +userId,
//               }).execute();
//         }
//         const users = args.input.users.map(Number);
//         return new Storyline(response, users);
//       });
//     } catch (e: unknown) {
//       return new ApiError(1, e.toString());
//     }
//   }
// }
