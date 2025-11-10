import { db } from "@/db";
import { LeaguesTable } from "@/db/schema/leagues";
import { eq, inArray, sql } from "drizzle-orm";


export class BaseRepository {
  protected async getFHL(): Promise<number> {
    const result = await db
      .select({ id: LeaguesTable.id })
      .from(LeaguesTable)
      .where(eq(LeaguesTable.name, "FHL"))
      .execute();

    if (!result.length) {
      throw new Error("FHL League not found");
    }

    return result[0].id;
  }
}
