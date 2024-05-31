import { AiOutlineUser } from "react-icons/ai";
import { PiFlowerLotus } from "react-icons/pi";
import { GiMoon } from "react-icons/gi";
import { FaRegSun } from "react-icons/fa6";
import { NavLink, useRouteLoaderData, Link } from "react-router-dom";
import LogoutBtn from "./ui/LogoutBtn";
import Navbar from "./ui/Navbar";
import { User } from "../utils/definitions";
import ShoppingCart from "./ui/ShoppingCart";

const Header = () => {
  const { user } = (useRouteLoaderData("root") as { user: User }) || {
    user: null,
  };
  const handleDropdown = () => {
    const elem = document.activeElement as HTMLInputElement;
    if (elem) {
      elem?.blur();
    }
  };
  return (
    <header className="sticky top-0 bg-slate-300 z-[200]">
      {/* User navigation */}
      <div className="navbar bg-gradient-to-r from-violet-300 to-sky-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <AiOutlineUser size={26} className="text-primary" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user ? (
                <>
                  <li>
                    <LogoutBtn />
                  </li>
                  <li>
                    <NavLink
                      to={"/user-profile"}
                      onClick={handleDropdown}
                      className={({ isActive }) =>
                        `min-w-40 ${isActive ? "border-2 border-primary" : ""} `
                      }
                    >
                      Perfil
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/"}
                      onClick={handleDropdown}
                      className={({ isActive }) =>
                        `min-w-40 ${isActive ? "border-2 border-primary" : ""} `
                      }
                    >
                      Ajustes
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to={"/login"}
                      onClick={handleDropdown}
                      className={({ isActive }) =>
                        `min-w-40 ${isActive ? "border-2 border-primary" : ""} `
                      }
                    >
                      Iniciar sesión
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/register"}
                      onClick={handleDropdown}
                      className={({ isActive }) =>
                        `min-w-40 ${isActive ? "border-2 border-primary" : ""} `
                      }
                    >
                      Registro
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center flex-col md:flex-row gap-2">
          <Link
            to={"/"}
            onClick={handleDropdown}
            className="btn btn-ghost text-primary/75 text-2xl"
          >
            {" "}
            <PiFlowerLotus size={40} className="text-primary animate-pulse" />
            La Flor Blanca
          </Link>
          {user && (
            <div data-testid="username" className="text-2xl text-primary/70">
              {user?.username}
            </div>
          )}
        </div>

        <ShoppingCart />

        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="dim"
                id="theme"
              />
              {/* sun icon */}
              <FaRegSun size={24} className="text-primary swap-off" />

              {/* moon icon */}
              <GiMoon size={24} className="text-primary swap-on" />
            </label>
          </button>
          {/* Main menu navugation */}
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
