import { NavLink, Outlet } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";

export const Component = () => {
  return (
    <>
      <div role="tablist" className="tabs fixed bg-base-100/80 z-50  w-screen">
        <NavLink
          to={"/personality"}
          role="tab"
          className={({ isActive }) =>
            `tab ${isActive ? "border-b-4 border-primary" : ""} `
          }
        >
          Personalidad
        </NavLink>
        <NavLink
          to={"/soul"}
          role="tab"
          className={({ isActive }) =>
            `tab ${isActive ? "border-b-4 border-primary" : ""} `
          }
        >
          Alma
        </NavLink>
        <NavLink
          to={"/spirit"}
          role="tab"
          className={({ isActive }) =>
            `tab ${isActive ? "border-b-4 border-primary" : ""} `
          }
        >
          Espíritu
        </NavLink>
      </div>
      <AnimatedPage>
        <Outlet />
      </AnimatedPage>
    </>
  );
}
