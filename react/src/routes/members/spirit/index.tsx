/* eslint-disable react-refresh/only-export-components */
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import type { DRFResponse, VideoLink } from "../../../utils/definitions";
import { videoLinkActions } from "../../../api/actions";
import Pagination from "../../../components/ui/Pagination";
import VideoListCard from "../../../components/members/VideoListCard";

export const spiritLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("search");

  const response = await videoLinkActions.getLinksSection(
    "spirit",
    url.searchParams
  );
  const data: DRFResponse = response?.data || null;

  return { data, q };
};
export const spiritAction = () => {
  // TODO: handle favorites and rating actions.
  return null;
};

export function Spirit() {
  const { data } = (useLoaderData() as { data: DRFResponse | null }) || {
    data: null,
  };
  const videos = data?.results as VideoLink[];
  return (
    <div className="text-center pt-5 px-1">
      <div className="pt-10 text-primary text-4xl mb-8 font-semibold">
        Espíritu
      </div>
      <div className="grid grid-cols-1 md:w-1/2 mx-auto mb-4">
        <p className="text-3xl mb-2">¡Bienvenidos Espíritus!</p>
        <iframe
          className="aspect-video rounded-lg"
          src="https://www.youtube.com/embed/be5-o9k9zdg?si=qGBN-fklnUGCBtj8"
          height="100%"
          width="100%"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-2xl mx-auto text-center">
        <div className="mb-4">
          Recibirás contenido especial que nutra tu Espíritu, Alma y
          Personalidad en todas sus formas, más una pregunta mensual de tarot
          incluida cuya respuesta será enviada privadamente a tu email de tu
          suscripción.
        </div>
        <p className="mb-3">
          Además con esta suscripción tendrás acceso a contenido en directo de
          Preguntas y Respuestas, Tarot o Mi Propio Proceso una vez al mes y/o
          lo que espontáneamente surja.
        </p>
        <p className="mb-3">
          Si quieres ver la pregunta más detallada y completa del episodio dale
          a "more info". Para comentar o darnos tu opinión puedes hacerlo en{" "}
          <a
            className="link link-secondary"
            href="https://api.whatsapp.com/send/?phone=34638006861&text&type=phone_number&app_absent=0"
            target="_blank"
          >
            Whatsapp
          </a>{" "}
          y el grupo de{" "}
          <a
            className="link link-secondary"
            href="https://t.me/+x1oGX2L_o_Y5NWE0"
            target="_blank"
          >
            Telegram
          </a>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto mb-4">
        <div className="m-4">
          <p className="text-3xl mb-3">Respuestas de audio</p>
          <iframe
            className="aspect-video rounded-lg"
            height="390"
            width="100%"
            seamless={true}
            src="https://share.transistor.fm/e/respuestas-espiritu/playlist"
            referrerPolicy="no-referrer"
            loading="lazy"
          ></iframe>
        </div>
        <div className="m-4">
          <p className="text-3xl mb-3">Contenido sorpresa</p>
          <iframe
            className="aspect-video rounded-lg"
            height="390"
            width="100%"
            seamless={true}
            src="https://share.transistor.fm/e/contenido-sorpresa-alma-y-espiritu/playlist/dark"
            referrerPolicy="no-referrer"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <section className="">
        <p className="text-3xl pb-3">Respuestas de video</p>
        {videos && videos.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-content-center pb-3">
            {videos.map((video) => (
              <VideoListCard video={video} key={video.id} />
            ))}
          </div>
        ) : (
          <div className="text-xl pb-3">No hay videos disponibles</div>
        )}
        <Pagination totalPages={data?.total_pages as number} />
      </section>
    </div>
  );
}

