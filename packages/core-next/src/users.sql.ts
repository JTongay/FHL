import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  gamertag: varchar().unique().notNull(),
  first_name: varchar().notNull(),
  last_name: varchar().notNull(),
  email: varchar().notNull(),
  idp_id: uuid().unique(),
  avatar_url: text(),
  last_sign_in_at: timestamp().defaultNow(),
  wins: integer().notNull().default(0),
  losses: integer().notNull().default(0),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
