/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import type { ActionFunction, ActionFunctionArgs } from "react-router-dom";
import { LoaderFunction } from "react-router-dom";
import { api } from "../../api/axios";

export const userProfileLoader: LoaderFunction = async () => {
  try {
    const response = await api.get("api/user-profile/");
    const profile = response.data[0];
    return profile;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const userProfileAction: ActionFunction = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  return formData;
};

interface Profile {
  membership:{
    plan:{
      name: string;
     
    }
    status: string;
  }

profile: {
  basic_used_questions: number;
  favorite_posts: number[];
  favorite_videos: number[];
  id: number;
  live_used_questions: number;
  tarot_used_questions: number;
  user: number;
}

}

export const UserProfile = () => {
  const userProfile = useLoaderData() as Profile || {};
  const profile = userProfile?.profile
  
  
  return (
    <div className="px-4">
      <h2 className="text-xl text-center text-primary font-semibold pt-3">
        Mis preguntas
      </h2>
      {profile ? (
      <div>
        <div>Preguntas realizadas: {profile?.basic_used_questions}</div>
        <div>Preguntas de live realizadas: {profile?.live_used_questions}</div>
        <div>Preguntas de tarot realizadas: {profile?.tarot_used_questions}</div>
        <h2 className="text-xl text-center text-primary font-semibold pt-3">
           Mis favoritos
        </h2>
        <div>Post favoritos: {profile?.favorite_posts.length}</div>
        <div>Videos favoritos: {profile?.favorite_videos.length}</div>
      </div>
      ) : (
        <div>No hemos encontrado tu perfil</div>
      )}
    </div>
  );
};