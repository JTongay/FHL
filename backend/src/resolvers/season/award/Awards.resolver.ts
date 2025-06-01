// import { BaseResolver } from "@/resolvers/base/BaseResolver";
// import { FHLContext } from "@/domain/Context";
// import { Season } from "@/domain/Season";
// import { Pagination } from "@/util";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { AwardsResponse } from "@/domain/Award";

// export class AwardsResolver extends BaseResolver {
//   protected async resolver(
//     parent: Season,
//     args: Pagination,
//     context: FHLContext
//   ): Promise<AwardsResponse> {
//     try {
//       return await context.datasources.awardDatasource.getAwardsForSeason(+parent.id, args)
//     } catch (e) {
//       console.log(e, "error fetching awards");
//       return new ApiError(1, e.toString());
//     }
//   }
// }
