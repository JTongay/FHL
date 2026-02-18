import DataLoader from "dataloader";
import {
  CreateUserParams,
  UpdateUserParams,
  User,
  UserResponse,
  UsersList,
  UsersResponse,
} from "@/domain/User";
import { ApiError } from "@/domain/errors/FHLApiError";
import { Pagination } from "@/util";
import { db } from "@/db";
import { UsersTable } from "@/db/schema/users";
import { asc, eq, inArray, sql } from "drizzle-orm";
import { SelectUser } from "@/db/types";
import { LeaguesTable } from "@/db/schema/leagues";

function isUser(user: SelectUser | Error): user is SelectUser {
  return !(user instanceof Error);
}

function isError(user: SelectUser | Error): user is Error {
  return user instanceof Error;
}

export class UserDatasource {
  private batchUsers = new DataLoader(async (ids: number[]) => {
    const usersList = await db
      .select()
      .from(UsersTable)
      .where(inArray(UsersTable.id, ids))
      .execute();
    // Dataloader expects you to return a list with the results ordered just like the list in the arguments were
    // Since the database might return the results in a different order the following code sorts the results accordingly
    const userIdsToUserMap = usersList.reduce((mapping, user) => {
      mapping[user.id] = user;
      return mapping;
    }, {} as { [key: string]: SelectUser });
    return ids.map((id) => userIdsToUserMap[id]);
  });

  async getUsersBatch(ids: number[]): Promise<User[] | ApiError> {
    const users = await this.batchUsers.loadMany(ids);
    // Filter out the errors for some reason?
    // TODO Maybe I want to get access to the Errors?
    const errors = users.filter(isError);
    if (errors.length) {
      console.error(errors);
      return new ApiError(1000, errors[0].message);
    }
    return users.filter(isUser).map((user) => new User(user));
  }

  async getUsersPaginated({
    limit,
    offset,
  }: Pagination): Promise<UsersResponse> {
    const users = await db
      .select()
      .from(UsersTable)
      .orderBy(asc(UsersTable.id))
      .limit(limit)
      .offset(offset)
      .execute();

    return new UsersList(
      { limit, offset },
      users.length,
      users.map((user) => new User(user))
    );
  }

  async getUser(id: number): Promise<UserResponse> {
    const user = await this.batchUsers.load(id);
    if (!user) {
      return new ApiError(1001, "User not found");
    }
    return new User(user);
  }

  async createUser({
    firstName,
    lastName,
    gamertag,
    email,
  }: CreateUserParams): Promise<UserResponse> {
    try {
      return await db.transaction(async (tx) => {
        const fhl = await db
          .select({ id: LeaguesTable.id })
          .from(LeaguesTable)
          .where(eq(LeaguesTable.name, "FHL"))
          .limit(1)
          .execute();
        if (!fhl.length) {
          throw new Error("FHL Not Found");
        }
        const response = await db
          .insert(UsersTable)
          .values({
            firstName,
            lastName,
            gamertag,
            email,
            leagueId: fhl[0].id,
          })
          .returning()
          .execute();

        return new User(response);
      });
    } catch (e) {
      return new ApiError(1001, e.toString());
    }
  }

  async updateUser({
    firstName,
    lastName,
    gamertag,
    email,
  }: UpdateUserParams): Promise<UserResponse> {
    try {
      const response = await db.update(UsersTable).set({
        firstName,
        lastName,
        gamertag,
        email,
        updatedAt: sql`now()`,
      });
      return new User(response);
    } catch (e: unknown) {
      return new ApiError(1009, e.toString());
    }
  }

  // async getTitleHistory(userId: number): Promise<TitleChange[]> {
  //   // return await this.userRepo.getTitleHistory(userId);
  // }
}
