import { useEffect, useState } from "react";
import { AdvertisementCard } from "@/js/widgets/advertisement-card";
import type { Advertisement } from "@/js/models/advertisement";
import { fetchBookmarks } from "@/js/services/bookmarkService";
import { AppLayout } from "@/js/layouts/app-layout";
import { useDocumentTitle } from "@/js/hooks/use-document-title";
import type { BreadcrumbItem } from "@/js/types/app-layout";
import { Heading } from "@/js/components/heading";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Bookmark",
    href: "/bookmark",
  },
];

export function Bookmarks() {
  useDocumentTitle(
    "Bookmarks",
    "Op deze pagina kun je alles bekijken wat je hebt ge-bookmarked"
  );
  const [bookmarks, setBookmarks] = useState<Advertisement[]>([]);

  useEffect(() => {
    fetchBookmarks().then((response) => {
      if (response.success) {
        setBookmarks(response.data as Advertisement[]);
      }
    });
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Heading
            title="Bookmarks"
            description="Op deze pagina kun je alles bekijken wat je hebt ge-bookmarked"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bookmarks.map((ad) => (
            <AdvertisementCard key={ad.id} advertisement={ad} user={ad.user} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
