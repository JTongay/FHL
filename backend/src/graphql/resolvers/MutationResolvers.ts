import { resolverMap } from "@/resolvers/base/ResolverMap";
import { TestResolver } from "@/resolvers/Test.resolver";

export const MutationResolvers = resolverMap({
  Mutation: {
    createTest: new TestResolver(),
  },
});
