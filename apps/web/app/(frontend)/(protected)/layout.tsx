import { auth } from "@repo/cent-auth";
import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { CreateOrganizationForm } from "./organization/create/create-organization-form";
import { OrganizationProvider } from "@/components/organization-provider";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headers = await nextHeaders();

  const session = await auth.api.getSession({
    headers,
  });

  if (!session) {
    const pathname = headers.get("x-current-path");
    redirect(`/auth/login?path=${pathname}`);
  }

  if (!session.session.activeOrganizationId) {
    return <CreateOrganizationForm />;
  }

  await auth.api.setActiveOrganization({
    body: {
      organizationId: session.session.activeOrganizationId,
    },
    headers,
  });

  return <OrganizationProvider>{children}</OrganizationProvider>;
}
