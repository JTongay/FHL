// import {FHLContext} from "@/domain/Context";
// import {FHLLeague} from "@/domain/League";
// import {User} from "@/domain/User";
// import {BaseResolver} from "@/resolvers/base/BaseResolver";
// import {Nullable} from "@/util";

// export class CurrentChampionResolver extends BaseResolver {
//   protected async resolver(
//       parent: FHLLeague,
//       args: never,
//       context: FHLContext
//   ): Promise<Nullable<User>> {
//     try {
//       return await context.datasources.leagueDatasource.getCurrentChampion(parent.league.id);
//     } catch (e) {
//       console.error(e, "error in current champion resolver");
//       throw e;
//     }
//   }
// }
