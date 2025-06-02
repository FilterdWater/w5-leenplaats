import { ThemeProvider } from "@/js/components/theme-provider";
import { ModeToggle } from "@/js/components/ui/mode-toggle";
import { Link, Outlet } from "react-router";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="p-4">
        {/* Navigation */}
        <nav className="flex flex-row gap-4 items-center mb-6">
          <ModeToggle />
          <Link to="/" className="text-primary hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-primary hover:underline">
            About
          </Link>
        </nav>

        {/* This is where child routes will be rendered */}
        <main>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
