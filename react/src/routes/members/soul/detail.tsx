/* eslint-disable react-refresh/only-export-components */
import { IoArrowBackOutline } from "react-icons/io5";
import { submitLike, videoLinkActions } from "../../../api/actions";
import type { DRFResponse, User, VideoLink } from "../../../utils/definitions";
import {
  ActionFunctionArgs,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { PiFlowerLotus } from "react-icons/pi";
import FavoritesBtn from "../../../components/ui/FavoritesBtn";
import CommentForm from "../../../components/members/CommentForm";
import VideoComponent from "../../../components/members/VideoComponent";
import LikeButton from "../../../components/ui/LikeButton";
import isLiked from "../../../utils/helpers";
import CommentSection from "../../../components/ui/Comment";

export const soulDetailLoader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  // Add the section to the search params
  searchParams.set("section", "soul");

  const response = await videoLinkActions.getVideo(params.id, searchParams);
  const video: DRFResponse = response?.video || null;

  return { video };
};
export const soulDetailAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "like": {
      return await submitLike(formData);
    }
    case "favorite": {
      return await videoLinkActions.addToFavorites(
        params.id as string,
        formData
      );
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
};

export function SoulDetail() {
  const { video } = (useLoaderData() as { video: VideoLink | null }) || {
    video: null,
  };
  const { user } = (useRouteLoaderData("root") as { user: User | null }) || {
    user: null,
  };
  const navigate = useNavigate();

  const isFavorite =
    video &&
    user?.profile?.favorite_videos?.some(
      (favorite) => video?.id !== undefined && favorite === video?.id
    );
  const likedVideos = user?.likes.liked_videos;
  const likedComments = user?.likes.liked_comments;
  return (
    <>
      {video ? (
        <>
          <article className="pb-6 pt-16 px-10 md:px-40">
            <h2 className="relative text-primary font-semibold text-2xl text-center mt-4 mb-3">
              <span
                className="fixed left-1 top-9 flex flex-row gap-3 align-middle cursor-pointer text-primary"
                onClick={() => navigate("..", { preventScrollReset: true })}
              >
                <IoArrowBackOutline size={24} />
                Atrás
              </span>
              {video.title}
            </h2>
            <VideoComponent link={video} />

            <div className="divider divider-primary md:w-2/3 mx-auto">
              <span className="text-primary">
                <PiFlowerLotus size={34} />
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 align-middle">
              <div className="flex gap-4 align-middle">
                <FavoritesBtn object={video} isFavorite={!!isFavorite} />
              </div>
              <LikeButton
                object="video"
                id={video.id as number}
                isLiked={isLiked(
                  video.id as number,
                  likedVideos as number[] | null
                )}
              />
            </div>
          </article>

          <CommentSection currentUser={user?.username as string} comments={video?.comments as []} likedComments={likedComments as number[]} />
          <CommentForm object={video} fieldName="video" />
        </>
      ) : (
        <div className="text-3xl text-center h-full my-auto pt-10">
          No hemos encontrado el video.
        </div>
      )}
    </>
  );
}