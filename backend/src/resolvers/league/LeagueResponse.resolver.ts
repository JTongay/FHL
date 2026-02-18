// import { FHLContext } from "@/domain/Context";
// import { GraphQLResolveInfo } from "graphql";
// import { BaseUnionResolver } from "../base/BaseUnionResolver";
// import { League, LeagueResponse } from "@/domain/League";
// import { Nullable } from "@/util";
// import { ApiError } from "@/domain/errors/FHLApiError";

// export class LeagueResponseResolver extends BaseUnionResolver {
//     protected resolveType(
//         value: LeagueResponse,
//         context: FHLContext,
//         info: GraphQLResolveInfo
//     ): Nullable<string> {
//         switch (value.constructor) {
//             case League:
//                 return "League"
//             case ApiError:
//                 return "ApiError"
//             default:
//                 return null;
//         }
//     }
// }
