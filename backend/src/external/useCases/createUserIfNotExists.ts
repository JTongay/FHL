// import {UserJSON} from "@clerk/backend";
// import {User} from "@/domain/User";
// import {Kysely} from "kysely";
// import {Database} from "@fhl/core/src/sql.generated";

// export const createUserIfNotExists = async (
//     input: UserJSON,
//     db: Kysely<Database>
// ): Promise<User> => {
//   const user = await db
//       .selectFrom("users")
//       .selectAll()
//       .where((eb) => eb.or([
//         eb("idp_id", "=", input.id),
//         eb("email", "=", input.email_addresses[0].email_address),
//       ]))
//       .executeTakeFirstOrThrow();

//   if (user) {
//     return new User(user);
//   }

//   const newUser = await db
//       .insertInto("users")
//       .values({
//         first_name: input.first_name,
//         last_name: input.last_name,
//         gamertag: `${input.first_name} ${input.last_name}`,
//         email: input.email_addresses[0].email_address,
//         idp_id: input.id,
//         avatar_url: input.image_url,
//         last_sign_in_at: new Date(input.last_sign_in_at),
//       })
//       .returningAll()
//       .executeTakeFirstOrThrow();

//   return new User(newUser);
// };
