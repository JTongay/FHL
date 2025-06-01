import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { timestamps } from "../helpers/schema.helpers";

export const LeaguesTable = pgTable("leagues", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
  ...timestamps,
});

export const SeasonsTable = pgTable("seasons", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  isActive: boolean("is_active").notNull().default(false),
  leagueId: integer("league_id").notNull(),
});

export const AwardsTable = pgTable("awards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  description: text().notNull(),
  ...timestamps,
});

export const EventsTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
  isActive: boolean("is_active").notNull().default(false),
  leagueId: integer("league_id").notNull(),
  ...timestamps,
});

export const AwardSeasonTable = pgTable(
  "award_season",
  {
    awardId: integer("award_id")
      .notNull()
      .references(() => AwardsTable.id),
    presenterId: integer("presenter_id").references(() => UsersTable.id),
    winnerId: integer("winner_id").references(() => UsersTable.id),
    seasonId: integer("season_id")
      .notNull()
      .references(() => SeasonsTable.id),
  },
  (t) => [primaryKey({ columns: [t.awardId, t.seasonId] })]
);

export const LeaguesRelations = relations(LeaguesTable, ({ many }) => ({
  seasons: many(SeasonsTable),
  events: many(EventsTable),
}));

export const SeasonsRelations = relations(SeasonsTable, ({ one }) => ({
  leagues: one(LeaguesTable, {
    fields: [SeasonsTable.leagueId],
    references: [LeaguesTable.id],
  }),
}));

export const EventsRelations = relations(EventsTable, ({ one }) => ({
  leagues: one(LeaguesTable, {
    fields: [EventsTable.leagueId],
    references: [LeaguesTable.id],
  }),
}));

export const AwardSeasonRelations = relations(AwardSeasonTable, ({ one }) => ({
  presenters: one(UsersTable, {
    fields: [AwardSeasonTable.presenterId],
    references: [UsersTable.id],
  }),
  winners: one(UsersTable, {
    fields: [AwardSeasonTable.winnerId],
    references: [UsersTable.id],
  }),
}));
