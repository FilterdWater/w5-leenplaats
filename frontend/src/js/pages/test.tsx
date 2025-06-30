import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import { type BreadcrumbItem } from "@/js/types/app-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Test",
    href: "/test",
  },
];

export function Test() {
  useDocumentTitle("Test", "Test page");

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-2"></div>
    </AppLayout>
  );
}
