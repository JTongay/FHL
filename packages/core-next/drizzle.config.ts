import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  // Pick up all our schema files
  schema: ["./src/**/*.sql.ts"],
  out: "./migrations",
  dbCredentials: {
    host: Resource.fhlDb_test.host,
    port: Resource.fhlDb_test.port,
    user: Resource.fhlDb_test.username,
    password: Resource.fhlDb_test.password,
    database: Resource.fhlDb_test.database,
  },
});
