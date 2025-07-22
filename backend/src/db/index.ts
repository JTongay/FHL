import { drizzle } from "drizzle-orm/node-postgres";
import * as GamesSchema from "./schema/games";
import * as LeaguesSchema from "./schema/leagues";
import * as UsersSchema from "./schema/users";

const schema = { ...GamesSchema, ...LeaguesSchema, ...UsersSchema };
export const db = drizzle<typeof schema>("http://localhost:5432/fhl_dev", {
  schema,
});
