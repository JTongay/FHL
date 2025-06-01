// import { FHLContext } from "@/domain/Context";
// import { Storyline, StorylineResponse } from "@/domain/Storyline";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { BaseUnionResolver } from "@/resolvers/base/BaseUnionResolver";
// import { Nullable } from "@/util";
// import { GraphQLResolveInfo } from "graphql";

// export class StorylineResponseResolver extends BaseUnionResolver {
//     protected resolveType(
//         value: StorylineResponse,
//         context: FHLContext,
//         info: GraphQLResolveInfo
//     ): Nullable<string> {
//         switch (value.constructor) {
//             case Storyline:
//                 return "Storyline"
//             case ApiError:
//                 return "ApiError"
//             default:
//                 return null;
//         }
//     }
// }
