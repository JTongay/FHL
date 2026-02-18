// import { ApiHandler as apiHandler } from "sst/node/api";
// import { WebhookEvent } from "@clerk/backend";
// import { Webhook } from "svix";
// import { config } from "dotenv";
// import { UserRepository } from "@/repositories/User.repository";

// config();

// const USER_CREATED = "user.created";
// const USER_UPDATED = "user.updated";
// const USER_DELETED = "user.deleted";

// export const handler = apiHandler(async (event) => {
//   console.log(event);
//   console.log(process.env, "env vars");

//   const WEBHOOK_SECRET = process.env.WEBHOOK_SIGNING_SECRET;
//   if (!WEBHOOK_SECRET) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: "Missing webhook secret" }),
//     };
//   }

//   const headers = event.headers;
//   const payload = event.body;

//   // Svix Headers for webhook verification
//   const svixId = headers["svix-id"];
//   const svixSignature = headers["svix-signature"];
//   const svixTimestamp = headers["svix-timestamp"];

//   const wh = new Webhook(WEBHOOK_SECRET);
//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(payload, {
//       "svix-id": svixId,
//       "svix-signature": svixSignature,
//       "svix-timestamp": svixTimestamp,
//     }) as WebhookEvent;
//     console.log(evt, "webHookEvent");
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: "Invalid webhook payload" }),
//     };
//   }

//   const userRepo = new UserRepository(fhlDb);

//   const eventType = evt.type;
//   if (eventType === USER_CREATED) {
//     // TODO: Create a user
//     // const user = await userRepo.createUser({
//     //   firstName: evt.data.first_name,
//     //   lastName: evt.data.last_name,
//     //   email: evt.data.email_addresses[0].email_address,
//     //   gamertag: `${evt.data.first_name} ${evt.data.last_name}`,
//     //   idpId: evt.data.id,
//     //   avatarUrl: evt.data.image_url,
//     //   lastSignInAt: new Date(evt.data.last_sign_in_at),
//     // });
//     console.log("User created: ", evt.data.id);
//   }

//   console.log("BOOYAH");

//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: "Booyah",
//       eventType,
//       event: evt.data,
//     }),
//   };
// });
