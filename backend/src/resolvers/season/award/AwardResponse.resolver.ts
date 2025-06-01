// import {BaseUnionResolver} from "@/resolvers/base/BaseUnionResolver";
// import {FHLContext} from "@/domain/Context";
// import {GraphQLResolveInfo} from "graphql";
// import {Nullable} from "@/util";
// import {Award, AwardResponse} from "@/domain/Award";

// export class AwardResponseResolver extends BaseUnionResolver {
//   protected resolveType(
//       value: AwardResponse,
//       context: FHLContext,
//       info: GraphQLResolveInfo
//   ): Nullable<string> {
//     if (this.isAward(value)) {
//       return "Award";
//     }
//     return "ApiError";
//   }

//   private isAward(value: AwardResponse): value is Award {
//     return "id" in value;
//   }
// }
