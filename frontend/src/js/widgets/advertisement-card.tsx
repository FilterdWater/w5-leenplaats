import { Button } from "@/js/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/js/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/js/components/ui/avatar";
import { Bookmark } from "lucide-react";
import { Badge } from "@/js/components/ui/badge";
import type { Advertisement } from "../models/advertisement";
import type { User } from "../models/user";

type AdvertisementCardProps = {
  advertisement: Advertisement;
  user: User;
  onBookmark?: () => void;
};

export function AdvertisementCard({
  advertisement,
  user,
  onBookmark,
}: AdvertisementCardProps) {
  const { imageUrl, title, description, categories, price } = advertisement;
  const { first_name, last_name, profile_picture } = user;

  return (
    <Card className="group w-full max-w-sm bg-card transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-0 overflow-hidden p-0">
      {/* Image Header */}
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="relative h-52 bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Bookmark Button - Floating */}
          <Button
            className="absolute top-3 right-3 rounded-full size-9 border-0 transition-all duration-200 backdrop-blur-sm"
            variant="secondary"
            onClick={onBookmark}
          >
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-5 space-y-4">
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
              className="text-xs px-2.5 py-0.5 font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              {cat.name}
            </Badge>
          ))}
          {categories && categories.length > 3 && (
            <Badge
              variant="secondary"
              className="text-xs px-2.5 py-0.5 font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              +{categories.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-5 py-4 bg-muted/50 border-t border-border">
        <div className="flex items-center justify-between w-full">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
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
              <p className="text-xs text-muted-foreground">Verhuurder</p>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
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
