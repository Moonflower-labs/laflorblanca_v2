import { redirect, LoaderFunctionArgs } from "react-router-dom";
import authProvider from "../utils/auth";
import handleAccessRestriction from "./permissions";

export default async function protectedRouteLoader({ request }: LoaderFunctionArgs) {
  const user = await authProvider.checkAuthentication();
  if (!user) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}
export async function protectedLoader({ request }:{request: Request}, name:string) {
  // Check authentication
  const user = await authProvider.checkAuthentication();
  if (!user) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
   // Check user permissions
  if (!(await handleAccessRestriction(name))) {
    return redirect("/#plans");
  }
  return null;
}
 
                 