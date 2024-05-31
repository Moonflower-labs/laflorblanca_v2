import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useFetcher } from "react-router-dom";

import type { LkeButtonProps } from "../../utils/definitions";
import { motion } from "framer-motion";

const LikeButton = ({ object, id, isLiked }: LkeButtonProps) => {
  const fetcher = useFetcher();

  // if there is `formData` then it is posting to the action
  const liked = fetcher.formData
    ? // check the formData to be optimistic
      fetcher.formData.get("action") === "like"
    : // if its not posting to the action, use the record's value
      isLiked;

  return (
    <fetcher.Form method="post" className="my-auto">
      <input type="hidden" name={object} value={id} />
      <input type="hidden" name="intent" value="like" />
      <button type="submit" name="action" value={liked ? "dislike" : "like"}>
        {liked ? (
          <motion.div
            key={"liked"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <FaHeart className="text-primary" size={25} />
          </motion.div>
        ) : (
          <motion.div
            key={"disliked"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <FaRegHeart className="text-primary" size={25} />
          </motion.div>
        )}
      </button>
    </fetcher.Form>
  );
};

export default LikeButton;
