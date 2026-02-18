import { GraphQLResolveInfo } from "graphql/type";
import { BaseResolver } from "./BaseResolver";
import { BaseUnionResolver } from "./BaseUnionResolver";
import { BaseContext } from "@/domain/FHLContext";
import { Nullable } from "@/util";

type ResolverFn = (parent: any, args: any, context: BaseContext) => any;

type UnionResolverFn = (
  value: unknown,
  context: BaseContext,
  info: GraphQLResolveInfo
) => Nullable<string>;

export interface FieldOutput {
  [field: string]: ResolverFn;
}

export interface ResolverMapOutput {
  [parent: string]: FieldOutput;
}

export interface ResolverMapInput {
  [parent: string]: {
    [field: string]: BaseResolver;
  };
}

interface TypeResolverInput {
  [field: string]: BaseUnionResolver;
}

interface TypeResolverOutput {
  [field: string]: { [field: string]: UnionResolverFn };
}

const resolverMap = (resolverInput: ResolverMapInput): ResolverMapOutput => {
  // return Object.keys(resolverInput).reduce((acc, currentValue) => {
  //     acc[currentValue] = resolverInput[currentValue].resolve
  //     return acc;
  // }, {});

  let output: ResolverMapOutput = {};

  Object.keys(resolverInput).forEach((resolverParentName) => {
    let parentOutput: FieldOutput = {};

    const resolverParent = resolverInput[resolverParentName];

    Object.keys(resolverParent).forEach((resolverField) => {
      const value = resolverParent[resolverField];

      parentOutput[resolverField] = value.resolve;
    });

    output[resolverParentName] = parentOutput;
  });

  return output;
};

const typeResolverMap = (
  resolverInput: TypeResolverInput
): TypeResolverOutput => {
  return Object.keys(resolverInput).reduce((acc, currentValue) => {
    acc[currentValue] = {
      __resolveType: resolverInput[currentValue]._resolveType,
    };
    return acc;
  }, {} as TypeResolverOutput);
  // const output: TypeResolverOutput = {};
  // Object.keys(resolverInput).forEach((typeName) => {
  //     const value = resolverInput[typeName];
  //     output[typeName] = { __resolveType: value._resolveType }
  // })

  // return output;
};

export { resolverMap, typeResolverMap };
