import { motion } from "framer-motion";
import type { UserComment } from "../../utils/definitions";
import { formatDate, formatLikes } from "../../utils/format";
import LikeButton from "./LikeButton";
import { FaRegCommentAlt } from "react-icons/fa";
import isLiked from "../../utils/helpers";
import { useRevalidator } from "react-router-dom";
import { useEffect } from "react";
import useWebSocket from "../../hooks/useWebsocket";


interface CommentSectionProps {
  comments: UserComment[];
  likedComments: number[] | null;
  currentUser: string;
};

const CommentSection = ({ comments, likedComments, currentUser }: CommentSectionProps) => {


  return (
    <div>
      <h2 className="flex gap-4 align-middle text-primary justify-center font-semibold text-2xl mt-4 mb-3">
        Comentarios <FaRegCommentAlt size={24} className="my-auto" />
      </h2>
      <div className="md:px-40 mb-6 max-h-44 bg-primary/20 rounded-md mx-4 overflow-y-auto">
        <CommentReloader currentUser={currentUser} />
        {comments && comments.length ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-row gap-4 align-middles"
            >
              <CommentComponent comment={comment} />
              <LikeButton
                object="comment"
                id={comment.id as number}
                isLiked={isLiked(
                  comment.id as number,
                  likedComments
                )}
              />
            </div>
          ))
        ) : (
          <p className="text-xl text-center">Nadie ha comentado todavía.</p>
        )}
      </div>
    </div>
  )
}

export default CommentSection


interface Props {
  comment: UserComment;
};


const CommentComponent = ({ comment }: Props) => {

  return (
    <motion.div
      key={`comment-${comment.id}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
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


const CommentReloader = ({ currentUser }: { currentUser: string }) => {

  const { message, error } = useWebSocket("ws/comments/");
  const revalidator = useRevalidator()

  useEffect(() => {
    if (error) {
      console.error('websocket error: ', error)
      return;
    }

    if (message && message?.comment?.user !== currentUser) {
      revalidator.revalidate()
    }
  }, [message, error, currentUser])


  return (
    <div hidden={revalidator.state === "idle"}>
      Comentario nuevo...
    </div>
  )
};