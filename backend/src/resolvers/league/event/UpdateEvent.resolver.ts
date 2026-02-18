import { EventResponse, UpdateEventInput } from "@/domain/Event";
import { FHLContext } from "@/domain/FHLContext";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Input } from "@/util";

export class UpdateEventResolver extends BaseResolver {
  protected async resolver(
    parent: unknown,
    args: Input<UpdateEventInput>,
    context: FHLContext
  ): Promise<EventResponse> {
    return await context.datasources.leagueDatasource.updateEvent(args.input);
  }
}
