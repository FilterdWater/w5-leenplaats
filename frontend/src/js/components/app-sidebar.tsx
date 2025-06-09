import { NavFooter } from "@/js/components/nav-footer";
import { NavMain } from "@/js/components/nav-main";
import { NavUser } from "@/js/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/js/components/ui/sidebar";
import { type NavItem } from "@/js/types/app-layout";
import { Link } from "react-router";
import { Home } from "lucide-react";
import { AppLogo } from "./app-logo";

const mainNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
];

const footerNavItems: NavItem[] = [
  // {
  //   title: "Repository",
  //   href: "https://github.com/laravel/react-starter-kit",
  //   icon: Folder,
  // },
  // {
  //   title: "Documentation",
  //   href: "https://laravel.com/docs/starter-kits#react",
  //   icon: BookOpen,
  // },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
