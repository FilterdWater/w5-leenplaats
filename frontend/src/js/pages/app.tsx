import { ThemeProvider } from "@/js/components/theme-provider";
import { Toaster } from "@/js/components/ui/sonner";
import { Outlet } from "react-router";
import { UserProvider } from "@/js/context/UserContext";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        <Outlet />
        <Toaster position="top-center" />
      </UserProvider>
    </ThemeProvider>
  );
}
