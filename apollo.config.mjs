const path = require("path");

module.exports = {
  client: {
    service: {
      name: "fhl-web",
      localSchemaFile: path.join(
        __dirname,
        "packages/fhl-web-2/schema/schema.graphql"
      ),
    },
    includes: ["src/**/*.tsx", "src/**/*.ts", "operations/**/*.graphql"],
    excludes: ["**/node_modules/**"],
  },
};
