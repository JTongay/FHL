import { ApolloServer } from "@apollo/server";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import { QueryResolvers } from "./graphql/resolvers/QueryResolvers";
import { MutationResolvers } from "./graphql/resolvers/MutationResolvers";
import { FHLContext } from "./domain/FHLContext";
import { UserDatasource } from "./datasources/UserDatasource";
import { UnionResolvers } from "./graphql/resolvers/UnionResolvers";
import { TeamDatasource } from "./datasources/TeamDatasource";
import { SeasonDatasource } from "./datasources/SeasonDatasource";
import { LeagueDatasource } from "./datasources/LeagueDatasource";
import { AwardDatasource } from "./datasources/AwardDatasource";
import { StorylineDatasource } from "./datasources/StorylineDatasource";

function loadFHLSchema() {
  return loadSchemaSync("src/graphql/schema/**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });
}

export async function startServer() {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer<FHLContext>({
    introspection: true,
    resolvers: {
      ...QueryResolvers,
      ...MutationResolvers,
      ...UnionResolvers,
    },
    typeDefs: loadFHLSchema(),
    includeStacktraceInErrorResponses: true,
    plugins: [],
  });

  await server.start();

  app.use(
    "/graphql",
    cors({
      origin: "*", // Allow all origins for development; adjust as needed for production
      methods: "GET,POST,OPTIONS",
    }),
    express.json(),
    expressMiddleware(server, {
      context: async (request): Promise<FHLContext> => {
        return {
          authToken: request.req.headers["authorization"] || "",
          datasources: {
            userDatasource: new UserDatasource(),
            teamDatasource: new TeamDatasource(),
            seasonDatasource: new SeasonDatasource(),
            leagueDatasource: new LeagueDatasource(),
            awardDatasource: new AwardDatasource(),
            storylineDatasource: new StorylineDatasource()
          },
        };
      },
    })
  );

  // Health check endpoint
  app.get("/health", (_, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Start server
  const port = 4000;
  await new Promise<void>((resolve) => {
    httpServer.listen({ port }, resolve);
    console.log(`Server starting on port ${port}`);
  });

  return {
    server,
    app,
    httpServer,
    url: `http://localhost:${port}/graphql`,
  };
}
