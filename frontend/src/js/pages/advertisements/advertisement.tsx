import { useState } from "react";
import { useParams, Link } from "react-router";
import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import type { BreadcrumbItem } from "@/js/types/app-layout";
import { Heading } from "@/js/components/heading";
import { Button } from "@/js/components/ui/button";
import { BookmarkButton } from "@/js/components/bookmark-button";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { Badge } from "@/js/components/ui/badge";
import {
  getAdvertisementWithUser,
  sampleAvailabilityStatus,
} from "@/js/dummy-data/ad-data";

export function Advertisement() {
  const { id } = useParams<{ id: string }>();

  // Convert string ID to number and get advertisement with user
  const advertisementId = id ? parseInt(id, 10) : null;
  const data = advertisementId
    ? getAdvertisementWithUser(advertisementId)
    : null;

  // Get availability status from sample data, default to true if not found
  const isAvailable = advertisementId
    ? sampleAvailabilityStatus[advertisementId] ?? true
    : true;

  // State to track if this advertisement is bookmarked
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const handleBookmark = () => {
    setIsBookmarked((prev) => {
      const newState = !prev;
      if (newState) {
        console.log(
          `Added to notification list: advertisement ${advertisementId}`
        );
      } else {
        console.log(
          `Removed from notification list: advertisement ${advertisementId}`
        );
      }
      return newState;
    });
  };

  // If advertisement not found, show error
  if (!data) {
    return (
      <AppLayout breadcrumbs={[]}>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Advertentie niet gevonden
            </h1>
            <p className="text-gray-600 mb-6">
              De advertentie die je zoekt bestaat niet of is niet meer
              beschikbaar.
            </p>
            <Button asChild>
              <Link to="/advertisements">Terug naar advertenties</Link>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const { advertisement, user } = data;

  // Set page title
  useDocumentTitle(
    advertisement.title,
    `${advertisement.title} - Te leen van ${user.first_name} ${user.last_name}`
  );

  // Create breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Advertisements",
      href: "/advertisements",
    },
    {
      title: advertisement.title,
      href: `/advertisements/${advertisement.id}`,
    },
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

        {/* Main content */}
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
            {/* Availability Badge */}
            <div className="absolute top-3 left-3">
              {isAvailable ? (
                <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Beschikbaar
                </div>
              ) : (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Niet beschikbaar
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Heading
                title={advertisement.title}
                description={advertisement.description}
              />
            </div>

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

            {/* Owner info */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={user.profile_picture}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {user.city}
                  </p>
                </div>
              </div>
            </div>

            {/* Created date */}
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Geplaatst op {advertisement.createdAt.toLocaleDateString("nl-NL")}
            </div>

            {/* Action buttons */}
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
