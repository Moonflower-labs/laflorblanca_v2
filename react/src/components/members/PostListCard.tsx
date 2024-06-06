import { Link } from "react-router-dom";
import { Post } from "../../utils/definitions";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const PostListCard = ({ post }: { post: Post }) => {
  const staticPrefix = import.meta.env.PROD ? "/static" : "";

  const logoUrl = `${staticPrefix}/flower.png`;

  return (
    <div className="card w-[98%] bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={logoUrl}
          alt=""
          className="rounded-xl aspect-video"
          width={300}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary mb-5">
          <Link to={`post/${post.id as string}`}> {post.title}</Link>
        </h2>
        <div className=" divider"></div>
        <div className="text-secondary flex flex-col md:flex-row gap-3">
          <div className="flex gap-4 text-xl">
            <FaStar size={30} />
            <div className="">{post?.rating_score?.score.toFixed(1)}</div>
          </div>
          <div className="flex gap-4 text-xl">
            <FaRegCommentAlt size={30} />
            <div className="">{post.comments?.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListCard;
