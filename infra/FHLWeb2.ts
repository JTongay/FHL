import { use, StackContext, NextjsSite } from "sst/constructs";
import { FHLApi } from "./FHLApi.js";

export function NextWeb({ stack }: StackContext) {
  const api = use(FHLApi);

  const site = new NextjsSite(stack, "site", {
    path: "packages/fhl-web-2",
    environment: {
      VITE_GRAPHQL_URL: api.url + "/graphql",
      NEXT_API_URL: `${api.url}/graphql`,
    },
  });

  stack.addOutputs({
    SITE: site.url,
  });
}
