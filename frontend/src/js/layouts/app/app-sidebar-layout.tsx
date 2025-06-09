import { AppContent } from "@/js/components/app-content";
import { AppShell } from "@/js/components/app-shell";
import { AppSidebar } from "@/js/components/app-sidebar";
import { AppSidebarHeader } from "@/js/components/app-sidebar-header";
import { type BreadcrumbItem } from "@/js/types/app-layout";
import { type PropsWithChildren } from "react";

export function AppSidebarLayout({
  children,
  breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar" className="overflow-x-hidden">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </AppShell>
  );
}
