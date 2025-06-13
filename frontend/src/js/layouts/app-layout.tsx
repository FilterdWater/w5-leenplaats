import { AppHeaderLayout } from "@/js/layouts/app/app-header-layout";
import { type BreadcrumbItem } from "@/js/types/app-layout";
import { type ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export const AppLayout = ({
  children,
  breadcrumbs,
  ...props
}: AppLayoutProps) => (
  <AppHeaderLayout breadcrumbs={breadcrumbs} {...props}>
    {children}
  </AppHeaderLayout>
);

// import { AppSidebarLayout } from "@/js/layouts/app/app-sidebar-layout";
// import { type BreadcrumbItem } from "@/js/types/app-layout";
// import { type ReactNode } from "react";

// interface AppLayoutProps {
//   children: ReactNode;
//   breadcrumbs?: BreadcrumbItem[];
// }

// export const AppLayout = ({
//   children,
//   breadcrumbs,
//   ...props
// }: AppLayoutProps) => (
//   <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
//     {children}
//   </AppSidebarLayout>
// );
