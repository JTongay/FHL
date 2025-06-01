// import { FHLContext } from "@/domain/Context";
// import { EventResponse } from "@/domain/Event";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { BaseUnionResolver } from "@/resolvers/base/BaseUnionResolver";
// import { Nullable } from "@/util";
// import { GraphQLResolveInfo } from "graphql";

// export class EventResponseResolver extends BaseUnionResolver {
//     protected resolveType(
//         value: EventResponse,
//         context: FHLContext,
//         info: GraphQLResolveInfo): Nullable<string> {
//         switch (value.constructor) {
//             case Event:
//                 return "Event"
//             case ApiError:
//                 return "ApiError"
//             default:
//                 return null;
//         }
//     }
// }
