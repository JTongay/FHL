import { EventsResponse } from "@/domain/Event";
import { FHLContext } from "@/domain/FHLContext";
import { BaseResolver } from "@/resolvers/base/BaseResolver";
import { Pagination } from "@/util";

export class EventsResolver extends BaseResolver {
  protected async resolver(
    parent: never,
    args: Pagination,
    context: FHLContext
  ): Promise<EventsResponse> {
    return await context.datasources.leagueDatasource.getEvents(args)
  }
}

