import { EventResponse } from "@/domain/Event";
import { FHLContext } from "@/domain/FHLContext";
import { TitleChange } from "@/domain/League";
import { BaseResolver } from "@/resolvers/base/BaseResolver";

export class EventResolver extends BaseResolver {
  protected async resolver(
    parent: TitleChange,
    args: { id: string },
    context: FHLContext
  ): Promise<EventResponse> {
    const eventId = Object.keys(parent).length ? +parent.eventId : +args.id;
    return await context.datasources.leagueDatasource.getEvent(eventId);
  }
}
