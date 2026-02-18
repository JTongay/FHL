import { FHLContext } from "@/domain/FHLContext";
import { BaseResolver } from "../resolvers/base/BaseResolver";

export class BooyahResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: never,
    context: FHLContext
  ): Promise<string> {
    return Promise.resolve("Booyah");
  }
}
