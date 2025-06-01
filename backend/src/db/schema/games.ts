import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/schema.helpers";

export const ConsoleEnum = pgEnum("console", [
  "pc",
  "xbox",
  "ps5",
  "ps4",
  "ps3",
  "ps2",
  "ps1",
  "nintendo64",
  "switch",
  "switch2",
]);

export const GamesTable = pgTable("games", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  trailer: varchar().notNull(),
  ...timestamps,
});

// I don't remember the point of this table?
export const ConsolesTable = pgTable("consoles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: ConsoleEnum().notNull(),
  ...timestamps,
});

// I probably need to make this a join table, but I'll cross that bridge when I get there
export const PlatformsTable = pgTable("platforms", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  storeLink: varchar("store_link").notNull(),
  console: ConsoleEnum().notNull(),
  ...timestamps,
});
