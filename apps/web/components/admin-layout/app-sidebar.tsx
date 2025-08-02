"use client";

import * as React from "react";
import { Frame, Map, Newspaper, PieChart } from "lucide-react";

import { NavMain } from "@/components/admin-layout/nav-main";
import { NavUser } from "@/components/admin-layout/nav-user";
import { TeamSwitcher } from "@/components/admin-layout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@repo/ui/components/shadcn/sidebar";
import { Organization } from "better-auth/plugins/organization";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Blogs",
      url: "#",
      icon: Newspaper,
      isActive: true,
      items: [
        {
          title: "Articles",
          url: "#",
        },
        {
          title: "Editor",
          url: "/cent-admin/blog/editor",
        },
        {
          title: "Tags",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({
  teams,
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  teams: Organization[];
  user: {
    id: string;
    name: string;
    emailVerified: boolean;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined | undefined;
  };
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
