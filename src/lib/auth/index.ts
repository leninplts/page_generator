import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { sendEmail } from "../email";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Restablecer tu contrasena — Page Generator",
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px;">
            <h1 style="font-size: 24px; font-weight: 700; color: #1e293b; margin-bottom: 16px;">
              Restablecer contrasena
            </h1>
            <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
              Hola ${user.name || ""},<br/>
              Recibimos una solicitud para restablecer la contrasena de tu cuenta en Page Generator.
            </p>
            <a href="${url}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 15px; font-weight: 600; padding: 12px 32px; border-radius: 8px; text-decoration: none;">
              Restablecer contrasena
            </a>
            <p style="font-size: 13px; color: #94a3b8; margin-top: 24px; line-height: 1.5;">
              Si no solicitaste este cambio, puedes ignorar este correo. El enlace expira en 1 hora.
            </p>
          </div>
        `,
      });
    },
  },
  socialProviders: {
    google: {
      clientId:
        import.meta.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || "",
      clientSecret:
        import.meta.env.GOOGLE_CLIENT_SECRET ||
        process.env.GOOGLE_CLIENT_SECRET ||
        "",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day - update session every day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  trustedOrigins: [
    import.meta.env.BETTER_AUTH_URL ||
      process.env.BETTER_AUTH_URL ||
      "http://localhost:4321",
  ],
});
