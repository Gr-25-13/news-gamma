const { PrismaClient } = require("@prisma/client");

async function checkConstraints() {
  const prisma = new PrismaClient();

  try {
    console.log("🔍 Kontrollerar databas-constraints...\n");

    // Först - skapa eller hitta en test-användare
    let testUser;
    try {
      testUser = await prisma.user.upsert({
        where: { email: "test-constraints@example.com" },
        update: {},
        create: {
          email: "test-constraints@example.com",
          name: "Test User",
          role: {
            connectOrCreate: {
              where: { name: "USER" },
              create: { name: "USER" },
            },
          },
        },
      });
      console.log("✅ Test-användare klar (ID:", testUser.id + ")");
    } catch (error) {
      console.log("❌ Kunde inte skapa test-användare:", error.message);
      return;
    }

    // Test 1: Account UNIQUE constraint
    console.log(
      "\n📋 Testar account UNIQUE constraint (providerId, accountId)..."
    );

    // Rensa först eventuell gammal test-data
    await prisma.account.deleteMany({
      where: { accountId: "test123" },
    });

    try {
      // Skapa första account
      const account1 = await prisma.account.create({
        data: {
          accountId: "test123",
          providerId: "credential",
          userId: testUser.id,
        },
      });
      console.log("✅ Första account skapad (ID:", account1.id + ")");

      // Försök skapa samma account igen (ska misslyckas med P2002)
      await prisma.account.create({
        data: {
          accountId: "test123",
          providerId: "credential",
          userId: testUser.id,
        },
      });
      console.log(
        "❌ VARNING: Kunde skapa dubblett - UNIQUE constraint saknas!"
      );
    } catch (error) {
      if (error.code === "P2002") {
        console.log(
          "✅ UNIQUE constraint fungerar korrekt för account (providerId, accountId)"
        );

        // Kontrollera vilka fält som är unique
        if (error.meta && error.meta.target) {
          console.log("   Unique fields:", error.meta.target);
        }
      } else {
        console.log("🔥 Oväntat fel:", error.code, error.message);
      }
    }

    // Test 2: Verification UNIQUE constraint (snabb test)
    console.log(
      "\n📋 Testar verification UNIQUE constraint (identifier, value)..."
    );

    // Rensa först
    await prisma.verification.deleteMany({
      where: { identifier: "test@constraints.com" },
    });

    try {
      await prisma.verification.create({
        data: {
          identifier: "test@constraints.com",
          value: "abc123",
          expiresAt: new Date(Date.now() + 3600000),
        },
      });

      // Försök duplicera
      await prisma.verification.create({
        data: {
          identifier: "test@constraints.com",
          value: "abc123",
          expiresAt: new Date(Date.now() + 7200000),
        },
      });
      console.log("❌ VARNING: Verification UNIQUE constraint saknas!");
    } catch (error) {
      if (error.code === "P2002") {
        console.log(
          "✅ UNIQUE constraint fungerar korrekt för verification (identifier, value)"
        );
        if (error.meta && error.meta.target) {
          console.log("   Unique fields:", error.meta.target);
        }
      } else {
        console.log("🔥 Oväntat fel:", error.message);
      }
    }
  } catch (error) {
    console.error("❌ Generellt fel:", error.message);
  } finally {
    // Rensa ALLA test-data
    try {
      await prisma.account.deleteMany({
        where: { accountId: "test123" },
      });
      await prisma.verification.deleteMany({
        where: { identifier: "test@constraints.com" },
      });
      await prisma.user.deleteMany({
        where: { email: "test-constraints@example.com" },
      });
      console.log("\n🧹 All test-data rensad");
    } catch (e) {
      console.log("ℹ️ Rensning klar");
    }

    await prisma.$disconnect();
  }
}

checkConstraints();
