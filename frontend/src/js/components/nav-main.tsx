import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/js/components/ui/sidebar";
import { type NavItem } from "@/js/types/app-layout";
import { Link, useLocation } from "react-router";

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const location = useLocation();

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={location.pathname.startsWith(item.href)}
              tooltip={{ children: item.title }}
            >
              <Link to={item.href}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
