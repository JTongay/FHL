// import { Api, StackContext, use } from "sst/constructs";
import { FHLDB } from "./FHLDb.js";

// export function FHLApi({ stack }: StackContext) {
//   const api = new Api(stack, "FHLApi", {
//     defaults: {
//       function: {
//         bind: [use(FHLDB)],
//       },
//     },
//     routes: {
//       "POST /graphql": {
//         type: "graphql",
//         function: {
//           handler: "packages/fhl-api/src/index.handler",
//         },
//       },
//       // Webhook to receive events from clerk on managing users
//       "POST /api/clerk/webhooks": {
//         type: "function",
//         function: {
//           handler: "packages/fhl-api/src/external/webhooks.handler",
//         },
//       },
//     },
//   });

//   stack.addOutputs({
//     Endpoint: api.url,
//   });

//   return api;
// }

const FHLApi = new sst.aws.ApiGatewayV2("FHLApi", {
  link: [FHLDB],
});

FHLApi.route("POST /graphql", "packages/fhl-api/src/index.handler");
FHLApi.route(
  "POST /api/clerk/webhooks",
  "packages/fhl-api/src/external/webhooks.handler"
);
