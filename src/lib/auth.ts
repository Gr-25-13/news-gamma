import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { admin } from "better-auth/plugins";
import { sendEmail } from "./mail";

// Re-export shared validation schemas for convenience
export {
  SignUpSchema,
  SignInSchema,
  PasswordResetSchema,
  PasswordResetRequestSchema,
  type SignUpInput,
  type SignInInput,
} from "./schemas/auth";

// Kontrollera att secret finns
if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "Missing BETTER_AUTH_SECRET environment variable for better-auth."
  );
}

export const auth = betterAuth({
  // Hemlig nyckel för att signera tokens och annan känslig data
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    changeEmail: { enabled: true },
    update: { enabled: true },
  },
  emailAndPassword: {
    enabled: true,
    // matchande med klientens valideringsregler
    minPasswordLength: 8,
    // Avaktivera e-postverifiering för nuvarande användare eftersom vi inte har User.emailVerified-fältet
    requireEmailVerification: true,
    // optimalt
    async sendResetPassword({ user, url /*, token*/ }) {
      // TODO: Integrate your email provider here
      if (!user?.email) {
        console.warn("sendResetPassword: missing user.email");
        return;
      }
      console.log(
        `[BetterAuth] Password reset requested for ${user.email}. Link: ${url}`
      );
      try {
        await sendEmail({
          to: user.email,
          subject: "Reset your password",
          text: `Reset your password: ${url}`,
          html: `Click to reset your password: <a href="${url}">Reset password</a>`,
        });
      } catch (err) {
        console.error("Failed to send reset email:", err);
        throw err;
      }
    },
  },
  // E-post verifiering inaktiverad för nuvarande användare
  emailVerification: {
    sendOnSignUp: true, // Detta måste vara true för att skicka mail
    autoSignInAfterVerification: true, // <-- enable auto sign-in after user clicks verification link
    async sendVerificationEmail({ user, url, token }) {
      console.log("[Auth] Sending verification email to:", user?.email);
      if (!user?.email) return;

      const subject = "Verifiera din e-postadress";
      const text = `Klicka här för att verifiera din e-postadress: ${url}`;
      const html = `
        <h2>Verifiera din e-postadress</h2>
        <p>Klicka på länken nedan för att verifiera:</p>
        <a href="${url}">Verifiera min e-postadress</a>
      `;

      try {
        await sendEmail({
          to: user.email,
          subject,
          text,
          html,
        });
        console.log("[Auth] Verification email sent successfully");
      } catch (err) {
        console.error("[Auth] Failed to send verification email:", err);
        throw err;
      }
    },
    resend: {
      enabled: true, // Enable resend functionality
      maxAttempts: 3, // Optional: limit resend attempts
    },
  },
  // Registrera admin-plugin om du behöver den; annars ta bort importen ovan
  plugins: [admin()],
});

// Flyttad kommentar: this module may be moved to src/lib/server-auth.ts to avoid importing next/headers in client bundles.

type BetterAuthErrorContext = {
  path: string;
  error: Error;
  // Lägg till fler fält om du vet vilka som finns
};
