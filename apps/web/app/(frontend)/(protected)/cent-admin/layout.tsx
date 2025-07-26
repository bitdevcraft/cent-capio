import { auth } from "@repo/cent-auth";
import { headers as nextHeaders } from "next/headers";
import { OrganizationProvider } from "@/components/organization-provider";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@repo/ui/components/shadcn/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/shadcn/sidebar";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headers = await nextHeaders();

  const data = await auth.api.listOrganizations({ headers });

  const authSession = await auth.api.getSession({
    headers,
  });

  if (!authSession) {
    const pathname = headers.get("x-current-path");
    redirect(`/auth/login?path=${pathname}`);
  }

  return (
    <OrganizationProvider>
      <SidebarProvider>
        <AppSidebar teams={data} user={authSession.user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
          </header>
          <div className="p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </OrganizationProvider>
  );
}
