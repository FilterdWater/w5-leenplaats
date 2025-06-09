import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "@/css/app.css";
import { NotFound } from "@/js/pages/NotFound.tsx";
import { App } from "@/js/pages/app.tsx";
import { Index } from "@/js/pages/index.tsx";
import { Login } from "@/js/pages/auth/login.tsx";
import { SignUp } from "@/js/pages/auth/sign-up";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
