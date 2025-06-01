// import {FHLContext} from "@/domain/Context";
// import {BaseResolver} from "../../base/BaseResolver";
// import {User} from "@/domain/User";
// import {Pagination} from "@/util";
// import {AwardsResponse} from "@/domain/Award";
// import {ApiError} from "@/domain/errors/FHLApiError";

// export class UserAwardsResolver extends BaseResolver {
//   protected async resolver(
//       parent: User,
//       args: Pagination,
//       context: FHLContext
//   ): Promise<AwardsResponse> {
//     try {
//       return await context.datasources.awardDatasource.getAwardsForUser(+parent.id, args);
//     } catch (e: unknown) {
//       return new ApiError(69, e.toString());
//     }
//   }
// }
