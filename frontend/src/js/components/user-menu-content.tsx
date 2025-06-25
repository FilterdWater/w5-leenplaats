import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/js/components/ui/dropdown-menu";
import { UserInfo } from "@/js/components/user-info";
import { useMobileNavigation } from "@/js/hooks/use-mobile-navigation";
import { useNavigate } from "react-router";
import { LogOut, Settings } from "lucide-react";
import { useUser } from "@/js/context/UserContext";
import type { User } from "@/js/models/user";

interface UserMenuContentProps {
  user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
  const { setUser } = useUser();

  const cleanup = useMobileNavigation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    cleanup();

    // Replace this with your logout logic
    // For example, call your auth service, clear tokens, etc.
    try {
      // await authService.logout();
      // Clear local storage, cookies, etc.
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSettingsClick = () => {
    cleanup();
    navigate("/settings/profile");
  };

  if (!user) return null;

  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserInfo user={user} showEmail={true} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <button
            className="flex w-full items-center"
            onClick={handleSettingsClick}
          >
            <Settings className="mr-2" />
            Settings
          </button>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <button className="flex w-full items-center" onClick={handleLogout}>
          <LogOut className="mr-2" />
          Log out
        </button>
      </DropdownMenuItem>
    </>
  );
}
