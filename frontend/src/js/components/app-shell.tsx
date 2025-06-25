import { SidebarProvider } from "@/js/components/ui/sidebar";
import { createContext, useContext } from "react";
import type { User } from "@/js/models/user";

// Create a context for shared data if needed
interface SharedData {
  sidebarOpen?: boolean;
  auth?: {
    user?: User;
  };
  // Add other shared properties as needed
}

const SharedDataContext = createContext<SharedData>({
  sidebarOpen: true,
  auth: undefined,
});

interface AppShellProps {
  children: React.ReactNode;
  variant?: "header" | "sidebar";
  sharedData?: SharedData;
}

export function AppShell({
  children,
  variant = "header",
  sharedData = { sidebarOpen: true },
}: AppShellProps) {
  const isOpen = sharedData.sidebarOpen;

  if (variant === "header") {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>;
  }

  return (
    <SharedDataContext.Provider value={sharedData}>
      <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>
    </SharedDataContext.Provider>
  );
}

// Hook to use shared data in child components
export const useSharedData = () => useContext(SharedDataContext);
