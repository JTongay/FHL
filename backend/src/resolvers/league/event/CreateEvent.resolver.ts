import { CreateEventInput, EventResponse } from "@/domain/Event";
import { FHLContext } from "@/domain/FHLContext";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Input } from "@/util";

export class CreateEventResolver extends BaseResolver {
  protected async resolver(
    parent: unknown,
    args: Input<CreateEventInput>,
    context: FHLContext
  ): Promise<EventResponse> {
    return await context.datasources.leagueDatasource.createEvent(args.input);
  }
}
