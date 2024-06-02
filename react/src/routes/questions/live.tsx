/* eslint-disable react-refresh/only-export-components */
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
import { MutableRefObject, useEffect, useRef } from "react";
import { Errors } from "../../utils/definitions";

export const liveLoader = async () => {
  try {
    const response = await api.get(
      "api/premium-questions/retrieve_premium_used_questions/?type=live"
    );
    return { live_used_questions: response.data };
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const liveAction = async ({ request }: ActionFunctionArgs) => {
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

export function Live() {
  const errors = useActionData() as Errors;
  const navigation = useNavigation();
  const { live_used_questions = 3 } = (useLoaderData() as {
    live_used_questions: number;
  }) || { live_used_questions: 1 };
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
  const remaining_question_count = 1 - Number(live_used_questions);

  useEffect(() => {
    if (navigation.state === "loading" && navigation.formData && !errors) {
      formRef.current?.reset(); // Reset the form
    }
  }),
    [navigation.state];
  return (
    <div className="text-center pt-16 pb-6">
      <img className="tarot" src="" alt="" width={200} />
      <h2 className="text-3xl font-semibold text-primary mb-1">
        Pregunta con respuesta en directo
      </h2>
      <div className="p-10 pt-6 md:w-2/4 mx-auto">
        <p className="h3 mb-3">
          Una sesión mensual en directo espontánea, respondiendo usando el
          método que surja. Una Pregunta por persona o miembro.
        </p>
        <p className="mb-4">
          Si no puedes estar en el directo tendrás acceso a dejar tus preguntas
          para el directo debajo. Todo lo que no de tiempo a contestar durante
          el directo se contestará en la sección Respuestas del Plan Espíritu.
        </p>
      </div>

      <div className="row my-4 justify-content-center text-center mx-auto">
        <div className="">
          Preguntas disponibles:{" "}
          <span className="text-warning">{remaining_question_count}</span> de
          <span className="h4 text-warning"> 1</span>
        </div>
        <Form
          ref={formRef}
          method="post"
          className="bg-primary/30 p-2 rounded-lg md:w-1/2 mx-auto shadow-lg"
        >
          <input
            type="hidden"
            name="remaining_questions"
            value={remaining_question_count}
          />
          <input type="hidden" name="type" value={"live"} />
          <div className="p-6">
            <label className="form-control mb-6">
              <div className="label">
                <span className="label-text">
                  1. ¿Qué necesitas aclarar, entender?
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
            <div className="mb-3 text-center">
              <button
                type="reset"
                className="btn btn-outline btn-secondary mx-1 rounded-1"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary mx-1 rounded-1">
                Enviar
              </button>
            </div>
          </div>
        </Form>
      </div>
      <div className="row my-4 justify-content-center text-center mx-auto">
        <p className="h2 title">SESIONES EN DIRECTO</p>
        <p className="h3 mb-3">
          Encuentra el link para la sessión a continuación:
        </p>

        <div className="">
          <a
            role="button"
            href="{{link[2]}}"
            className="link-info link-underline-opacity-0"
            target="_blank"
          >
            <i className="bi bi-play-fill h2 me-3"></i>{" "}
          </a>
        </div>
      </div>
    </div>
  );
}
