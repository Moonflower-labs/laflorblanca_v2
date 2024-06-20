// import type { PostItemProps } from "../utils/definitions";
// import { PiFlowerLotus } from "react-icons/pi";
// import FavoritesBtn from "./ui/FavoritesBtn";
// import { formatDate } from "../utils/format";

// const PostItem = ({ post, user }: PostItemProps) => {
//   const isFavorite =
//     post &&
//     user?.profile?.favorite_posts?.some((favorite) => post?.id !== undefined && favorite === post?.id);

//   return (
//     <>
//       {post ? (
//         <article className="pb-6 px-10">
//           <p className="mb-4">La Flor Blanca el {formatDate(post?.created)}</p>
//           <p className="text-secondary font-semibold text-xl mb-3">
//             {post.title}
//           </p>
//           <p className="whitespace-pre-wrap">{post.body}</p>
//           <p className=""></p>
//           <div className="flex gap-4 align-middle">
//             <FavoritesBtn object={post} isFavorite={!!isFavorite} />
//             <div className="stats  shadow my-auto">
//               <div className="stat">
//                 <div className="stat-title">Puntuación</div>
//                 <div className="stat-value">{post.rating_score.score}</div>
//                 <div className="stat-desc">Votaciones 0</div>
//               </div>
//             </div>
//           </div>
//           <div className="divider divider-primary w-2/3 mx-auto">
//             <span className="text-primary">
//               <PiFlowerLotus size={34} />
//             </span>
//           </div>
//         </article>
//       ) : (
//         <div>No post to display</div>
//       )}
//     </>
//   );
// };

// export default PostItem;
