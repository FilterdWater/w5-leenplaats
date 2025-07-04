import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/js/components/ui/avatar";
import { AppLayout } from "@/js/layouts/app-layout";
import type { BreadcrumbItem } from "@/js/types/app-layout";
import { Heading } from "@/js/components/heading";
import { Button } from "@/js/components/ui/button";
import { BookmarkButton } from "@/js/components/bookmark-button";
import { ArrowLeft, Calendar as CalendarIcon, MapPin, Tag } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/js/components/ui/popover";
import { Calendar } from "@/js/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/js/lib/utils";
import { Badge } from "@/js/components/ui/badge";
import { fetchAdvertisements } from "@/js/services/advertisementService";
import { fetchUsers } from "@/js/services/userService";
import type { Advertisement } from "@/js/models/advertisement";
import type { User } from "@/js/models/user";
import {
  addToBookmark,
  fetchBookmarks,
  removeFromBookmark,
} from "@/js/services/bookmarkService";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/js/components/ui/carousel";
import { API_BASE_URL } from "@/js/config";

export function Advertisement() {
  const { id } = useParams<{ id: string }>();
  const advertisementId = id ? parseInt(id, 10) : null;

  const [advertisement, setAdvertisement] = useState<Advertisement | null>(
    null
  );
  const [user, setUser] = useState<User | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

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
          setIsAvailable(!ad.is_rented);
        }

        // **Fetch bookmark en check bookmark status**
        const bookmarkAdsResponse = await fetchBookmarks();

        if (bookmarkAdsResponse.success && bookmarkAdsResponse.data) {
          const isInBookmark = bookmarkAdsResponse.data.some(
            (bookmarkAd: Advertisement) => bookmarkAd.id === advertisementId
          );
          setIsBookmarked(isInBookmark);
        } else {
          setIsBookmarked(false);
        }
      } catch (err) {
        console.error("Failed to load advertisement or user", err);
      }
    }

    loadData();
  }, [advertisementId]);

  const handleBookmark = async () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);

    try {
      if (newState) {
        const response = await addToBookmark(advertisementId!);
        toast(response.message);
      } else {
        const response = await removeFromBookmark(advertisementId!);
        toast(response.message);
      }
    } catch (error) {
      console.error("Fout bij bookmark:", error);
      setIsBookmarked(!newState); // revert state bij error
    }
  };

  const handleRent = async () => {
    if (!advertisementId || !startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to rent an advertisement.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/rentals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          advertisement_id: advertisementId,
          start_date: format(startDate, "yyyy-MM-dd"),
          end_date: format(endDate, "yyyy-MM-dd"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        // Optionally, update UI to reflect the rental (e.g., disable rent button)
        setIsAvailable(false); // Mark as unavailable after successful rental
      } else {
        toast.error(data.message || "Failed to submit rental request.");
      }
    } catch (error) {
      console.error("Error submitting rental request:", error);
      toast.error("An unexpected error occurred.");
    }
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
        <div className="mb-6">
          <Button variant="outline" className="mb-4" asChild>
            <Link to="/advertisements">
              <ArrowLeft />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <Carousel className="w-full">
            <CarouselContent>
              {advertisement.pictures?.map((picture, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square overflow-hidden rounded-lg relative">
                    <img
                      src={picture.picture_base_string}
                      alt={`${advertisement.title} - Image ${index + 1}`}
                      className={`w-full h-full object-cover ${
                        !isAvailable ? "grayscale opacity-60" : ""
                      }`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>

          {/* Details section */}
          <div className="space-y-6">
            {/* Title & Description */}
            <Heading
              title={advertisement.title}
              description={advertisement.description}
            />

            <div className="bg-green-50 border border-green-200 flex-row flex items-center justify-between rounded-lg p-4">
              <div className="text-2xl font-bold text-green-700">
                €{advertisement.price} per dag
              </div>
              {/* Availability badge */}
              <div
                className={`px-3 py-1 rounded-md text-xs font-semibold ${
                  isAvailable ? "bg-emerald-500" : "bg-red-500"
                } text-white`}
              >
                {isAvailable ? "Beschikbaar" : "Niet beschikbaar"}
              </div>
            </div>

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

            {/* Created date */}
            <div className="text-sm text-muted-foreground flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Geplaatst op{" "}
              {new Date(advertisement.created_at).toLocaleDateString("nl-NL")}
            </div>

            {/* Rent / Bookmark section */}
            <div className="space-y-3">
              {isAvailable ? (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(!startDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, "PPP")
                          ) : (
                            <span>Start Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(!endDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? (
                            format(endDate, "PPP")
                          ) : (
                            <span>End Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button
                    onClick={handleRent}
                    disabled={!startDate || !endDate}
                  >
                    Huren
                  </Button>
                  {localStorage.getItem("token") && (
                    <BookmarkButton
                      isBookmarked={isBookmarked}
                      onToggle={handleBookmark}
                      variant="full"
                    />
                  )}
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button className="flex-1" size="lg" disabled>
                    Niet beschikbaar
                  </Button>
                  {localStorage.getItem("token") && (
                    <BookmarkButton
                      isBookmarked={isBookmarked}
                      onToggle={handleBookmark}
                      variant="full"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
