import { auth } from "@repo/cent-auth";
import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { OrganizationProvider } from "@/components/organization-provider";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headers = await nextHeaders();

  const session = await auth.api.getSession({
    headers,
  });

  console.log(session);

  if (session) {
    redirect(`/cent-admin`);
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {children}
    </div>
  );
}
