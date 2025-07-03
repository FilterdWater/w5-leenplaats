import { Button } from "@/js/components/ui/button";
import { Bookmark } from "lucide-react";

type BookmarkButtonVariant = "icon" | "full";

type BookmarkButtonProps = {
  isBookmarked: boolean;
  onToggle: () => void;
  variant?: BookmarkButtonVariant;
  className?: string;
  disabled?: boolean;
};

export function BookmarkButton({
  isBookmarked,
  onToggle,
  variant = "icon",
  className = "",
  disabled = false,
}: BookmarkButtonProps) {
  const handleClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onToggle();
  };

  const bookmarkedTitle = "Verwijder van bookmarks";
  const unbookmarkedTitle = "Voeg toe aan bookmarks";

  if (variant === "icon") {
    return (
      <Button
        className={`rounded-full size-9 border-0 transition-all hover:scale-110 hover:bg-background ${className}`}
        variant="secondary"
        onClick={handleClick}
        disabled={disabled}
        title={isBookmarked ? bookmarkedTitle : unbookmarkedTitle}
      >
        {isBookmarked ? (
          <Bookmark className="h-4 w-4 text-emerald-600 dark:text-emerald-400 fill-green-500" />
        ) : (
          <Bookmark className="h-4 w-4 text-foreground" />
        )}
      </Button>
    );
  }

  // Full variant with text
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center gap-2 ${className}`}
      title={isBookmarked ? bookmarkedTitle : unbookmarkedTitle}
    >
      {isBookmarked ? (
        <>
          <Bookmark className="h-4 w-4 text-emerald-600 dark:text-emerald-400 fill-green-500" />
          <div className="text-emerald-600 dark:text-emerald-400">Bookmark</div>
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" />
          Bookmark
        </>
      )}
    </Button>
  );
}
