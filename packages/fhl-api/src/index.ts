import { AwardDatasource } from "@/datasources/AwardDatasource";
import { MutationResolvers } from "@/graphql/resolvers/Mutation";
import { QueryResolvers } from "@/graphql/resolvers/Query";
import { ApolloServer } from "@apollo/server";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import path from "path";
import { SeasonDatasource } from "./datasources/SeasonDatasource";
import { StorylineDatasource } from "./datasources/StorylineDatasource";
import { TeamDatasource } from "./datasources/TeamDatasource";
import { AwardResolvers } from "./graphql/resolvers/Award";
import { SeasonResolvers } from "./graphql/resolvers/Season";
import { TeamResolvers } from "./graphql/resolvers/Team";
import { config } from "dotenv";
config();

// config({path: path.join(__dirname, "../", "../", "../", "../", "../", "../", ".env")});
import { Unions } from "./graphql/resolvers/Union";
import { UserResolvers } from "./graphql/resolvers/User";
import { LeagueResolvers } from "./graphql/resolvers/League";
import { LeagueDatasource } from "./datasources/LeagueDatasource";
import { FHLContext } from "./domain/Context";
import { UserDatasource } from "./datasources/UserDatasource";
import { FHLResolvers } from "./graphql/resolvers/FHL";

function loadFHLSchema() {
  console.log(__dirname, "dirname");
  // TODO: For some reason this is looking inside of the .sst directory in the root of the project
  return loadSchemaSync(
    path.join(
      __dirname,
      "../",
      "../",
      "../",
      "../",
      "../",
      "../",
      "packages/fhl-api/src/graphql/schema/**/*.graphql",
    ),
    {
      loaders: [new GraphQLFileLoader()],
    },
  );
}

const server = new ApolloServer<FHLContext>({
  introspection: true,
  typeDefs: loadFHLSchema(),
  resolvers: {
    ...QueryResolvers,
    ...MutationResolvers,
    ...UserResolvers,
    ...SeasonResolvers,
    ...AwardResolvers,
    ...LeagueResolvers,
    ...FHLResolvers,
    ...TeamResolvers,
    ...Unions,
  },
  includeStacktraceInErrorResponses: true,
  plugins: [],
});

export const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    middleware: [],
    context: async (request) => {
      console.log(request, "request");
      return {
        authToken: request.event.headers["authorization"] || "",
        datasources: {
          userDatasource: new UserDatasource(),
          seasonDatasource: new SeasonDatasource(),
          storylineDatasource: new StorylineDatasource(),
          awardDatasource: new AwardDatasource(),
          teamDatasource: new TeamDatasource(),
          leagueDatasource: new LeagueDatasource(),
        },
      };
    },
  },
);
