import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import { useLocation, useOutlet } from "react-router-dom";

const AnimatedOutlet = () => {
  const { pathname } = useLocation();
  const element = useOutlet();
  // console.log("Current Path:", pathname, "Hash Fragment:", hash);

  return (
    <>
      <AnimatePresence mode="wait">
        {element && cloneElement(element, { key: pathname  })}
      </AnimatePresence>
    </>
  );
};

export default AnimatedOutlet;
