import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const appRouter = router({
  user: router({
    users: publicProcedure.query(async () => {
      const users = await prisma.user.findMany();
      return users;
    }),
    byId: publicProcedure.input(z.string()).query(async (opts) => {
      const { input } = opts;
      const user = await prisma.user.findUnique({
        where: { id: Number(input) },
      });
      return user;
    }),
    create: publicProcedure
      .input(z.object({ email: z.string(), name: z.string() }))
      .mutation(async (opts) => {
        const { input } = opts;
        const user = await prisma.user.create({
          data: input,
        });
        return user;
      }),
  }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

