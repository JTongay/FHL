import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const TestTable = pgTable("test", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  ageRenamed: integer().notNull(),
});
