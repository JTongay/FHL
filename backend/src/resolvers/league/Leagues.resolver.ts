// import {FHLContext} from "@/domain/Context";
// import {BaseResolver} from "../base/BaseResolver";
// import {fhlDb} from "@fhl/core/src/db";
// import {League} from "@/domain/League";

// // TODO Fix me later
// export class LeaguesResolver extends BaseResolver {
//   protected async resolver(
//       parent: never,
//       args: never, // TODO Pagination
//       context: FHLContext
//   ) {
//     const response = await fhlDb.selectFrom("leagues")
//         .selectAll()
//         .execute();
//     return response.map((league) => new League(league));
//   }
// }
