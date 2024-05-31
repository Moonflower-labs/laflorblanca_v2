import { useFetcher } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

import type { Post, VideoLink } from "../../utils/definitions";
import { motion } from "framer-motion";

const FavoritesBtn = ({
  object,
  isFavorite,
}: {
  object: VideoLink | Post;
  isFavorite: boolean;
}) => {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData?.get("action") === "add"
    : isFavorite;

  return (
    <fetcher.Form method="post" className="my-auto">
      <fieldset disabled={fetcher.state !== "idle"}>
        <input type="hidden" name="id" value={object.id} />
        <input
          type="hidden"
          name="action"
          value={favorite ? "remove" : "add"}
        />
        <input type="hidden" name="intent" value="favorite" />
        <button
          type="submit"
          className="text-accent text-xl"
          name="id"
          value={object.id}
        >
          {favorite ? (
            <motion.div
              key={"favorite"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FaStar size={25} />
            </motion.div>
          ) : (
            <motion.div
              key={"unfavorite"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FaRegStar size={25} />
            </motion.div>
          )}
        </button>
      </fieldset>
    </fetcher.Form>
  );
};

export default FavoritesBtn;
