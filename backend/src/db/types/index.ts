import {
  AwardSeasonWinnerTable,
  AwardsTable,
  LeaguesTable,
  SeasonsTable,
} from "../schema/leagues";
import { TeamsTable, UsersTable } from "../schema/users";

export type SelectUser = typeof UsersTable.$inferSelect;
export type InsertUser = typeof UsersTable.$inferInsert;

export type SelectTeam = typeof TeamsTable.$inferSelect;
export type InsertTeam = typeof TeamsTable.$inferInsert;

export type SelectAward = typeof AwardsTable.$inferSelect;
export type InsertAward = typeof AwardsTable.$inferInsert;

export type SelectLeague = typeof LeaguesTable.$inferSelect;
export type InsertLeague = typeof LeaguesTable.$inferInsert;

export type SelectSeason = typeof SeasonsTable.$inferSelect;
export type InsertSeason = typeof SeasonsTable.$inferInsert;

export type SelectAwardSeasonWinner =
  typeof AwardSeasonWinnerTable.$inferSelect;
export type InsertAwardSeasonWinner =
  typeof AwardSeasonWinnerTable.$inferInsert;
