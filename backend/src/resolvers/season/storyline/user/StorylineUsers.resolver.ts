// import {FHLContext} from "@/domain/Context";
// import {Storyline} from "@/domain/Storyline";
// import {User, UsersList, UsersResponse} from "@/domain/User";
// import {ApiError} from "@/domain/errors/FHLApiError";
// import {BaseResolver} from "@/resolvers/base/BaseResolver";
// import {fhlDb} from "@fhl/core/src/db";

// export class StorylineUsersResolver extends BaseResolver {
//   protected async resolver(
//       parent: Storyline,
//       args: any,
//       context: FHLContext
//   ): Promise<UsersResponse> {
//     try {
//       const users = await fhlDb.selectFrom("users")
//           .where("id", "in", parent.userIds)
//           .selectAll()
//           .execute();
//       const usersList = users.map((user) => new User(user));
//       return new UsersList({limit: 1, offset: 25}, users.length, usersList);
//     } catch (e: unknown) {
//       console.error(e, "error resolving storyline users");
//       return new ApiError(1, e.toString());
//     }
//   }
// }
