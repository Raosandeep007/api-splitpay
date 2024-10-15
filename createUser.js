const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUser() {
  const email = process.argv[2];
  const name = process.argv[3];

  if (!email || !name) {
    console.error("Please provide both email and name");
    process.exit(1);
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  console.log(user);
  prisma.$disconnect();
}

createUser().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
