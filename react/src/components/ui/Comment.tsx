import { motion } from "framer-motion";
import type { CommentProps } from "../../utils/definitions";
import { formatDate, formatLikes } from "../../utils/format";

const CommentComponent = ({ comment }: CommentProps) => {
  return (
    <motion.div
      key={`comment-${comment.id}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      // initial={{ y: -50, opacity: 0, scale: 0 }}
      // animate={{ y: 0, opacity: 1, scale: 1 }}
      className="chat chat-start mb-2"
    >
      <div className="chat-header mb-2">
        {comment.user}
        <time className="text-xs opacity-50 ms-3">
          {formatDate(comment.created)}
        </time>
      </div>
      <div className="chat-footer mt-1">
        {comment.likes?.length} me gusta.
        <span className="text-xs opacity-50 ms-3">
          {formatLikes(comment.likes)}
        </span>
      </div>
      <div className="chat-bubble chat-bubble-primary">{comment.text}</div>
    </motion.div>
  );
};

export default CommentComponent;
