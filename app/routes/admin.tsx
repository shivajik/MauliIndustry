import { redirect } from "react-router";
import type { Route } from "./+types/admin";

// Redirect /admin to /admin/login
export async function loader() {
  return redirect("/admin/login");
}

