import { Prisma } from "@prisma/client";
import prisma from "../src/prisma/client";

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    picture: "https://cdn.fakercloud.com/avatars/alice_128.jpg",
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
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
