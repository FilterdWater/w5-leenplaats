import { useEffect, useState } from "react";
import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import type { BreadcrumbItem } from "@/js/types/app-layout";
import { AdvertisementCard } from "@/js/widgets/advertisement-card";
import { Heading } from "@/js/components/heading";
import { Button } from "@/js/components/ui/button";
import { Link } from "react-router";
import { fetchAdvertisements } from "@/js/services/advertisementService";
import { fetchUsers } from "@/js/services/userService";
import type { Advertisement } from "@/js/models/advertisement";
import type { User } from "@/js/models/user";
import { useLocation } from "react-router";
import {
  removeFromBookmark,
  addToBookmark,
  fetchBookmarks,
} from "@/js/services/bookmarkService";

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

  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<number>>(
    new Set()
  );

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search")?.toLowerCase() || "";

  useEffect(() => {
    async function loadData() {
      try {
        const [ads, fetchedUsers] = await Promise.all([
          fetchAdvertisements(),
          fetchUsers(),
        ]);

        setAdvertisements(ads);
        setUsers(fetchedUsers);

        const token = localStorage.getItem("token");
        if (token) {
          try {
            const bookmarks = await fetchBookmarks();
            const bookmarkedIds = new Set(
              (bookmarks.data as Advertisement[]).map((ad) => ad.id)
            );
            setBookmarkedItems(bookmarkedIds);
          } catch (bookmarkError) {
            console.error("Failed to fetch bookmarks:", bookmarkError);
            // Continue without bookmarks if fetching fails
          }
        } else {
          setBookmarkedItems(new Set());
        }
      } catch (err) {
        console.error("Data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleBookmark = async (advertisementId: number) => {
    const isCurrentlyBookmarked = bookmarkedItems.has(advertisementId);

    try {
      if (isCurrentlyBookmarked) {
        await removeFromBookmark(advertisementId);
        setBookmarkedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(advertisementId);
          return newSet;
        });
      } else {
        await addToBookmark(advertisementId);
        setBookmarkedItems((prev) => {
          const newSet = new Set(prev);
          newSet.add(advertisementId);
          return newSet;
        });
      }
    } catch (error) {
      console.error("Fout bij bookmark update:", error);
      // Optioneel: toon feedback aan gebruiker
    }
  };

  const filteredAds = advertisements.filter((ad) =>
    ad.title.toLowerCase().includes(searchQuery)
  );

  return (
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

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAds.map((advertisement) => {
              const user = users.find((u) => u.id === advertisement.user_id);

              if (!user) return null;

              return (
                <AdvertisementCard
                  key={advertisement.id}
                  advertisement={advertisement}
                  user={user}
                  isBookmarked={bookmarkedItems.has(advertisement.id)}
                  onBookmark={() => handleBookmark(advertisement.id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
