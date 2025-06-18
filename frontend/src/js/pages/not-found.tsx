import { Home, ArrowLeft } from "lucide-react";
import { ThemeProvider } from "@/js/components/theme-provider";
import { ModeToggle } from "@/js/components/ui/mode-toggle";
import { Button } from "@/js/components/ui/button";

export const NotFound = () => {
  const handleGoBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to home if no history
      window.location.href = "/";
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>

        <div className="text-center space-y-12">
          {/* Error code with subtle styling */}
          <div className="space-y-2">
            <div className="text-8xl font-bold text-muted-foreground/20 leading-none">
              404
            </div>
            <h1 className="text-2xl font-semibold text-foreground leading-none">
              Page not found
            </h1>
          </div>

          {/* Action buttons with better spacing */}
          <div className="flex flex-row gap-4 justify-center items-center">
            <Button onClick={handleGoHome}>
              <Home />
              Go Home
            </Button>

            <Button variant="outline" onClick={handleGoBack}>
              <ArrowLeft />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
