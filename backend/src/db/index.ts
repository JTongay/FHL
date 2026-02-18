import { drizzle } from "drizzle-orm/node-postgres";
import * as GamesSchema from "./schema/games";
import * as LeaguesSchema from "./schema/leagues";
import * as UsersSchema from "./schema/users";

const schema = { ...GamesSchema, ...LeaguesSchema, ...UsersSchema };

export type DBSchema = typeof schema;
export type DBTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export const db = drizzle<DBSchema>(process.env.DATABASE_URL, {
  schema,
});
