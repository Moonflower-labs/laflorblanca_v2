import { motion, usePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";

type AnimatedPageProps = {
  children: ReactNode;
};

const AnimatedPage = ({ children }: AnimatedPageProps) => {
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    !isPresent && setTimeout(safeToRemove, 1000);
  }, [isPresent, safeToRemove]);

  const routeVariants = {
    initial: {
      // x: 300,
      opacity: 0,
      filter: "blur(5px)",
    },
    final: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: {
      // x: -300,
      opacity: 0,
      filter: "blur(5px)",
      transition: { ease: "easeOut" },
    },
  };
  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      transition={{ duration: 0.3 }}
      exit={"exit"}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
