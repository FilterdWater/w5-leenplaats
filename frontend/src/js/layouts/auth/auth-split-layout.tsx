import { AppLogoIcon } from "@/js/components/app-logo-icon";
import { Link } from "react-router";
import { type PropsWithChildren } from "react";

interface AuthLayoutProps {
  title?: string;
  description?: string;
  appName?: string;
  quote?: {
    message: string;
    author: string;
  };
}

export function AuthSplitLayout({
  children,
  title = "Default title",
  description = "Default description",
  appName = "Default appName",
  quote = {
    message: "Default message.",
    author: "Default author",
  },
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className=" lg:grid h-dvh flex flex-col items-center justify-center px-6 sm:px-0 lg:max-w-none lg:grid-cols-2">
      <div className=" hidden h-full flex-col bg-muted p-10 lg:flex dark:border-r">
        <Link to="/" className=" z-20 flex items-center text-lg font-medium">
          <AppLogoIcon className="mr-2 size-8 fill-current" />
          {appName}
        </Link>
        {quote && (
          <div className=" z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
              <footer className="text-sm">{quote.author}</footer>
            </blockquote>
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Link
            to="/"
            className=" z-20 flex items-center justify-center lg:hidden"
          >
            <AppLogoIcon className="size-10" />
          </Link>
          <div className="flex flex-col pt-8 space-y-2 items-center text-center">
            <h1 className="text-2xl font-medium">{title}</h1>
            <p className="text-sm text-balance text-muted-foreground">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
