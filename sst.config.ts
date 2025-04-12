/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "fhl",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },

  async run() {
    await import("./infra/FHLDb.js");
    await import("./infra/FHLApi.js");
    await import("./infra/FHLWeb3.js");

    return {
      Region: aws.getRegionOutput().name,
    };
  },
});
