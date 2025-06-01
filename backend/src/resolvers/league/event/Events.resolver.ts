// import { FHLContext } from "@/domain/Context";
// import { Event, EventsList, EventsResponse } from "@/domain/Event";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { BaseResolver } from "@/resolvers/base/BaseResolver";
// import { Pagination } from "@/util";
// import { fhlDb } from "@fhl/core/src/db";

// export class EventsResolver extends BaseResolver {
//     protected async resolver(
//         parent: never,
//         args: Pagination,
//         context: FHLContext
//     ): Promise<EventsResponse> {
//         try {
//             const total = await fhlDb.selectFrom("events")
//                 .select(
//                     (event) => event.fn.count<number>("id").as("event_count")
//                 )
//                 .executeTakeFirstOrThrow()
//             const response = await fhlDb.selectFrom("events")
//                 .selectAll()
//                 .limit(args.limit)
//                 .offset(args.offset)
//                 .execute()
//             const events = response.map((event) => new Event(event))
//             return new EventsList(args, total.event_count, events)
//         } catch (e: unknown) {
//             return new ApiError(500, e.toString())
//         }
//     }
// }
