import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import { type BreadcrumbItem } from "@/js/types/app-layout";
// import { useAuth } from "@/js/pages/app";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Home",
    href: "/",
  },
];

export function Index() {
  // const { user } = useAuth();

  // Use custom hook for document title
  useDocumentTitle("Home", "Home page");

  // const sharedData = {
  //   sidebarOpen: true,
  //   auth: { user },
  // };

  return (
    // <AppLayout breadcrumbs={breadcrumbs} sharedData={sharedData}>
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4">Hello world</div>
    </AppLayout>
  );
}
