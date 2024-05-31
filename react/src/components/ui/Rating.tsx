// todo: add fetcher form
import { Form } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const Rating = ({ hasRated }: { hasRated: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [hasRated]);
  return (
    <div className="flex flex-col gap-3 my-auto">
      <AnimatePresence>
        <button
          className="me-2 btn btn-primary"
          onClick={() => setIsOpen(!isOpen)}
          disabled={hasRated}
        >
          {hasRated
            ? "Ya has valorado esta respuesta"
            : "Valora esta respuesta"}
        </button>

        {isOpen && (
          <motion.div
            key={"rating"}
            initial={{ y: -50, opacity: 0, scale: 0 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            exit={{ y: -50, scale: 0 }}
          >
            <Form
              method="post"
              className="rating rating-md gap-1 my-auto border p-3 rounded-md bg-secondary/15 align-middle"
            >
              <input type="hidden" name="intent" value="rating" />
              <input
                type="radio"
                name="rating-value"
                className="mask mask-heart bg-primary"
                defaultValue={1}
              />
              <input
                type="radio"
                name="rating-value"
                className="mask mask-heart bg-primary"
                defaultValue={2}
              />
              <input
                type="radio"
                name="rating-value"
                className="mask mask-heart bg-primary"
                defaultValue={3}
                defaultChecked
              />
              <button className="btn btn-sm">Votar</button>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Rating;
