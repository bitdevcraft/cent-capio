import { db } from "@repo/cent-database";
import * as schema from "@repo/cent-database/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { v4 as uuidV4 } from "uuid";
import { getActiveOrganization } from "./get-active-organization";

export const auth = betterAuth({
  // Database
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      account: schema.userAccountsTable,
      invitation: schema.organizationInvitationsTable,
      member: schema.organizationMembersTable,
      organization: schema.organizationsTable,
      session: schema.userSessionsTable,
      user: schema.usersTable,
      verification: schema.userVerificationsTable,
    },
  }),

  // Auth
  emailAndPassword: {
    enabled: true,
  },

  // Plugins
  plugins: [organization()],

  // Session
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },

  advanced: {
    database: {
      generateId: () => uuidV4(),
    },
  },

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
              name: `${user.name ?? "User"}'s Organization`,
              slug: `${user.id}`,
              metadata: { personal: true },
              userId: user.id,
            },
          });
        },
      },
    },
  },
});
