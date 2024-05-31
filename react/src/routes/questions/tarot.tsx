/* eslint-disable react-refresh/only-export-components */
import { Form, useActionData, useLoaderData } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/axios";
import { MutableRefObject, useRef } from "react";
import { Errors } from "../../utils/definitions";

export const tarotLoader = async () => {
  try {
    const response = await api.get(
      "api/premium-questions/retrieve_premium_used_questions/?type=tarot"
    );
    return { tarot_used_questions: response.data };
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const tarotAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const text = formData.get("text");
  // const remaining_questions = formData?.get("remaining_questions") || 0;

  // if ((remaining_questions as number) <= 0) {
  //   toast.error("Yas has usado el máximo numero de preguntas este mes");
  //   return null;
  // }

  const errors: Errors = {};

  // validate the fields
  if (!text) {
    errors.text = "Escribe una pregunta";
  }
  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }
  // todo: validate input data + provide feedback
  try {
    const response = await api.post("api/premium-questions/", formData);
    const questionPromise = new Promise((resolve) => resolve(response));
    toast.promise(questionPromise, {
      pending: "Enviando pregunta...",
      success: "Pregunta enviada",
      error: "Ha ocurrido un error.",
    });
  } catch (error) {
    console.error(error);
    toast.error("Ha ocurrido un error.");
  }

  // TODO: handle rating action.
  return null;
};

const Tarot = () => {
  const errors = useActionData() as Errors;
  const { tarot_used_questions = 3 } = (useLoaderData() as {
    tarot_used_questions: number;
  }) || {
    tarot_used_questions: 3,
  };
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
  const remaining_question_count = 1 - Number(tarot_used_questions);
  return (
    <div className="text-center pt-16 pb-6">
      <div className="">
        <img
          className="tarot"
          src="{{url_for('static', filename='images/sun.avif')}}"
          alt=""
        />
        <img
          className="tarot"
          src="{{url_for('static', filename='images/tarot.avif')}}"
          alt=""
        />
      </div>
      <h2 className="text-3xl font-semibold text-primary mb-1">
        Pregunta de Tarot
      </h2>
      <div className="p-10 pt-6 md:w-2/4 mx-auto">
        <p>
          Una lectura energética del estado presente en el que te encuentras
          para poder responderte, guiarte hacia tu mejor posible opción y
          aclararte tus dudas.
        </p>
        <p>
          Ofrecemos un máximo de una pregunta al mes por membresía que serán
          respondidas a través de un videolink privado a tu email de tu plan.
          Nuestras lecturas son sin tiempo.
        </p>
      </div>
      <div className="text-center mb-3">
        Preguntas disponibles:
        <span className="text-warning"> {remaining_question_count} </span>
        de
        <span className="text-warning"> 1</span>
      </div>
      <Form
        ref={formRef}
        method="post"
        className="bg-primary/30 p-2 rounded-lg mx-3 md:w-1/2 md:mx-auto shadow-lg mb-6"
      >
        <input
          type="hidden"
          name="remaining_questions"
          value={remaining_question_count}
        />
        <input type="hidden" name="type" value={"tarot"} />
        <div className="p-6">
          <label className="form-control mb-6">
            <div className="label">
              <span className="label-text">
                1. ¿Qué duda tienes o qué te interesa saber?
              </span>
              <span className="label-text-alt">Alt label</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Escribe tu pregunta aqui..."
              name="text"
            ></textarea>
            {errors?.text && (
              <span className="text-error mt-2">{errors?.text}</span>
            )}
          </label>

          <label className="form-control mb-6">
            <div className="label">
              <span className="label-text">
                2. Cuéntanos algo que nos ayude a prepararnos para tu consulta
                dándonos el contexto de la pregunta si crees que es necesario.
              </span>
              <span className="label-text-alt">Alt label</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Escribe tu pregunta aqui..."
              name="info"
            ></textarea>
          </label>

          <div className="flex gap-3 mb-3 justify-center">
            <button type="reset" className="btn btn-secondary  btn-outline">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>
        </div>
      </Form>
      <p className="text-xl pt-3 text-center mb-4">
        Estos son algunos ejemplos de tiradas generales y grupales.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">DESCUBRE QUÉ LE DUELE A TU ALMA</p>
          <iframe
            className="aspect-video rounded-lg border border-neutral-400"
            src="https://www.youtube.com/embed/Nf4QjdJ7hoU?si=Hwp0tPBXXZP97edr"
            height="100%"
            width="100%"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">DESCUBRE QUÉ TE IMPIDE CRECER</p>
          <div className="ratio ratio-16x9">
            <iframe
              className="aspect-video rounded-lg border border-neutral-400"
              src="https://www.youtube.com/embed/W74TDapruPM?si=W8l_vMX4QZyTkeEV"
              height="100%"
              width="100%"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">DESCUBRE QUÉ TE DICE EL REINO VEGETAL</p>
          <iframe
            className="aspect-video rounded-lg border border-neutral-400"
            src="https://www.youtube.com/embed/j7uJY37pmCI?si=YIDalr3wL-aMFVXt"
            height="100%"
            width="100%"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col m-10">
          <p className="h-10 mb-2">DESCUBRE QUÉ TE DICE LA ENERGÍA CHAMÁNICA</p>
          <iframe
            className="aspect-video rounded-lg border border-neutral-400"
            src="https://www.youtube.com/embed/fwwmPC-rgbI?si=JJp2eUZAfUo4-zLn"
            height="100%"
            width="100%"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Tarot;
