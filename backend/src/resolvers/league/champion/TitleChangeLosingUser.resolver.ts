import { FHLContext } from "@/domain/FHLContext";
import { TitleChange } from "@/domain/League";
import { UserResponse } from "@/domain/User";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class TitleChangeLosingUserResolver extends BaseResolver {
  protected async resolver(
    parent: TitleChange,
    args: never,
    context: FHLContext
  ): Promise<UserResponse> {
    return await context.datasources.userDatasource.getUser(+parent.loserId);
  }
}
