
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ServicesPage from "../pages/services/page";
import HirePage from "../pages/hire/page";
import ContactPage from "../pages/contact/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/hire",
    element: <HirePage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
