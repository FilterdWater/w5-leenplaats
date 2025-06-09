import { AppLogoIcon } from "@/js/components/app-logo-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/js/components/ui/card";
import { Link } from "react-router";
import { type PropsWithChildren } from "react";

interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;
}

export function AuthCardLayout({
  children,
  title = "Default title",
  description = "Default description",
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-4">
      <div className="flex w-full max-w-md flex-col gap-8">
        <Link to="/" className="flex justify-center">
          <AppLogoIcon className="size-10" />
        </Link>

        <div className="flex flex-col">
          <Card className="rounded-xl px-4">
            <CardHeader className="pt-8 space-y-2 text-center">
              <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="py-8">{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
