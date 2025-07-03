import { AppearanceTabs } from "@/js/components/appearance-tabs";
import { Breadcrumbs } from "@/js/components/breadcrumbs";
import { Icon } from "@/js/components/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/js/components/ui/avatar";
import { Button } from "@/js/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/js/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/js/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/js/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/js/components/ui/sheet";
import { UserMenuContent } from "@/js/components/user-menu-content";
import { useInitials } from "@/js/hooks/use-initials";
import { cn } from "@/js/lib/utils";
import { type BreadcrumbItem, type NavItem } from "@/js/types/app-layout";
import { Link, useLocation } from "react-router";
import { Menu, UserRound, LoaderCircle, View, Bookmark } from "lucide-react";
import { AppLogo } from "./app-logo";
import { AppLogoIcon } from "./app-logo-icon";
import { useUser } from "@/js/context/UserContext";
import { SearchAdvertisements } from "@/js/components/search-advertisements";

const mainNavItems: NavItem[] = [
  {
    title: "Advertisements",
    href: "/advertisements",
    icon: View,
  },
  {
    title: "Bookmarks",
    href: "/bookmarks",
    icon: Bookmark,
  },
];

const activeItemStyles =
  "text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100";

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  const location = useLocation();
  const getInitials = useInitials();
  const { user, isLoggedIn, isLoading } = useUser();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="border-sidebar-border/80 border-b">
        <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
          <Link to="/" className="flex items-center space-x-2">
            <AppLogo />
          </Link>
          <div className="ml-auto flex items-center space-x-2">
            <LoaderCircle className="h-5 w-5 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border-sidebar-border/80 border-b">
        <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 h-[34px] w-[34px]"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-sidebar flex h-full w-64 flex-col items-stretch justify-between"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetHeader className="flex justify-start text-left">
                  <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                </SheetHeader>
                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                  <div className="flex h-full flex-col justify-between text-sm">
                    <div className="flex flex-col space-y-4">
                      {mainNavItems.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="flex items-center space-x-2 font-medium"
                        >
                          {item.icon && (
                            <Icon iconNode={item.icon} className="h-5 w-5" />
                          )}
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link to="/" className="flex items-center space-x-2">
            <AppLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
            <NavigationMenu className="flex h-full items-stretch">
              <NavigationMenuList className="flex h-full items-stretch space-x-2">
                {mainNavItems.map((item, index) => (
                  <NavigationMenuItem
                    key={index}
                    className="relative flex h-full items-center"
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === item.href && activeItemStyles,
                        "h-9 cursor-pointer px-3"
                      )}
                    >
                      {item.icon && (
                        <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />
                      )}
                      {item.title}
                    </Link>
                    {location.pathname === item.href && (
                      <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="ml-auto flex items-center space-x-2">
            <div className="relative flex items-center space-x-1">
              <SearchAdvertisements />
            </div>
            {isLoggedIn ? (
              // Logged-in user: show avatar + dropdown menu
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="size-10 rounded-full p-1">
                    <Avatar className="size-8 overflow-hidden rounded-full">
                      <AvatarImage
                        src={user?.profile_picture}
                        alt={user?.first_name}
                      />
                      <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {user?.first_name ? getInitials(user.first_name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <UserMenuContent user={user!} />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Guest user: show avatar + dialog prompt
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="size-10 rounded-full p-1">
                    <Avatar className="size-8 overflow-hidden rounded-full">
                      <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        <UserRound />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>You're not logged in</DialogTitle>
                    <DialogDescription>
                      You can sign up for an account, login or close this dialog
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-between gap-3 sm:flex-row-reverse">
                    <div className="flex justify-end space-x-2">
                      <Button variant="secondary" asChild>
                        <Link to="/auth/sign-up">Sign up</Link>
                      </Button>
                      <Button asChild>
                        <Link to="/auth/login">Login</Link>
                      </Button>
                    </div>
                    <div className="flex justify-end">
                      <AppearanceTabs />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
      {breadcrumbs.length > 1 && (
        <div className="border-sidebar-border/70 flex w-full border-b">
          <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      )}
    </>
  );
}
