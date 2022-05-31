const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const user = await createUser();

  process.exit(0);
}

async function createUser() {
  const user = await prisma.user.create({
    data: {
      username: 'alice',
      password: 'yoo',
      profile: {
        create: {
          firstName: 'Omar',
          lastName: 'Barry',
          email: 'alice@boolean.co.uk'
        }
      },
      diary: {
        create: {
          plan: 'Go to KFC',
          affirmation: 'Smile at the staff'
        }
      }
    },
    include: {
      profile: true,
      diary: true
    }
  });

  console.log('User created', user);

  return user;
}

seed()
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));