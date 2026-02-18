import {
  pgTable,
  integer,
  varchar,
  timestamp,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import {
  AwardSeasonPresenterTable,
  AwardSeasonWinnerTable,
  LeaguesTable,
  SeasonsTable,
} from "./leagues";
import { timestamps } from "../helpers/schema.helpers";
import { relations } from "drizzle-orm";
import { time } from "console";

export const UsersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  gamertag: varchar({ length: 255 }).notNull().unique(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar().unique(),
  wins: integer().notNull().default(0),
  losses: integer().notNull().default(0),
  leagueId: integer("league_id")
    .notNull()
    .references(() => LeaguesTable.id, { onDelete: "cascade" }),
  idpId: varchar("idp_id"),
  avatarUrl: varchar("avatar_url"),
  lastSignInAt: timestamp("last_sign_in_at"),
  ...timestamps,
});

export const TeamsTable = pgTable("teams", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
  wins: integer().notNull().default(0),
  losses: integer().notNull().default(0),
  leagueId: integer("league_id")
    .notNull()
    .references(() => LeaguesTable.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const StorylinesTable = pgTable("storylines", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  description: text().notNull().unique(),
  seasonId: integer("season_id").references(() => SeasonsTable.id, {
    onDelete: "cascade",
  }),
  ...timestamps,
});

// Composite key. No primary key id!
export const UserStorylineTable = pgTable(
  "user_storyline",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => UsersTable.id),
    storylineId: integer("storyline_id")
      .notNull()
      .references(() => StorylinesTable.id),
  },
  (t) => [primaryKey({ columns: [t.storylineId, t.userId] })]
);

export const TeamSeasonTable = pgTable(
  "team_season",
  {
    teamId: integer("team_id")
      .notNull()
      .references(() => TeamsTable.id),
    seasonId: integer("season_id")
      .notNull()
      .references(() => SeasonsTable.id),
    captainId: integer("captain_id").references(() => UsersTable.id),
    wins: integer().notNull().default(0),
    losses: integer().notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.teamId, t.seasonId] })]
);

export const UserTeamSeasonTable = pgTable(
  "user_team_season",
  {
    teamId: integer("team_id")
      .notNull()
      .references(() => TeamsTable.id, { onDelete: "cascade" }),
    playerId: integer("player_id")
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    seasonId: integer("season_id")
      .notNull()
      .references(() => SeasonsTable.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.teamId, t.playerId, t.seasonId] })]
);

// ============= Relations ======================
export const UsersRelations = relations(UsersTable, ({ one, many }) => ({
  awardWinner: one(AwardSeasonWinnerTable, {
    fields: [UsersTable.id],
    references: [AwardSeasonWinnerTable.winnerId],
  }),
  awardPresenter: one(AwardSeasonPresenterTable, {
    fields: [UsersTable.id],
    references: [AwardSeasonPresenterTable.presenterId],
  }),
  teamPlayer: one(TeamSeasonTable, {
    fields: [UsersTable.id],
    references: [TeamSeasonTable.captainId],
  }),
  teamCaptain: one(TeamSeasonTable, {
    fields: [UsersTable.id],
    references: [TeamSeasonTable.captainId],
  }),
}));
