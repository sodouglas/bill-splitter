/**
 * This is the client-side code that uses the inferred types from the server
 */
// import {
//   createTRPCClient,
//   splitLink,
//   unstable_httpBatchStreamLink,
//   unstable_httpSubscriptionLink,
// } from "@trpc/client";
/**
 * We only import the `AppRouter` type from the server - this is not available at runtime
 */
// import type { AppRouter } from "../server/index.js";

// import { trpc } from "./utils/trpc";

// Initialize the tRPC client
// const trpc = createTRPCClient<AppRouter>({
//   links: [
//     splitLink({
//       condition: (op) => op.type === "subscription",
//       true: unstable_httpSubscriptionLink({
//         url: "http://localhost:3000",
//       }),
//       false: unstable_httpBatchStreamLink({
//         url: "http://localhost:3000",
//       }),
//     }),
//   ],
// });

async function main() {
  // Call procedure functions
  // 💡 Tip, try to:
  // - hover any types below to see the inferred types
  // - Cmd/Ctrl+click on any function to jump to the definition
  // - Rename any variable and see it reflected across both frontend and backend
  // const user1 = await trpc.user.byId.query("1");
  //    ^?
  // console.log("User 1:", user1);
  //   const createdUser = await trpc.createUser.mutate({
  //     name: "Holly",
  //     email: "Holly@prisma.io",
  //   });
  //   //   //    ^?
  //   console.log("Created user:", createdUser);
  // const users = await trpc.users.query();
  // console.log("Users:", users);
  //   const user = await trpc.user.byId.query("1");
  //   //    ^?
  //   console.log("User 1:", user);
  //   const iterable = await trpc.examples.iterable.query();
  //   for await (const i of iterable) {
  //     console.log("Iterable:", i);
  //   }
}

void main();
