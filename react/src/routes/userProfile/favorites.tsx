/* eslint-disable react-refresh/only-export-components */

import { Link, useFetcher, useLoaderData } from "react-router-dom";
import { api } from "../../api/axios";
import { TbTrash } from "react-icons/tb";
import { Post, VideoLink } from "../../utils/definitions";

export const userFavoriteLoader = async () => {
  // fetch user favorites list
  try {
    const response = await api.get('api/user-profile/favorites/')
    return response.data
    
  } catch (error) {
    console.log(error)
    return null
  }
}

const Favorites = () => {
  const { favorite_posts, favorite_videos } = useLoaderData() as {favorite_posts:Post[],favorite_videos: VideoLink[]} || {}
  const fetcher = useFetcher()
  return (
    <div className="px-3 overflow-x-hidden">
      <section className="py-6">
        <h2 className="font-semibold text-2xl text-primary">Posts</h2>
          {favorite_posts?.length ?   (
            favorite_posts?.map((post)=> (
            <div key={post.id}  className="flex flex-row justify-between">
              <Link 
                to={`/personality/post/${post.id}`}
                className="link link-accent"
                >
                  {post.title}
              </Link>
              <fetcher.Form method="post" action={`/personality/post/${post.id}`} className="text-end">
                  <input type="hidden" name="id" value={post.id} />
                  <input
                    type="hidden"
                    name="action"
                    value={"remove"}
                  />
                  <input type="hidden" name="intent" value="favorite" />
                  <button
                    type="submit"
                    className="text-accent text-xl"
                    name="id"
                    value={post.id}
                  >
                   <TbTrash className="text-error" />
                  </button>
              </fetcher.Form>
            </div>
              
            ))
          ): (
            <div>No tienes ningún favorito</div>
          )}
      </section>
      <section className="py-6">
        <h2 className="font-semibold text-2xl text-primary">Videos</h2>
          {favorite_videos?.length ?   (
            favorite_videos?.map((video)=> (
            <div key={video.id}  className="flex flex-col sm:flex-row justify-between">
              <Link 
                to={`/${video.section}/video/${video.id}`}
                className="link link-accent"
              >
                {video.title}
              </Link>
              <div className="flex flex-row">
                <div className="flex flex-row gap-3">
                  {video?.section === "soul" ? <span>Alma</span> : <span>Espíritu</span>}
                  <fetcher.Form method="post" action={`/${video.section}/video/${video.id}`} className="text-end">
                    <input type="hidden" name="id" value={video.id} />
                    <input type="hidden" name="action" value={"remove"} />
                    <input type="hidden" name="intent" value="favorite" />
                    <button type="submit" className="text-accent text-xl" name="id" value={video.id}>
                      <TbTrash className="text-error" />
                    </button>
                  </fetcher.Form>
                </div>
              </div>
            </div>
            ))
          ): (
            <div>No tienes ningún favorito</div>
          )}
      </section>
    </div>
  );
};

export default Favorites;
