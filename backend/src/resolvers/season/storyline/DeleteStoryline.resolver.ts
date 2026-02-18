import { FHLContext } from "@/domain/FHLContext";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Input } from "@/util";

export class DeleteStorylineResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Input<{ id: string }>,
    context: FHLContext
  ): Promise<boolean> {
    return await context.datasources.storylineDatasource.deleteStoryline(args.input)
  }
}
