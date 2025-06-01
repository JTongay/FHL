// import {Kysely, Selectable, sql} from "kysely";
// import {Database, Users} from "@fhl/core/src/sql.generated";
// import {CreateUserParams, UpdateUserParams} from "@/domain/User";
// import {Pagination} from "@/util";
// import { TitleChange, TitleChangeQuery } from "@/domain/League";

// export class UserRepository {
//   constructor(private db: Kysely<Database>) {}
//   async createUser(user: CreateUserParams): Promise<Selectable<Users>> {
//     return this.db
//         .insertInto("users")
//         .values(({selectFrom}) => ({
//           first_name: user.firstName,
//           last_name: user.lastName,
//           gamertag: user.gamertag,
//           email: user.email,
//           idp_id: user.idpId,
//           avatar_url: user.avatarUrl,
//           last_sign_in_at: user.lastSignInAt,
//           league_id: selectFrom("leagues").where("name", "=", "FHL").select("id")
//         }))
//         .returningAll()
//         .executeTakeFirstOrThrow();
//   }

//   async getUsers(ids: number[]): Promise<Selectable<Users>[]> {
//     return this.db.selectFrom("users").where("id", "in", ids).selectAll().execute();
//   }

//   async getUsersPaginated(pagination: Pagination): Promise<Selectable<Users>[]> {
//     return this.db.selectFrom("users")
//         .offset(pagination.offset)
//         .limit(pagination.limit)
//         .selectAll()
//         .execute();
//   }
//   async updateUser(user: UpdateUserParams): Promise<Selectable<Users>> {
//     return this.db.updateTable("users")
//         .where("id", "=", +user.userId)
//         .set({
//           first_name: user.firstName,
//           last_name: user.lastName,
//           gamertag: user.gamertag,
//           email: user.email,
//           updated_at: sql`now()`,
//         })
//         .returningAll()
//         .executeTakeFirstOrThrow();
//   }

//   async getTitleHistory(userId: number): Promise<TitleChange[]> {
//     const response: TitleChangeQuery[] = await this.db.selectFrom("user_title")
//       .where("user_id", "=", userId)
//       .innerJoin("titles", "user_title.title_id", "titles.id")
//       .innerJoin("events", "events.id", "user_title.event_id")
//       .select([
//         "titles.id",
//         "titles.name",
//         "titles.description",
//         "titles.league_id",
//         "events.id as event_id",
//         "user_title.created_at",
//         "user_title.updated_at"
//       ])
//       .execute();

//     return response.map((title) => new TitleChange(title));
//   }
// }
