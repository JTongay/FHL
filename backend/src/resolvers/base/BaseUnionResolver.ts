import { GraphQLResolveInfo } from "graphql/type";
import { Nullable } from "@/util";
import { FHLContext } from "@/domain/FHLContext";

export abstract class BaseUnionResolver<
  Value = unknown,
  Context = FHLContext,
  Info = GraphQLResolveInfo
> {
  public _resolveType = (
    value: Value,
    context: Context,
    info: Info
  ): Nullable<string> => {
    return this.resolveType(value, context, info);
  };

  protected abstract resolveType(
    value: Value,
    context: Context,
    info: Info
  ): Nullable<string>;
}
