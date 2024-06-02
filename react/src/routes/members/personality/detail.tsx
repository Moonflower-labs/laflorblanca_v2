/* eslint-disable react-refresh/only-export-components */
import { PiFlowerLotus } from "react-icons/pi";
import { FaRegCommentAlt } from "react-icons/fa";
import { postActions, submitLike } from "../../../api/actions";
import FavoritesBtn from "../../../components/ui/FavoritesBtn";
import Rating from "../../../components/ui/Rating";
import type { DRFResponse, Post, User } from "../../../utils/definitions";
import CommentComponent from "../../../components/ui/Comment";
import CommentForm from "../../../components/members/CommentForm";
import { formatDate } from "../../../utils/format";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import LikeButton from "../../../components/ui/LikeButton";
import isLiked from "../../../utils/helpers";

export const basicDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await postActions.getPost(params.id);
  const post: DRFResponse = response?.post || null;

  return { post };
};

export const basicDetailAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "like": {
      return await submitLike(formData);
    }
    case "rating": {
      return await postActions.ratePost(params.id as string, formData);
    }
    case "favorite": {
      return await postActions.addToFavorites(
        params.id as string,
        formData
      );
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }

  // TODO: handle rating action.
};

export function BasicDetail () {
  const { post } = (useLoaderData() as { post: Post | null }) || {
    post: null,
  };
  const { user } = (useRouteLoaderData("root") as { user: User | null }) || {
    user: null,
  };

  const isFavorite =
    post &&
    user?.profile?.favorite_posts?.some(
      (favorite) => post?.id !== undefined && favorite === post?.id
    );
  const hasRated = post?.rating_score?.authors.includes(user?.id as number);
  const likedComments = user?.likes?.liked_comments;

  return (
    <>
      {post ? (
        <>
          <article className="pb-6 pt-16 px-10 md:px-40">
            <h2 className="text-primary font-semibold text-2xl text-center mt-4 mb-3">
              {post.title}
            </h2>
            <p className="whitespace-pre-wrap mb-8">{post.body}</p>
            <p className="mb-4">La Flor Blanca el {formatDate(post.created)}</p>

            <div className="divider divider-primary md:w-2/3 mx-auto">
              <span className="text-primary">
                <PiFlowerLotus size={34} />
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 align-middle">
              <div className="flex flex-row justify-between w-[50%]">
                <FavoritesBtn object={post} isFavorite={!!isFavorite} />

                <div className="flex gap-4 align-middle">
                  <div className="shadow my-auto">
                    <div className="stat-title">Puntuación</div>
                    <div className="stat-value">
                      {post?.rating_score?.score.toFixed(1)}
                    </div>
                    <div className="stat-desc">
                      Votaciones {post?.rating_score?.votes}
                    </div>
                  </div>
                </div>
              </div>
              <Rating hasRated={hasRated || false} />
            </div>
          </article>
          <h2 className="flex gap-4 align-middle text-primary justify-center font-semibold text-2xl mt-4 mb-3">
            Comentarios <FaRegCommentAlt size={24} className="my-auto" />
          </h2>
          <div className="md:px-40 mb-6 max-h-44 bg-primary/20 rounded-md mx-4 overflow-y-auto">
            {post.comments && post.comments.length ? (
              post.comments.map((comment) => (
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
                      likedComments as number[] | null
                    )}
                  />
                </div>
              ))
            ) : (
              <p className="text-xl text-center">Nadie ha comentado todavía.</p>
            )}
          </div>
          <CommentForm object={post} fieldName="post" />
        </>
      ) : (
        <div className="text-3xl text-center h-full my-auto pt-10">
          No hemos encontrado el post.
        </div>
      )}
    </>
  );
}