import { FaQuestion } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";

const QuestionLayout = () => {
  return (
    <>
      <div role="tablist" className="tabs fixed bg-base-100/80 z-50  w-screen">
        <NavLink
          to={"/questions/basic"}
          role="tab"
          className={({ isActive }) =>
            `tab ${isActive ? "border-b-4 border-primary" : ""} `
          }
        >
          <FaQuestion size={20} className="text-primary" /> Personalidad
        </NavLink>
        <NavLink
          to={"/questions/tarot"}
          role="tab"
          className={({ isActive }) =>
            `tab ${isActive ? "border-b-4 border-primary" : ""} `
          }
        >
          <FaQuestion size={20} className="text-primary" /> Tarot
        </NavLink>
        <NavLink
          to={"/questions/live"}
          role="tab"
          className={({ isActive }) =>
            `tab ${isActive ? "border-b-4 border-primary" : ""} `
          }
        >
          <FaQuestion size={20} className="text-primary" /> Directo
        </NavLink>
      </div>
      <AnimatedPage>
        <Outlet />
      </AnimatedPage>
    </>
  );
};

export default QuestionLayout;
