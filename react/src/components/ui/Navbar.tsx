import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LuMenuSquare } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const handleNav = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <LuMenuSquare
        onClick={handleNav}
        size={28}
        className="text-primary my-auto pe-2 cursor-pointer"
      />
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            key="nav"
            ref={navRef}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 w-screen h-full z-100"
            onClick={handleNav}
          >
            <div className="w-full md:w-[40%] h-full fixed right-0 backdrop-blur-sm flex flex-col gap-3 items-center justify-center">
              <Link
                to="/"
                className="btn btn-primary w-[80%] scale-hover group overflow-hidden"
              >
                Inicio
                <div className="absolute bottom-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500  h-2 w-full bg-gradient-to-r from-neutral/50 to-secondary/85"></div>
              </Link>

              <Link
                to="/#plans"
                className="btn btn-primary w-[80%] scale-hover group overflow-hidden"
              >
                Planes de subscripción
                <div className="absolute bottom-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500  h-2 w-full bg-gradient-to-r from-neutral/50 to-secondary/85"></div>
              </Link>
              <Link
                to="personality"
                className="btn btn-primary w-[80%] scale-hover group overflow-hidden"
              >
                Rincón de miembros
                <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500  h-2 w-full bg-gradient-to-r from-neutral/50 to-secondary/85"></div>
              </Link>
              <Link
                to="questions/basic"
                className="btn btn-primary w-[80%] scale-hover group overflow-hidden"
              >
                Pregúntale a La Flor Blanca
                <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500  h-2 w-full bg-gradient-to-r from-neutral/50 to-secondary/85"></div>
              </Link>
              <Link
                to="store"
                className="btn btn-primary w-[80%] scale-hover group overflow-hidden"
              >
                Tienda
                <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500  h-2 w-full bg-gradient-to-r  from-neutral/50 to-secondary/85"></div>
              </Link>
              <Link
                to="help"
                className="btn btn-primary w-[80%] scale-hover group overflow-hidden"
              >
                Ayuda
                <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500  h-2 w-full bg-gradient-to-r from-neutral/50 to-secondary/85"></div>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
