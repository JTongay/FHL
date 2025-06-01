// import { FHLContext } from "@/domain/Context";
// import { EventsList, EventsResponse } from "@/domain/Event";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { BaseUnionResolver } from "@/resolvers/base/BaseUnionResolver";
// import { Nullable } from "@/util";
// import { GraphQLResolveInfo } from "graphql";

// export class EventsResponseResolver extends BaseUnionResolver {
//     protected resolveType(
//         value: EventsResponse,
//         context: FHLContext,
//         info: GraphQLResolveInfo): Nullable<string> {
//         switch (value.constructor) {
//             case EventsList:
//                 return "EventsList";
//             case ApiError:
//                 return "ApiError";
//             default:
//                 return null;
//         }
//     }
// }
