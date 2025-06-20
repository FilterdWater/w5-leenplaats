import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/js/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/js/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/js/components/ui/avatar";
import { useIsMobile } from "@/js/hooks/use-mobile";
import { ChevronsUpDown, UserRound } from "lucide-react";
import { Link } from "react-router";
import { useUser } from "@/js/context/UserContext";

export function NavUser() {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  const { user } = useUser();

  console.log(user);

  // If no user is authenticated, show a guest state
  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="group text-sidebar-accent-foreground"
            asChild
          >
            <Link to="/auth/login">
              <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                  <UserRound className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">user?.first_name</span>
                <span className="truncate text-xs text-muted-foreground">
                  Click to login
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // If user is authenticated, show the dropdown menu
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
            >
              {/* <UserInfo user={user.first_name} /> */}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="end"
            side={
              isMobile ? "bottom" : state === "collapsed" ? "left" : "bottom"
            }
          >
            {/* <UserMenuContent user={user.email} /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
