import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userA = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
    },
  });
  const userB = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
    },
  });
  const userC = await prisma.user.upsert({
    where: { email: "chris@prisma.io" },
    update: {},
    create: {
      email: "chris@prisma.io",
      name: "Chris",
    },
  });
  console.log({ userA, userB, userC });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
