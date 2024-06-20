/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import type { Post, DRFResponse } from "../../../utils/definitions";
import { postActions } from "../../../api/actions";
import Pagination from "../../../components/ui/Pagination";
import FilterComponent from "../../../components/ui/FilterComponent";
import PostListCard from "../../../components/members/PostListCard";
import YoutubeVideo from "../../../components/ui/YoutubeVideo";

export const personalityLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("search") || "";

  // fetch and return post data
  const { data } = ((await postActions.getAllPosts(url.searchParams)) as { data: DRFResponse }) || { data: null };
  return { data, q };
};

export const personalityAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");
  const id = formData.get("id");
  if (action === "add" || action === "remove") {
    await postActions.addToFavorites(id as string, formData);
  }
  // TODO: handle rating action.
  return null;
};

export const Personality = () => {
  const { data } = (useLoaderData() as {
    data: DRFResponse | null;
  }) || {
    data: null,
  };

  const posts = data?.results as Post[];

  return (
    <div className="text-center pt-5 px-1">
      <div className="pt-10 text-primary text-4xl mb-8 font-semibold">
        Personalidad
      </div>
      <div className="grid grid-cols-1 md:w-1/2 mx-auto mb-4">
        <p className="text-3xl mb-2">¡Bienvenidos Personalidades!</p>
        <YoutubeVideo videoId="7158ShreVEU" />
      </div>
      <div className="text-center mb-4">
        Estos son ejemplos de preguntas y sugerencias de temáticas generalizadas
        por parte de los oyentes.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">
            El Mirto o Arrayán y sus usos para el amor
          </p>
          <YoutubeVideo videoId="dKXH2Tdttkg" />
        </div>
        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">
            Los Cuatro Elementos 🔥🌬🌊⛰ y sus Colores🎨
          </p>
          <YoutubeVideo videoId="7Pi6W3Xnv5U" />
        </div>
        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">
            Triada del Fuego🔥: Aries, Leo y Sagitario
          </p>
          <YoutubeVideo videoId="RqHO0WUlK2Y" />
        </div>
        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">
            Triada de la Tierra🌋: Tauro, Virgo y Capricornio
          </p>
          <YoutubeVideo videoId="0b8onmHCsY4" />
        </div>

        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">
            Triada del Aire🌬: Géminis, Libra y Acuario
          </p>
          <YoutubeVideo videoId="4-C-0JsUt1I" />
        </div>
        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">
            Triada del Agua🌊: Cáncer, Escorpio y Piscis
          </p>
          <YoutubeVideo videoId="XTup4T4vVRw" />
        </div>

        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">Narcisismo desde el Astral</p>
          <YoutubeVideo videoId="re4mncuNTD4" />
        </div>
        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">
            Falsos Lectores de Energía y Guía para Detectarlos
          </p>
          <YoutubeVideo videoId="_jLz5sVcC2Y" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:w-1/2 mx-auto mb-10">
        <p className="text-3xl mb-6">Respuestas de audio</p>
        <p className="mb-3">
          Si quieres ver la pregunta más detallada y completa del episodio dale
          a "more info".
        </p>
        <iframe
          className="aspect-video rounded-lg"
          height="390"
          width="100%"
          seamless={true}
          src="https://share.transistor.fm/e/respuestas-personalidad/playlist"
          referrerPolicy="no-referrer"
          loading="lazy"
        ></iframe>
      </div>
      <p className="text-3xl mb-5">Respuestas de Blog</p>
      <FilterComponent />
      {posts && posts.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-items-center pb-4">
          {posts.map((post: Post) => <PostListCard post={post} key={post.id} />)}
        </div>
      ) : (
        <div className="text-xl pb-3 text-center">No hay respuestas disponibles</div>
      )}
      <Pagination totalPages={data?.total_pages as number} />
    </div>
  );
};

