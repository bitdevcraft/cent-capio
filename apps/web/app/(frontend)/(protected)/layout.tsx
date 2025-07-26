import { authClient } from "@/lib/auth/auth-client";
import { auth } from "@repo/cent-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateOrganizationForm } from "./organization/create/create-organization-form";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) {
    const pathname = headerList.get("x-current-path");
    redirect(`/auth/login?path=${pathname}`);
  }

  if (!session.session.activeOrganizationId) {
    return <CreateOrganizationForm />;
  }

//   const data = await auth.api.listOrganizations();

//   console.log(data);

  return <>{children}</>;
}
