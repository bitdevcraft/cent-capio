import { betterAuth } from "better-auth";
import { v4 as uuidV4 } from "uuid";
import "dotenv/config";

import { database } from "./config/database";
import { plugins } from "./config/plugins";
import { sendResetPassword } from "./email/reset-password-email";
import { sendVerificationEmail } from "./email/verification-email";
import { env } from "./env";
import { getActiveOrganization } from "./lib/get-active-organization";

export const auth = betterAuth({
  advanced: {
    database: {
      generateId: () => uuidV4(),
    },
    ipAddress: {
      disableIpTracking: false,
      ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
    },
  },

  baseURL: env.BASE_URL,

  // Database
  database,

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await getActiveOrganization(session.userId);

          return {
            data: {
              ...session,
              activeOrganizationId: organization?.id,
            },
          };
        },
      },
    },
    user: {
      create: {
        after: async (user) => {
          await auth.api.createOrganization({
            body: {
              metadata: { personal: true },
              name: `${user.name}'s Organization`,
              slug: user.id,
              userId: user.id,
            },
          });
        },
      },
    },
  },
  // Auth
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword,
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail,
  },

  plugins,

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },

  trustedOrigins: [env.BASE_URL],
});
