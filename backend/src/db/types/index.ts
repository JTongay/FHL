import { TeamsTable, UsersTable } from "../schema/users";

export type SelectUser = typeof UsersTable.$inferSelect;
export type InsertUser = typeof UsersTable.$inferInsert;

export type SelectTeam = typeof TeamsTable.$inferSelect;
export type InsertTeam = typeof TeamsTable.$inferInsert;
