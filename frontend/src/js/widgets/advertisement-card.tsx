import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/js/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/js/components/ui/avatar";
import { Badge } from "@/js/components/ui/badge";
import { BookmarkButton } from "@/js/components/bookmark-button";
import type { Advertisement } from "../models/advertisement";
import type { User } from "@/js/models/user";
import { Link } from "react-router";

type AdvertisementCardProps = {
  advertisement: Advertisement;
  user: User;
  isBookmarked?: boolean;
  onBookmark?: () => void;
};

export function AdvertisementCard({
  advertisement,
  user,
  isBookmarked = false,
  onBookmark,
}: AdvertisementCardProps) {
  const {
    title,
    description,
    categories,
    price,
    pictures = [],
  } = advertisement;
  const { first_name, last_name, profile_picture } = user;

  const isAvailable = !advertisement.is_rented;

  return (
    <Card className="group w-full max-w-sm bg-card transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-0 overflow-hidden p-0">
      {/* Image Header */}
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="relative h-52 bg-muted">
          <Link to={`/advertisements/${advertisement.id}`}>
            {pictures.length > 0 ? (
              <img
                src={pictures[0].picture_base_string}
                alt={title}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                  !isAvailable ? "grayscale opacity-60" : ""
                }`}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                Geen afbeelding
              </div>
            )}
          </Link>

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

          {/* Bookmark Button */}
          {localStorage.getItem("token") && onBookmark && (
            <div className="absolute top-3 right-3">
              <BookmarkButton
                isBookmarked={isBookmarked}
                onToggle={onBookmark}
                variant="icon"
              />
            </div>
          )}
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="space-y-2">
        {/* Title */}
        <div>
          <CardTitle className="text-xl font-bold text-card-foreground line-clamp-2 leading-tight">
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
            {description}
          </CardDescription>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          {categories?.slice(0, 3).map((cat) => (
            <Badge
              key={cat.id}
              variant="secondary"
              className="text-xs px-2.5 py-0.5 font-medium bg-secondary text-secondary-foreground"
            >
              {cat.name}
            </Badge>
          ))}
          {categories && categories.length > 3 && (
            <Badge
              variant="secondary"
              className="text-xs px-2.5 py-0.5 font-medium bg-secondary text-secondary-foreground"
            >
              +{categories.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-5 py-4 bg-muted/50 border-t border-border">
        <div className="flex items-center justify-between w-full gap-3">
          {/* User Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar className="size-8 flex-shrink-0">
              <AvatarImage src={profile_picture} alt="Profile Picture" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-semibold">
                {first_name.charAt(0)}
                {last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-card-foreground truncate">
                {first_name} {last_name}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="text-right flex-shrink-0">
            <div className="flex items-baseline gap-1">
              <span
                className={`text-2xl font-bold ${
                  isAvailable
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                }`}
              >
                €{price}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                /dag
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
