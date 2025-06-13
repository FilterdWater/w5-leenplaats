import { Button } from "@/js/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/js/components/ui/card";
import { Avatar, AvatarFallback } from "@/js/components/ui/avatar";
import { Bookmark, UserRound } from "lucide-react";
import { Badge } from "@/js/components/ui/badge";
import type { Advertisement } from "../models/advertisement";

type AdvertisementCardProps = {
  advertisement: Advertisement;
  onBookmark?: () => void;
};

export function AdvertisementCard({
  advertisement,
  onBookmark,
}: AdvertisementCardProps) {
  const { imageUrl, title, description, categories } = advertisement;
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md p-0 gap-0 z-0 overflow-hidden">
      <CardHeader className="p-0 gap-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-contain bg-gray-50"
        />
      </CardHeader>

      <CardContent className="pl-3.5 pr-2.5 pt-2 rounded-t-2xl shadow -mt-2 z-10 bg-zinc-50 border-t-2">
        {/* Title & description */}
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>

          {/* BookmarkButton */}
          <Button
            className="rounded-full size-8 border-2"
            variant="secondary"
            onClick={onBookmark}
          >
            <Bookmark />
          </Button>
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>

        {/* Category */}
        <div className="flex flex-wrap gap-2 mt-2">
          {categories?.map((cat) => (
            <Badge key={cat.id}>{cat.name}</Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-3 px-4 py-4 z-10 bg-zinc-50">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-neutral-200 dark:bg-neutral-700">
            <UserRound className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex justify-between items-start w-full">
          <div>
            <p className="font-semibold">Gepost door Jan Jansen</p>
          </div>
          <p className="text-green-600 font-semibold text-base">€ 39,99/ Dag</p>
        </div>
      </CardFooter>
    </Card>
  );
}

// const getBadgeVariant = (name: string) => {
//   switch (name.toLowerCase()) {
//     case "sale":
//       return "destructive";
//     case "nieuw":
//       return "default";
//     case "voorraad":
//       return "secondary";
//     default:
//       return "outline";
//   }
// };

// {categories?.map(cat => (
//   <Badge key={cat.id} variant={getBadgeVariant(cat.name)}>
//     {cat.name}
//   </Badge>
// ))}
