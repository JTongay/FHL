import { FHLContext } from "@/domain/FHLContext";
import { BaseResolver } from "../base/BaseResolver";
import { UpdateUserParams, UserResponse } from "@/domain/User";
import { Input } from "@/util";

export class UpdateUserResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Input<UpdateUserParams>,
    context: FHLContext
  ): Promise<UserResponse> {
    return await context.datasources.userDatasource.updateUser(args.input);
  }
}
