const { PrismaClient } = require("@prisma/client");

async function createAdmin() {
  const prisma = new PrismaClient();

  try {
    console.log("🔐 Skapar admin-användare...");

    // Skapa eller hitta ADMIN-roll
    const adminRole = await prisma.role.upsert({
      where: { name: "ADMIN" },
      update: {},
      create: {
        name: "ADMIN",
      },
    });

    // Skapa admin-användare
    const adminUser = await prisma.user.upsert({
      where: { email: "admin@dagens-dos.se" },
      update: {},
      create: {
        email: "admin@dagens-dos.se",
        name: "Admin User",
        emailVerified: new Date(),
        role: {
          connect: { id: adminRole.id },
        },
      },
    });

    // Skapa Better Auth account med OHASHAD lösenord
    await prisma.account.upsert({
      where: {
        providerId_accountId: {
          providerId: "credential",
          accountId: "admin@dagens-dos.se",
        },
      },
      update: {},
      create: {
        accountId: "admin@dagens-dos.se",
        providerId: "credential",
        password: "Admin123!", // <-- OHASHAD! Better Auth hashar automatiskt
        userId: adminUser.id,
      },
    });

    console.log("✅ Admin-användare skapad!");
    console.log("📧 Email: admin@dagens-dos.se");
    console.log("🔑 Password: Admin123!");
    console.log("🌐 Login URL: http://localhost:3000/auth/login");
    console.log("");
    console.log(
      "ℹ️  Better Auth hashar lösenordet automatiskt vid första inloggning"
    );
  } catch (error) {
    console.error("❌ Fel:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
