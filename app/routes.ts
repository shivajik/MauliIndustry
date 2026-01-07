import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("products-services", "routes/products-services.tsx"),
  route("clients", "routes/clients.tsx"),
  route("contact", "routes/contact.tsx"),
  route("admin/login", "routes/admin/login.tsx"),
  route("admin/dashboard", "routes/admin/dashboard.tsx"),
] satisfies RouteConfig;
