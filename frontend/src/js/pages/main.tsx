import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "@/css/app.css";
import App from "./app.tsx";

// Create some example components for routing
const Home = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Welcome Home!</h1>
    <p>This is the home page content.</p>
  </div>
);

const About = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">About Us</h1>
    <p>This is the about page content.</p>
  </div>
);

const NotFound = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

// Enhanced router configuration with nested routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, // This makes it the default route for "/"
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
