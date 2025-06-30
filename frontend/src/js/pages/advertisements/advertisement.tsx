import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/js/components/ui/avatar";
import { AppLayout } from "@/js/layouts/app-layout";
import type { BreadcrumbItem } from "@/js/types/app-layout";
import { Heading } from "@/js/components/heading";
import { Button } from "@/js/components/ui/button";
import { BookmarkButton } from "@/js/components/bookmark-button";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { Badge } from "@/js/components/ui/badge";
import { fetchAdvertisements } from "@/js/services/advertisementService";
import { fetchUsers } from "@/js/services/userService";
import type { Advertisement } from "@/js/models/advertisement";
import type { User } from "@/js/models/user";

export function Advertisement() {
  const { id } = useParams<{ id: string }>();
  const advertisementId = id ? parseInt(id, 10) : null;

  const [advertisement, setAdvertisement] = useState<Advertisement | null>(
    null
  );
  const [user, setUser] = useState<User | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (!advertisementId) return;

    async function loadData() {
      try {
        const ads = await fetchAdvertisements();
        const ad = ads.find((a) => a.id === advertisementId);
        setAdvertisement(ad || null);

        if (ad) {
          const users = await fetchUsers();
          const matchedUser = users.find((u) => u.id === ad.user_id);
          setUser(matchedUser || null);

          // You can replace this with a real availability field
          setIsAvailable(true);
        }
      } catch (err) {
        console.error("Failed to load advertisement or user", err);
      }
    }

    loadData();
  }, [advertisementId]);

  const handleBookmark = () => {
    setIsBookmarked((prev) => {
      const newState = !prev;

      // Bookmark toggle log
      console.log(
        `${
          newState ? "Added to" : "Removed from"
        } notification list: advertisement ${advertisementId}`
      );

      return newState;
    });
  };

  // Fallback UI for invalid or missing ad
  if (!advertisement || !user) {
    return (
      <AppLayout breadcrumbs={[]}>
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Advertentie niet gevonden
          </h1>
          <p className="text-muted-foreground mb-6">
            De advertentie die je zoekt bestaat niet of is niet meer
            beschikbaar.
          </p>
          <Button asChild>
            <Link to="/advertisements">Terug naar advertenties</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Advertisements", href: "/advertisements" },
    { title: advertisement.title, href: `/advertisements/${advertisement.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="outline" className="mb-4" asChild>
            <Link to="/advertisements">
              <ArrowLeft />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-lg relative">
            <img
              src={advertisement.imageUrl}
              alt={advertisement.title}
              className={`w-full h-full object-cover ${
                !isAvailable ? "grayscale opacity-60" : ""
              }`}
            />
            {/* Availability badge */}
            <div className="absolute top-3 left-3">
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                  isAvailable ? "bg-emerald-500" : "bg-red-500"
                } text-white`}
              >
                {isAvailable ? "Beschikbaar" : "Niet beschikbaar"}
              </div>
            </div>
          </div>

          {/* Details section */}
          <div className="space-y-6">
            {/* Title & Description */}
            <Heading
              title={advertisement.title}
              description={advertisement.description}
            />

            {/* Price */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-700">
                €{advertisement.price} per dag
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {advertisement.categories?.map((category) => (
                <Badge key={category.id} variant="secondary">
                  <Tag className="w-3 h-3 mr-1" />
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* User Info */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                {/* Avatar (fallback included) */}
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={user.profile_picture}
                    alt="Profile Picture"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-semibold w-12 h-12 rounded-full object-cover">
                    {user.first_name.charAt(0)}
                    {user.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* Name and city */}
                <div>
                  <p className="font-medium">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {user.city}
                  </p>
                </div>
              </div>
            </div>

            {/* Created at */}
            <div className="text-sm text-muted-foreground flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Geplaatst op{" "}
              {new Date(advertisement.created_at).toLocaleDateString("nl-NL")}
            </div>

            {/* Rent / Bookmark section */}
            <div className="space-y-3">
              {isAvailable ? (
                <Button className="w-full" size="lg">
                  Huren
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button className="flex-1" size="lg" disabled>
                    Niet beschikbaar
                  </Button>
                  <BookmarkButton
                    isBookmarked={isBookmarked}
                    onToggle={handleBookmark}
                    variant="full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
