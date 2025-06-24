import { useState } from "react";
import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import type { BreadcrumbItem } from "@/js/types/app-layout";
import { AdvertisementCard } from "@/js/widgets/advertisement-card";
import { Heading } from "@/js/components/heading";
import { Button } from "@/js/components/ui/button";
import { Link } from "react-router";
import {
  sampleAdvertisements,
  sampleAvailabilityStatus,
  getUserById,
} from "@/js/dummy-data/ad-data";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Advertisements",
    href: "/advertisements",
  },
];

export function Advertisements() {
  useDocumentTitle(
    "Advertisements",
    "On this page you can view everything people have made available to lend"
  );

  // State to track bookmarked advertisements
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<number>>(
    new Set()
  );

  const handleBookmark = (advertisementId: number) => {
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(advertisementId)) {
        newSet.delete(advertisementId);
        console.log(
          `Removed from notification list: advertisement ${advertisementId}`
        );
      } else {
        newSet.add(advertisementId);
        console.log(
          `Added to notification list: advertisement ${advertisementId}`
        );
      }
      return newSet;
    });
  };

  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-end">
            <Button asChild>
              <Link to="create">Create Ad</Link>
            </Button>
          </div>
          <div className="mb-8">
            <Heading
              title="Beschikbare Items"
              description="Ontdek wat anderen beschikbaar hebben gesteld om te lenen"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleAdvertisements.map((advertisement) => {
              const user = getUserById(advertisement.userId);
              if (!user) return null;

              const isAvailable =
                sampleAvailabilityStatus[advertisement.id] ?? true;

              return (
                <AdvertisementCard
                  key={advertisement.id}
                  advertisement={advertisement}
                  user={user}
                  isBookmarked={bookmarkedItems.has(advertisement.id)}
                  isAvailable={isAvailable}
                  onBookmark={() => handleBookmark(advertisement.id)}
                />
              );
            })}
          </div>
        </div>
      </AppLayout>
    </>
  );
}
