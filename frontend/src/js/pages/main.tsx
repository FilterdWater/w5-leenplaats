import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "@/css/app.css";
import { NotFound } from "@/js/pages/NotFound.tsx";
import { App } from "@/js/pages/app.tsx";
import { Index } from "@/js/pages/index.tsx";
import { Login } from "@/js/pages/auth/login.tsx";
import { SignUp } from "@/js/pages/auth/sign-up";
import { Profile } from "@/js/pages/settings/profile";
import { Password } from "@/js/pages/settings/password";
import { Appearance } from "@/js/pages/settings/appearance";

// Configuration with nested routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, // This makes it the default route for "/"
        element: <Index />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
