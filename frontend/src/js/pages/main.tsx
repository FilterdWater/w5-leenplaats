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
import { CreateAd } from "@/js/pages/advertisements/create-ad";

// Test
import { Test } from "./test";

// Configuration with nested routes
const router = createBrowserRouter([
  // Root layout
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // Home path
      {
        index: true, // This makes it the default route for "/"
        element: <Index />,
      },
      // Auth paths
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      // settings paths
      {
        path: "/settings/profile",
        element: <Profile />,
      },
      {
        path: "/settings/password",
        element: <Password />,
      },
      {
        path: "/settings/appearance",
        element: <Appearance />,
      },
      // advertisements paths
      {
        path: "/advertisements/create",
        element: <CreateAd />,
      },
      // test path
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
