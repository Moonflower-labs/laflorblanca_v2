import { redirect, LoaderFunctionArgs } from "react-router-dom";
import authProvider from "../utils/auth";

export default function protectedRouteLoader({ request }: LoaderFunctionArgs) {
  const isAuthenticated = authProvider.isAuthenticated;
  if (!isAuthenticated) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}
