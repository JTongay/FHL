// import {BaseUnionResolver} from "@/resolvers/base/BaseUnionResolver";
// import {FHLContext} from "@/domain/Context";
// import {GraphQLResolveInfo} from "graphql";
// import {Nullable} from "@/util";
// import {AwardsList, AwardsResponse} from "@/domain/Award";
// import {ApiError} from "@/domain/errors/FHLApiError";

// export class AwardsResponseResolver extends BaseUnionResolver {
//   protected resolveType(
//       value: AwardsResponse,
//       context: FHLContext,
//       info: GraphQLResolveInfo
//   ): Nullable<string> {
//     switch (value.constructor) {
//       case AwardsList:
//         return "AwardsList";
//       case ApiError:
//         return "ApiError";
//       default:
//         return null;
//     }
//   }
// }
