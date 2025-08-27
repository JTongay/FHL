import { BaseResolver } from "../base/BaseResolver";
import { Input } from "@/util";
import { CreateUserParams, UserResponse } from "@/domain/User";
import { FHLContext } from "@/domain/FHLContext";

export class CreateUserResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Input<CreateUserParams>,
    context: FHLContext
  ): Promise<UserResponse> {
    return await context.datasources.userDatasource.createUser(args.input);
  }
}
