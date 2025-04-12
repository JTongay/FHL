// import { StackContext, StaticSite, use } from "sst/constructs";
// import { FHLApi } from "./FHLApi.js";

// export function FHLRRWeb({ stack }: StackContext) {
//   const api = use(FHLApi);

//   const page = new StaticSite(stack, "page", {
//     path: "packages/fhl-web-3",
//     buildCommand: "pnpm build",
//     buildOutput: "dist",
//     environment: {
//       VITE_GRAPHQL_URL: api.url + "/graphql",
//       VITE_API_URL: `${api.url}/graphql`, // Added VITE_ prefix
//     },
//     vite: {
//       types: "./vite-env.d.ts",
//     },
//   });

//   stack.addOutputs({
//     PAGE: page.url,
//   });

//   return stack;
// }

new sst.aws.StaticSite("page", {});
