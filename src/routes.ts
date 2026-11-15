import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),
  route("works", "pages/works.tsx"),
  route("links", "pages/links.tsx"),
  route("*", "pages/not-found.tsx"),
] satisfies RouteConfig;
