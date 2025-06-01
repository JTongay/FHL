// import {FHLContext} from "@/domain/Context";
// import {CreateStorylineParams, StorylineResponse} from "@/domain/Storyline";
// import {ApiError} from "@/domain/errors/FHLApiError";
// import {BaseResolver} from "@/resolvers/base/BaseResolver";
// import {Input} from "@/util";

// export class CreateStorylineResolver extends BaseResolver {
//   protected async resolver(
//       parent: never,
//       args: Input<CreateStorylineParams>,
//       context: FHLContext
//   ): Promise<StorylineResponse> {
//     try {
//       return await context.datasources.storylineDatasource.createStoryline(args.input);
//     } catch (e: unknown) {
//       return new ApiError(1, e.toString());
//     }
//   }
// }
