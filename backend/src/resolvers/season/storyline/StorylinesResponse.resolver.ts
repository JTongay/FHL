// import { FHLContext } from "@/domain/Context";
// import { StorylinesList, StorylinesResponse } from "@/domain/Storyline";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { BaseUnionResolver } from "@/resolvers/base/BaseUnionResolver";
// import { Nullable } from "@/util";
// import { GraphQLResolveInfo } from "graphql";

// export class StorylinesResponseResolver extends BaseUnionResolver {
//     protected resolveType(
//         value: StorylinesResponse,
//         context: FHLContext,
//         info: GraphQLResolveInfo
//     ): Nullable<string> {
//         switch (value.constructor) {
//             case StorylinesList:
//                 return "StorylinesList"
//             case ApiError:
//                 return "ApiError"
//             default:
//                 return null;
//         }
//     }
// }
