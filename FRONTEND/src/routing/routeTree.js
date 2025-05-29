import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import { homePageRoute } from "./homepage";
import { authRoute } from "./auth.route";
import { dashBoardRoute } from "./dashboard";

export const rootRoute = createRootRoute({
  component: App
});

export const routeTree = rootRoute.addChildren([
  homePageRoute,
  authRoute,
  dashBoardRoute,
]);
