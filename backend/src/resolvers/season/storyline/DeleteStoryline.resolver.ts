// import {BaseResolver} from "@/resolvers/base/BaseResolver";
// import {Input} from "@/util";
// import {FHLContext} from "@/domain/Context";
// import {fhlDb} from "@fhl/core/src/db";

// export class DeleteStorylineResolver extends BaseResolver {
//   protected async resolver(
//       parent: never,
//       args: Input<{ id: string }>,
//       context: FHLContext
//   ): Promise<boolean> {
//     try {
//       await fhlDb.transaction().execute(async () => {
//         // await fhlDb.deleteFrom("user_storyline").where("storyline_id", "=", +args.input.storylineId).execute();
//         await fhlDb.deleteFrom("storylines").where("id", "=", +args.input.id).execute();
//       });
//       return true;
//     } catch (e) {
//       console.log(e);
//       return false;
//     }
//   }
// }
