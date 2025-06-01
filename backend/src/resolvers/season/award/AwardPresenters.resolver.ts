// import { Award } from "@/domain/Award";
// import { FHLContext } from "@/domain/Context";
// import { User } from "@/domain/User";
// import { BaseResolver } from "@/resolvers/base/BaseResolver";

// export class AwardPresentersResolver extends BaseResolver {
//     protected async resolver(
//         parent: Award,
//         args: never,
//         context: FHLContext
//     ): Promise<User[]> {
//         const users = parent.presentingUserIds.map(Number);
//         const response = await context.datasources.userDatasource.getUsers(users);
//         return response.map((user) => new User(user));
//     }

// }
