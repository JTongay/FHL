// import { FHLContext } from "@/domain/Context";
// import { GraphQLResolveInfo } from "graphql";
// import { BaseUnionResolver } from "../base/BaseUnionResolver";
// import { GamesList, GamesResponse } from "@/domain/Game";
// import { Nullable } from "@/util";
// import { ApiError } from "@/domain/errors/FHLApiError";

// export class GamesResponseResolver extends BaseUnionResolver {
//     protected resolveType(
//         value: GamesResponse,
//         context: FHLContext,
//         info: GraphQLResolveInfo
//     ): Nullable<string> {
//         switch (value.constructor) {
//             case GamesList:
//                 return "GamesList"
//             case ApiError:
//                 return "ApiError"
//             default:
//                 return null;
//         }
//     }
// }
