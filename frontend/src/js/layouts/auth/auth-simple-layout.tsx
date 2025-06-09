import { AppLogoIcon } from "@/js/components/app-logo-icon";
import { Link } from "react-router";
import { type PropsWithChildren } from "react";

interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;
}

export function AuthSimpleLayout({
  children,
  title = "Default title",
  description = "Default description",
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-6">
            <Link to="/" className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center">
                <AppLogoIcon className="size-10" />
              </div>
            </Link>

            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-medium pt-8">{title}</h1>
              <p className="text-center text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
          <div className="py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
