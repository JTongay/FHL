import DataLoader from "dataloader";
import {fhlDb} from "@fhl/core/src/db";
import {Selectable, sql} from "kysely";
import {Users} from "@fhl/core/src/sql.generated";
import {CreateUserParams, UpdateUserParams, User, UserResponse} from "@/domain/User";
import {ApiError} from "@/domain/errors/FHLApiError";

export class UserDatasource {
  private batchUsers = new DataLoader(async (ids: number[]) => {
    const usersList = await fhlDb.selectFrom("users").where("id", "in", ids).selectAll().execute();
    // Dataloader expects you to return a list with the results ordered just like the list in the arguments were
    // Since the database might return the results in a different order the following code sorts the results accordingly
    const userIdsToUserMap = usersList.reduce((mapping, user) => {
      mapping[user.id] = user;
      return mapping;
    }, {});
    return ids.map((id) => userIdsToUserMap[id]);
  });

  async getUsers(ids: number[]): Promise<Selectable<Users[]>> {
    return this.batchUsers.loadMany(ids);
  }

  async getUser(id: number) {
    return this.batchUsers.load(id);
  }

  async createUser(params: CreateUserParams): Promise<UserResponse> {
    try {
      const response = await fhlDb
          .insertInto("users")
          .values({
            first_name: params.firstName,
            last_name: params.lastName,
            gamertag: params.gamertag,
            email: params.email,
          })
          .returningAll()
          .executeTakeFirstOrThrow();
      return new User(response);
    } catch (e) {
      return new ApiError(101, e.toString());
    }
  }

  async updateUser(params: UpdateUserParams): Promise<UserResponse> {
    try {
      const response = await fhlDb.updateTable("users")
          .set({
            first_name: params.firstName,
            last_name: params.lastName,
            email: params.email,
            gamertag: params.gamertag,
            updated_at: sql`now()`,
          })
          .where("id", "=", +params.userId)
          .returningAll()
          .executeTakeFirstOrThrow();
      return new User(response);
    } catch (e: unknown) {
      return new ApiError(1009, e.toString());
    }
  }
}
