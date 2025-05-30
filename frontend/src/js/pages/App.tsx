import { ThemeProvider } from "@/js/components/theme-provider";
import { ModeToggle } from "@/js/components/ui/mode-toggle";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="p-4 flex flex-row gap-4 items-center">
          <div className="bg-background text-foreground">Hello frontend!</div>
          <ModeToggle />
        </div>
      </ThemeProvider>
    </>
  );
}
