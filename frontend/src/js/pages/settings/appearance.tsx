import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppearanceTabs } from "@/js/components/appearance-tabs";
import { HeadingSmall } from "@/js/components/heading-small";
import { type BreadcrumbItem } from "@/js/types/app-layout";
import { AppLayout } from "@/js/layouts/app-layout";
import { SettingsLayout } from "@/js/layouts/settings/layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Appearance settings",
    href: "/settings/appearance",
  },
];

export function Appearance() {
  useDocumentTitle(
    "Appearance settings",
    "Settings to change the appearance of the application"
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Appearance settings"
            description="Update your appearance settings"
          />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
