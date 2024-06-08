import { AiOutlineUser } from "react-icons/ai";
import { PiFlowerLotus } from "react-icons/pi";
import { useRouteLoaderData, Link } from "react-router-dom";
import LogoutBtn from "./ui/LogoutBtn";
import Navbar from "./ui/Navbar";
import { User } from "../utils/definitions";
import ShoppingCart from "./ui/ShoppingCart";
import { IoColorPalette } from "react-icons/io5";

const Header = () => {

  const { user } = (useRouteLoaderData("root") as { user: User }) || { user: null };
  const handleDropdown = () => {
    const elem = document.activeElement as HTMLInputElement;
    if (elem) {
      elem?.blur();
    }
  };
  return (
    <header className="sticky top-0 bg-slate-300 z-[200] w-screen">
      {/* User navigation */}
      <div className="navbar bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-content/75">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <AiOutlineUser size={26} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary/90 rounded-box w-52"
            >
              {user ? (
                <>
                  <li>
                    <LogoutBtn />
                  </li>
                  <li>
                    <Link
                      to={"/user-profile"}
                      onClick={handleDropdown}
                      className={"min-w-40"}
                    >
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/settings"}
                      onClick={handleDropdown}
                      className={"min-w-40"}
                    >
                      Ajustes
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/login"}
                      onClick={handleDropdown}
                      className={"min-w-40"}
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/register"}
                      onClick={handleDropdown}
                      className={"min-w-40"}
                    >
                      Registro
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center md:flex-row gap-2">
          <Link
            to={"/"}
            onClick={handleDropdown}
            className="btn btn-ghost text-2xl"
          >
            <span className="hidden md:block">La Flor Blanca</span>
            <PiFlowerLotus size={40} className="animate-pulse" />
          </Link>
          <div data-testid="username" className="text-2xl flex">
            <span>{user?.username}</span>
            <ShoppingCart />
          </div>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end dropdown-bottom">
            <div tabIndex={0} className="m-1 btn btn-ghost">
              <span className="hidden md:block">Theme</span>
              <IoColorPalette size={24} />
            </div>
            <div tabIndex={0} className="menu dropdown-content z-[1] p-0 m-0 justify-end rounded-full">
              <div className="join join-vertical">
                <input type="radio" name="theme-buttons" defaultChecked className="btn theme-controller join-item bg-base-100" aria-label="Default" value="default" />
                <input type="radio" name="theme-buttons" className="btn theme-controller join-item bg-base-100" aria-label="Garden" value="garden" />
                <input type="radio" name="theme-buttons" className="btn theme-controller join-item bg-base-100" aria-label="Emerald" value="emerald" />
                <input type="radio" name="theme-buttons" className="btn theme-controller join-item bg-base-100" aria-label="Cupcake" value="cupcake" />
                <input type="radio" name="theme-buttons" className="btn theme-controller join-item bg-base-100" aria-label="Coffee" value="coffee" />
                <input type="radio" name="theme-buttons" className="btn theme-controller join-item bg-base-100" aria-label="Aqua" value="aqua" />
                <input type="radio" name="theme-buttons" className="btn theme-controller join-item bg-base-100" aria-label="Dark" value="dark" />
                <input type="radio" name="theme-buttons" className="btn theme-controller join-item bg-base-100" aria-label="Dim" value="dim" />
              </div>
            </div>
          </div>
          {/* Main menu */}
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
