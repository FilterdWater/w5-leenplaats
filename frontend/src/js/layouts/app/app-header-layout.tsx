import { AppContent } from "@/js/components/app-content";
import { AppHeader } from "@/js/components/app-header";
import { AppShell } from "@/js/components/app-shell";
import { type BreadcrumbItem } from "@/js/types/app-layout";
import type { PropsWithChildren } from "react";

export function AppHeaderLayout({
  children,
  breadcrumbs,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell>
      <AppHeader breadcrumbs={breadcrumbs} />
      <AppContent>{children}</AppContent>
    </AppShell>
  );
}
