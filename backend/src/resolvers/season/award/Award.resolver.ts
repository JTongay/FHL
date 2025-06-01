// import {AwardResponse} from "@/domain/Award";
// import {FHLContext} from "@/domain/Context";
// import {Season} from "@/domain/Season";
// import {ApiError} from "@/domain/errors/FHLApiError";
// import {BaseResolver} from "@/resolvers/base/BaseResolver";

// export class AwardResolver extends BaseResolver {
//   protected async resolver(
//       parent: Season,
//       args: { id: string },
//       context: FHLContext
//   ): Promise<AwardResponse> {
//     try {
//       return await context.datasources.awardDatasource.getAward(+parent.id);
//     } catch (e) {
//       return new ApiError(123, e.toString());
//     }
//   }
// }
