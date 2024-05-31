import SubscriptionPlans from "./SubscriptionPlans";
import AnimatedPage from "./AnimatedPage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Homepage = () => {
  const { pathname, hash } = useLocation();
  const staticPrefix = import.meta.env.PROD ? "/static" : "";

  const logoUrl = `${staticPrefix}/flower.png`;

  useEffect(() => {
    const sectionId = hash.substring(1); // Extract section ID from hash fragment
    const targetSection = document.getElementById(sectionId); // Get the target section element

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the target section
    }
  }, [pathname, hash]);

  return (
    <>
      <AnimatedPage>
        <div className="p-2 pt-8">
          <img
            src={logoUrl}
            alt="logo"
            className="rounded-md mx-auto aspect-video md:w-1/2 shadow-xl shadow-primary/15"
          />
        </div>
        <div
          className="p-6 md:w-[75%] mx-auto flex flex-col gap-4 text-center"
          data-testid="homepage"
        >
          <p className="text-3xl">
            <span> Hola a todos almas oscuras y luminosas, </span>
            bienvenidos a mi rincón de Preguntas y Respuestas de una manera más
            privada y a nuestro contenido especial para miembros.
          </p>
          <p className="text-3xl">
            Espero que este nuevo paso os de la confianza suficiente para perder
            la vergüenza y hacer esas preguntas que tanto anheláis de una manera
            más anónima. Vuestro nombre, email o nombre de usuario nunca será
            mencionado; sólo me remitiré a contestar a la pregunta en cuestión.
            Como la personalidad que soy entiendo la importancia del anonimato
            en estas materias tan sensibles.
          </p>
          <p className="text-3xl">
            Contestaré por escrito, con un audio, video o en directo según sea
            conveniente y será añadido al plan que sois miembro. Recibiréis las
            Respuestas a las Preguntas de Tarot con un video enlace a vuestro
            email privado de vuestra membresía todos aquellos que hayan
            consultado previamente y estén suscritos dentro del plan Alma y
            Espíritu.
          </p>
          <p className="text-3xl">
            Para recordaros la temática a la que nos dedicamos, aquí os dejo
            estos videos de introducción para que podáis perfilar vuestras
            preguntas adecuadamente y alinearlas con el propósito de nuestra
            misión.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4 px-1">
          <iframe
            className="aspect-video rounded-lg border border-neutral-400"
            src="https://www.youtube-nocookie.com/embed/v726U5jRots?si=16inDY65QTJli5hi"
            height="100%"
            width="100%"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
          <iframe
            className="aspect-video rounded-lg border border-neutral-400"
            src="https://www.youtube-nocookie.com/embed/Lj5Q6_o_yyw"
            height="100%"
            width="100%"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <div className="col-span-full">
            <iframe
              className="md:w-1/2 mx-auto aspect-video rounded-lg border border-neutral-400"
              src="https://www.youtube-nocookie.com/embed/4GIIhZK1vaY"
              height="100%"
              width="100%"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <SubscriptionPlans />
      </AnimatedPage>
    </>
  );
};

export default Homepage;
