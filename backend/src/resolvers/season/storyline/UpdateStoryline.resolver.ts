import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Input } from "@/util";
import { StorylineResponse, UpdateStorylineParams } from "@/domain/Storyline";
import { FHLContext } from "@/domain/FHLContext";

export class UpdateStorylineResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Input<UpdateStorylineParams>,
    context: FHLContext
  ): Promise<StorylineResponse> {
    return await context.datasources.storylineDatasource.updateStoryline(args.input)
  }
}
