import { db, organizationMembersTable } from "@repo/cent-database";
import { eq } from "drizzle-orm";

export async function getActiveOrganization(userId: string) {
  const data = await db.query.organizationMembersTable.findFirst({
    where: eq(organizationMembersTable.userId, userId),
    with: {
      organization: true,
    },
  });

  return data?.organization;
}
