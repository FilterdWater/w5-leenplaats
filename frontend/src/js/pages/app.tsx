import { ThemeProvider } from "@/js/components/theme-provider";
import { Outlet } from "react-router";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
}
