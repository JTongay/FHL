// import {BaseResolver} from "@/resolvers/base/BaseResolver";
// import {FHLContext} from "@/domain/Context";
// import {Input} from "@/util";
// import {AwardResponse, CreateAwardParams} from "@/domain/Award";
// import {ApiError} from "@/domain/errors/FHLApiError";

// export class CreateAwardResolver extends BaseResolver {
//   protected async resolver(
//       parent: never,
//       args: Input<CreateAwardParams>,
//       context: FHLContext
//   ): Promise<AwardResponse> {
//     try {
//       const response = await context.datasources.awardDatasource.createAward(args.input);
//       console.log(response, "response");
//       return response;
//     } catch (e) {
//       return new ApiError(1, e.toString());
//     }
//   }
// }
