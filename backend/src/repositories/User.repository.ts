// import {Kysely, Selectable, sql} from "kysely";
// import {Database, Users} from "@fhl/core/src/sql.generated";
// import {CreateUserParams, UpdateUserParams} from "@/domain/User";
// import {Pagination} from "@/util";
// import { TitleChange, TitleChangeQuery } from "@/domain/League";

import { db } from "@/db";
import { LeaguesTable } from "@/db/schema/leagues";
import { UsersTable } from "@/db/schema/users";
import { CreateUserParams, UpdateUserParams, User } from "@/domain/User";
import { Pagination } from "@/util";
import { eq, inArray, sql } from "drizzle-orm";

export class UserRepository {
  async createUser(user: CreateUserParams): Promise<User> {
    const fhl = await this.getFHL();
    const insertedUsers = await db.insert(UsersTable).values({
      firstName: user.firstName,
      lastName: user.lastName,
      gamertag: user.gamertag,
      email: user.email,
      idpId: user.idpId,
      avatarUrl: user.avatarUrl,
      lastSignInAt: user.lastSignInAt,
      leagueId: fhl,
    });

    return new User(insertedUsers[0]);
  }

  async getUsers(ids: number[]): Promise<User[]> {
    const result = await db
      .select()
      .from(UsersTable)
      .where(inArray(UsersTable.id, ids))
      .execute();

    return result.map((user) => new User(user));
  }

  async getUsersPaginated(pagination: Pagination): Promise<User[]> {
    const response = await db
      .select()
      .from(UsersTable)
      .offset(pagination.offset)
      .limit(pagination.limit)
      .execute();

    return response.map((user) => new User(user));
  }
  async updateUser(user: UpdateUserParams): Promise<User> {
    const response = await db
      .update(UsersTable)
      .set({
        firstName: user.firstName,
        lastName: user.lastName,
        gamertag: user.gamertag,
        email: user.email,
        updatedAt: sql`now()`,
      })
      .returning()
      .execute();

    return new User(response[0]);
  }

  //   async getTitleHistory(userId: number): Promise<TitleChange[]> {
  // const response: TitleChangeQuery[] = await this.db.selectFrom("user_title")
  //   .where("user_id", "=", userId)
  //   .innerJoin("titles", "user_title.title_id", "titles.id")
  //   .innerJoin("events", "events.id", "user_title.event_id")
  //   .select([
  //     "titles.id",
  //     "titles.name",
  //     "titles.description",
  //     "titles.league_id",
  //     "events.id as event_id",
  //     "user_title.created_at",
  //     "user_title.updated_at"
  //   ])
  //   .execute();
  // return response.map((title) => new TitleChange(title));
  //   }

  private async getFHL(): Promise<number> {
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
