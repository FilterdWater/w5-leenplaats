// React
import { StrictMode } from "react";

// React Router
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

// Global CSS
import "@/css/app.css";

// Default / Main Pages
import { NotFound } from "@/js/pages/not-found";
import { App } from "@/js/pages/app.tsx";
import { Index } from "@/js/pages/index.tsx";

// Auth
import { Login } from "@/js/pages/auth/login.tsx";
import { SignUp } from "@/js/pages/auth/sign-up";

// Settings
import { Profile } from "@/js/pages/settings/profile";
import { Password } from "@/js/pages/settings/password";
import { Appearance } from "@/js/pages/settings/appearance";

// Advertisement
import { Advertisements } from "@/js/pages/advertisements/advertisements";
import { Advertisement } from "@/js/pages/advertisements/advertisement";
import { CreateAd } from "@/js/pages/advertisements/create-ad";

// Bookmark
import { Bookmarks } from "@/js/pages/bookmarks";

// Configuration with nested routes
const router = createBrowserRouter([
  // Root layout
  {
    path: "/",
    Component: App,
    errorElement: <NotFound />,
    children: [
      // Home path
      {
        index: true,
        Component: Index,
      },

      // Auth routes
      {
        path: "auth",
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "sign-up",
            Component: SignUp,
          },
        ],
      },

      // Settings routes
      {
        path: "settings",
        children: [
          {
            path: "profile",
            Component: Profile,
          },
          {
            path: "password",
            Component: Password,
          },
          {
            path: "appearance",
            Component: Appearance,
          },
        ],
      },

      // Advertisements routes
      {
        path: "advertisements",
        children: [
          {
            index: true,
            Component: Advertisements,
          },
          {
            path: ":id",
            Component: Advertisement,
          },
          {
            path: "create",
            Component: CreateAd,
          },
        ],
      },

      // Bookmark route
      {
        path: "bookmarks",
        Component: Bookmarks,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
