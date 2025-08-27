// import { AwardResponse } from "@/domain/Award";
// import { FHLContext } from "@/domain/FHLContext";
// import { Season } from "@/domain/Season";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { BaseResolver } from "@/resolvers/base/BaseResolver";

// export class AwardResolver extends BaseResolver {
//   protected async resolver(
//     parent: Season,
//     args: { id: string },
//     context: FHLContext
//   ): Promise<AwardResponse> {
//     return await context.datasources.awardDatasource.getAwardById(+args.id);
//   }
// }
