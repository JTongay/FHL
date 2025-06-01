// import { BaseContext, FHLContext } from "@/domain/Context";
// import { Event, EventResponse } from "@/domain/Event";
// import { TitleChange } from "@/domain/League";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { BaseResolver } from "@/resolvers/base/BaseResolver";
// import { fhlDb } from "@fhl/core/src/db";

// export class EventResolver extends BaseResolver {
//     protected async resolver(
//         parent: TitleChange,
//         args: { id: string },
//         context: FHLContext
//     ): Promise<EventResponse> {
//         const eventId = Object.keys(parent).length ? +parent.eventId : +args.id;
//         try {
//             const response = await fhlDb.selectFrom("events")
//                 .where("id", "=", eventId)
//                 .selectAll()
//                 .executeTakeFirstOrThrow()
//             return new Event(response)
//         } catch (e: unknown) {
//             return new ApiError(5002, e.toString())
//         }
//     }
// }
