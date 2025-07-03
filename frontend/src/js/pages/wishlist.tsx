import { useEffect, useState } from "react";
import { AdvertisementCard } from "@/js/widgets/advertisement-card";
import type { Advertisement } from "@/js/models/advertisement";
import { fetchWishlist } from "@/js/services/wishlistService";
import { AppLayout } from "@/js/layouts/app-layout";
import { useDocumentTitle } from "@/js/hooks/use-document-title";
import type { BreadcrumbItem } from "@/js/types/app-layout";
import { Heading } from "@/js/components/heading";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Wishlist",
    href: "/wishlist",
  },
];

export function Wishlist() {
  useDocumentTitle(
    "Wishlist",
    "On this page you can view everything you have bookmarked"
  );
  const [wishlist, setWishlist] = useState<Advertisement[]>([]);

  useEffect(() => {
    fetchWishlist().then((response) => {
      if (response.success) {
        setWishlist(response.data as Advertisement[]);
      }
    });
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Heading
            title="My Wishlist"
            description="Discover what you have saved to lend"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((ad) => (
            <AdvertisementCard key={ad.id} advertisement={ad} user={ad.user} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
