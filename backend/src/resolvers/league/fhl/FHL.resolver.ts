import { FHLContext } from "@/domain/FHLContext";
import { FHLLeague } from "@/domain/League";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class FHLResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: never,
    context: FHLContext
  ): Promise<FHLLeague> {
    console.log("GETTING FHL")
    const fhl = await context.datasources.leagueDatasource.getFHL();
    return { league: fhl };
  }
}
