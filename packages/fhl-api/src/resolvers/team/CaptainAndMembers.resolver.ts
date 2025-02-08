import { FHLContext } from "@/domain/Context";
import { BaseResolver } from "../base/BaseResolver";
import { Team } from "@/domain/Team";

export class MembersResolver extends BaseResolver {
  protected resolver(
    parent: Team,
    args: unknown,
    context: FHLContext,
  ): Promise<unknown> {}
}
