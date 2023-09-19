import { BaseContext } from "@/domain/Context";
import { GraphQLResolveInfo } from "graphql";
import { BaseUnionResolver } from "../base/BaseUnionResolver";
import { Season, SeasonResponse } from "@/domain/Season";
import { Nullable } from "@/util";
import { ApiError } from "@/domain/errors/FHLApiError";

export class SeasonResponseResolver extends BaseUnionResolver {
    protected resolveType(
        value: SeasonResponse,
        context: BaseContext,
        info: GraphQLResolveInfo
    ): Nullable<string> {
        switch (value.constructor) {
            case Season:
                return "Season"
            case ApiError:
                return "ApiError"
            default:
                return null
        }
    }
}