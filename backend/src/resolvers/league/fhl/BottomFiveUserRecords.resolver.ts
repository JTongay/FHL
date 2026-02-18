// import {FHLContext} from "@/domain/Context";
// import {FHLLeague} from "@/domain/League";
// import {User} from "@/domain/User";
// import {BaseResolver} from "@/resolvers/base/BaseResolver";

// export class BottomFiveUserRecordsResolver extends BaseResolver {
//   protected async resolver(
//       parent: FHLLeague,
//       args: never,
//       context: FHLContext
//   ): Promise<User[]> {
//     try {
//       return await context.datasources.leagueDatasource.getBottomFiveUserRecords(parent.league.id);
//     } catch (e) {
//       console.error(e, "error in bottom five user records resolver");
//       throw e;
//     }
//   }
// }
