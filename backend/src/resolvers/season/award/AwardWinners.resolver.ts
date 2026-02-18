// import { Award } from "@/domain/Award";
// import { FHLContext } from "@/domain/Context";
// import { User } from "@/domain/User";
// import { BaseResolver } from "@/resolvers/base/BaseResolver";

// export class AwardWinnersResolver extends BaseResolver {
//     protected async resolver(
//         parent: Award,
//         args: never,
//         context: FHLContext
//     ) {
//         const users = parent.winningUserIds.map(Number);
//         const response = await context.datasources.userDatasource.getUsers(users);
//         return response.map((user) => new User(user))
//     }

// }
