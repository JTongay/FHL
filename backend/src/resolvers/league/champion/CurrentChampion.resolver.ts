// import { FHLContext } from "@/domain/Context";
// import { League } from "@/domain/League";
// import { User } from "@/domain/User";
// import { BaseResolver } from "@/resolvers/base/BaseResolver";
// import { Nullable } from "@/util";

// export class CurrentChampionResolver extends BaseResolver {
//     protected async resolver(
//         parent: League,
//         args: never,
//         context: FHLContext
//     ): Promise<Nullable<User>> {
//         try {
//             const user = await context.datasources.leagueDatasource.getCurrentChampion(parent.id);
//             return user;
//         } catch (e) {
//             console.error(e, "error in current champion resolver");
//             throw e;
//         }
//     }
// }
