import { auth } from "@repo/cent-auth";
import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { CreateOrganizationForm } from "./organization/create/create-organization-form";
import { OrganizationProvider } from "@/components/organization-provider";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/shadcn/breadcrumb";
import { Separator } from "@repo/ui/components/shadcn/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/shadcn/sidebar";

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

  const data = await auth.api.listOrganizations({ headers });

  return (
    <OrganizationProvider>
      <SidebarProvider>
        <AppSidebar teams={data} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </OrganizationProvider>
  );
}
