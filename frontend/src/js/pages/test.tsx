import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import { type BreadcrumbItem } from "@/js/types/app-layout";
import { AdvertisementCard } from "@/js/widgets/advertisement-card";
import { fetchAdvertisements } from "../services/advertisementService";
import { Button } from "../components/ui/button";
import { fetchCategories } from "../services/categoryService";

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
      <div className="grid grid-cols-2">
        <Button onClick={fetchCategories}>Fetch</Button>
      </div>
    </AppLayout>
  );
}
