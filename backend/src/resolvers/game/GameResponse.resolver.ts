// import { FHLContext } from "@/domain/Context";
// import { GraphQLResolveInfo } from "graphql";
// import { BaseUnionResolver } from "../base/BaseUnionResolver";
// import { Game, GameResponse } from "@/domain/Game";
// import { Nullable } from "@/util";
// import { ApiError } from "@/domain/errors/FHLApiError";

// export class GameResponseResolver extends BaseUnionResolver {
//     protected resolveType(
//         value: GameResponse,
//         context: FHLContext,
//         info: GraphQLResolveInfo
//     ): Nullable<string> {
//         switch (value.constructor) {
//             case Game:
//                 return "Game";
//             case ApiError:
//                 return "ApiError"
//             default:
//                 return null;
//         }
//     }
// }
