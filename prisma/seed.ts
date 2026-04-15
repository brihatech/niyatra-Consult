import { auth } from "../src/server/auth/config";
import { db } from "../src/server/db";

async function main() {
  console.log("🌱 Seeding database...");

  const users = [
    {
      name: "Hazel Grace",
      email: "hazel@gmail.com",
      password: "password",
    },
    {
      name: "Augustus Waters",
      email: "augustus@gmail.com",
      password: "password",
    },
  ];
  const createdUsers = [];
  for (const user of users) {
    const existingUser = await db.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      console.log(`✅ User already exists: ${user.name} ${user.email}`);
      continue;
    }

    // Create user through better-auth API
    await auth.api.signUpEmail({
      body: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });

    // Update user with additional info
    const updatedUser = await db.user.update({
      where: { email: user.email },
      data: {
        emailVerified: true,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
      },
    });

    createdUsers.push(updatedUser);
    console.log(`✅ Created user: ${user.name} (${user.email})`);
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
