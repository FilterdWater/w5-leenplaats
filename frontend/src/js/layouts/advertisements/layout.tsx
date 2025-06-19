import { Heading } from "@/js/components/heading";
import { Button } from "@/js/components/ui/button";
import { Separator } from "@/js/components/ui/separator";
import { cn } from "@/js/lib/utils";
import { type NavItem } from "@/js/types/app-layout";
import { Link } from "react-router";
import { type PropsWithChildren } from "react";

const sidebarNavItems: NavItem[] = [
  {
    title: "Create",
    href: "/advertisements/create",
    icon: null,
  },
];

export function AdvertisementsLayout({ children }: PropsWithChildren) {
  // When server-side rendering, we only render the layout on the client...
  if (typeof window === "undefined") {
    return null;
  }

  const currentPath = window.location.pathname;

  return (
    <div className="px-4 py-6">
      <Heading
        title="Advertisements"
        description="Make & manage your items available to borrow"
      />

      <div className="flex flex-col space-y-8 sm:flex-row sm:space-y-0 sm:space-x-12">
        <aside className="w-full max-w-xl sm:w-48">
          <nav className="flex flex-col space-y-1 space-x-0">
            {sidebarNavItems.map((item, index) => (
              <Button
                key={`${item.href}-${index}`}
                size="sm"
                variant="ghost"
                asChild
                className={cn("w-full justify-start", {
                  "bg-muted": currentPath === item.href,
                })}
              >
                <Link to={item.href} prefetch="intent">
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>

        <Separator className="my-6 sm:hidden" />

        <div className="flex-1 sm:max-w-2xl">
          <section className="max-w-xl space-y-12">{children}</section>
        </div>
      </div>
    </div>
  );
}
