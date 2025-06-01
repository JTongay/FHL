// import { FHLContext } from "@/domain/Context";
// import { GraphQLResolveInfo } from "graphql";
// import { BaseUnionResolver } from "../base/BaseUnionResolver";
// import { SeasonsList, SeasonsResponse } from "@/domain/Season";
// import { Nullable } from "@/util";
// import { ApiError } from "@/domain/errors/FHLApiError";

// export class SeasonsResponseResolver extends BaseUnionResolver {
//     protected resolveType(
//         value: SeasonsResponse,
//         context: FHLContext,
//         info: GraphQLResolveInfo
//     ): Nullable<string> {
//         switch (value.constructor) {
//             case SeasonsList:
//                 return "SeasonsList"
//             case ApiError:
//                 return "ApiError"
//             default:
//                 return null;
//         }
//     }
// }
