import { FHLContext } from "@/domain/FHLContext";
import { BaseResolver } from "./base/BaseResolver";

export class HowdyResolver extends BaseResolver {
  protected async resolver(
    parent: any,
    args: { id: string },
    context: FHLContext
  ): Promise<string> {
    return Promise.resolve(args.id);
  }
}
