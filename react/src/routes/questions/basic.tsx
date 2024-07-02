/* eslint-disable react-refresh/only-export-components */
import type { ActionFunctionArgs } from "react-router-dom";
import { useFetcher, useLoaderData } from "react-router-dom";
import { MutableRefObject, useEffect, useRef } from "react";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
import { Errors } from "../../utils/definitions";

export const loader = async () => {
  try {
    const response = await api.get(
      "api/basic-questions/retrieve_basic_used_questions/"
    );
    return { basic_used_questions: response.data };
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const remaining_questions = formData?.get("remaining_questions") || 0;

  if ((remaining_questions as number) <= 0) {
    toast.error("Yas has usado el máximo numero de preguntas este mes");
    return null;
  }
  const name = formData.get("name");
  const age_group = formData.get("age_group");
  const subject = formData.get("subject");
  const text = formData.get("text");

  const errors: Errors = {};

  // validate the fields
  if (!name || name.toString().length < 1) {
    errors.name = "Debes dar un nombre";
  }

  if (!age_group) {
    errors.age_group = "Elige un grupo de edad";
  }
  if (!subject) {
    errors.subject = "Elige un tema";
  }
  if (!text) {
    errors.text = "Escribe una pregunta";
  }
  // return data if we have errors
  if (Object.keys(errors).length) {
    return { errors };
  }
  // todo: validate input data + provide feedback
  try {
    const response = await api.post("api/basic-questions/", formData);
    const questionPromise = new Promise((resolve) => resolve(response));
    toast.promise(questionPromise, {
      pending: "Enviando pregunta...",
      success: "Pregunta enviada",
      error: "Ha ocurrido un error.",
    });
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Ha ocurrido un error.");
  }

  // TODO: handle rating action.
  return null;
};

export function Component() {
  const { basic_used_questions = 3 } = (useLoaderData() as {
    basic_used_questions: number;
  }) || { basic_used_questions: 3 };
  const remaining_question_count = 3 - Number(basic_used_questions);
  const fetcher = useFetcher();

  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = document.querySelector(
      'input[name="another"]'
    ) as HTMLInputElement;

    if (event.target.checked) {
      input.disabled = false; // Enable the text input if the radio is checked
      input.required = true;
    } else {
      input.disabled = true; // Disable the text input if the radio is unchecked
      input.value = ""; // Clear the value when the radio is unchecked
      input.required = false;
    }
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && !fetcher.data.errors) {
      formRef.current?.reset(); // Reset the form
    }
  }, [fetcher.state, fetcher.data]);

  useEffect(() => {
    const errors = fetcher.data?.errors || {};
    const form = document.querySelector("form#question");

    for (const key in errors) {
      if (errors[key]) {
        const errorElement = form?.querySelector(
          `input[name="${key}"], select[name="${key}"], textarea[name="${key}"]`
        ) as HTMLElement;

        if (errorElement) {
          errorElement.setAttribute("tabindex", "0");
          errorElement.focus();
          errorElement.classList.add(`input-error`);
          break; // Stop iterating once the first error element is focused
        }
      }
    }
  }, [fetcher.data?.errors]);

  //  todo: clear form inputs accordingly, display spinner

  return (
    <div className="text-center pt-16 pb-6">
      <h2 className="text-3xl font-semibold text-primary mb-1">
        Pregunta de Personalidad
      </h2>
      <div className="p-10 pt-6 md:w-2/4 mx-auto">
        <p className="text-2xl mb-3">Hola Almas Oscuras y Luminosas</p>
        <p>
          Aquí podéis preguntar de una manera más anónima todo aquello que
          verdaderamente os inquieta (siguiendo la línea de mi contenido) y que
          no os atrevéis a hacer en los canales públicos. No mencionaremos
          ningún dato personal solo la pregunta en sí al responder.
        </p>
      </div>
      <div className="mb-6">
        Preguntas disponibles:
        <span className="text-warning">{" "}{remaining_question_count} </span>
        de
        <span className="text-warning"> 3</span>
      </div>
      <fetcher.Form
        ref={formRef}
        method="post"
        id="question"
        className="bg-primary/30 p-2 rounded-lg md:w-1/2 mx-auto shadow-lg"
      >
        <input
          type="hidden"
          name="remaining_questions"
          value={remaining_question_count}
        />
        <div className="p-10">
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text me-3 md:me-0">Nombre</span>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                className="input input-bordered w-full max-w-xs $"
              />
            </label>
            {fetcher?.data?.errors?.name && (
              <span className="text-error">{fetcher?.data?.errors?.name}</span>
            )}
          </div>

          <div className="mb-3">
            <div>
              {" "}
              1. ¿Tu pregunta es sobre Limpiezas, Emociones y Sentimientos
              Discordantes, Ataques Psíquicos o Habilidades Psíquicas?
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Limpiezas</span>
                <input
                  type="radio"
                  name="subject"
                  className="radio checked:bg-primary"
                  value={"Limpiezas"}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Emociones y Sentimientos Discordantes
                </span>
                <input
                  type="radio"
                  name="subject"
                  className="radio checked:bg-primary"
                  value={"Emociones"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Ataques Psíquicos</span>
                <input
                  type="radio"
                  name="subject"
                  className="radio checked:bg-primary"
                  value={"Ataques Psíquicos"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Habilidades Psíquicas</span>
                <input
                  type="radio"
                  name="subject"
                  className="radio checked:bg-primary"
                  value={"Habilidades Psíquicas"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Otro{" "}
                  <span className="font-semibold">
                    (siguiendo la línea de nuestro contenido)
                  </span>{" "}
                </span>
                <input
                  type="radio"
                  name="subject"
                  className="radio checked:bg-primary"
                  value={"Other"}
                />
              </label>
            </div>
          </div>
          <label className="form-control mb-6">
            <div className="label">
              <span className="label-text">
                2. ¿Qué duda tienes o te interesa saber sobre este tema?
              </span>
              <span className="label-text-alt">Alt label</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Escribe tu pregunta aqui..."
              name="text"
            ></textarea>
            {fetcher?.data?.errors?.text && (
              <span className="text-error mt-3">
                {fetcher?.data?.errors?.text}
              </span>
            )}
          </label>
          <div className="mb-6">
            <div> 3. ¿Dónde has oído hablar de nosotros?</div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Telegram</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={"Telegram"}
                  name="media"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">YouTube</span>

                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={"YouTube"}
                  name="media"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Instagram</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={"Instagram"}
                  name="media"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Facebook</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={"Facebook"}
                  name="media"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">LinkedIn</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={"LinkedIn"}
                  name="media"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Anuncio</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={"Anuncio"}
                  name="media"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">De boca en boca</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={"De boca en boca"}
                  name="media"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Otro</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={"otro"}
                  name="media"
                  onChange={(event) => {
                    handleRadioChange(event);
                  }}
                />
              </label>
              <input
                type="text"
                placeholder="Especifica aquí..."
                className="input input-bordered w-full max-w-xs"
                name={"another"}
                disabled
              />
            </div>
          </div>

          <div className="mb-3">
            <div>4. ¿Cúal es tu grupo de edad?</div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">De 16 a 25 años </span>
                <input
                  type="radio"
                  name="age_group"
                  className="radio checked:bg-primary"
                  value={"16-25"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">De 26 a 35 años</span>
                <input
                  type="radio"
                  name="age_group"
                  className="radio checked:bg-primary"
                  value={"26-35"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">De 36 a 45 años</span>
                <input
                  type="radio"
                  name="age_group"
                  className="radio checked:bg-primary"
                  value={"36-45"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">De 46 a 55 años</span>
                <input
                  type="radio"
                  name="age_group"
                  className="radio checked:bg-primary"
                  value={"46-55"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">De 56 a 65 años</span>
                <input
                  type="radio"
                  name="age_group"
                  className="radio checked:bg-primary"
                  value={"56-65"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">De 66 a 75 años</span>
                <input
                  type="radio"
                  name="age_group"
                  className="radio checked:bg-primary"
                  value={"66-75"}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Mayor de 75 años</span>
                <input
                  type="radio"
                  name="age_group"
                  className="radio checked:bg-primary"
                  value={">75"}
                />
              </label>
            </div>
            {fetcher?.data?.errors?.age_group && (
              <span className="text-error">
                {fetcher?.data?.errors?.age_group}
              </span>
            )}
          </div>
          <label className="label">
            <div className="label">
              <span className="label-text">5. ¿Cúal es tu Género?</span>
            </div>
            <select className="select select-bordered" name="gender" required>
              <option value={"mujer"}>Mujer</option>
              <option value={"hombre"}>Hombre</option>
            </select>
          </label>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text me-3 md:me-0">
                6. ¿Desde qué país nos contactas?
              </span>
              <input
                type="text"
                name="country"
                placeholder="País"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
          </div>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text me-3 md:me-0">
                6. ¿Desde qué ciudad nos contactas?
              </span>
              <input
                type="text"
                name="city"
                placeholder="Ciudad"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        // disabled={remaining_question_count <= 0}
        >
          Enviar
        </button>
      </fetcher.Form>
    </div>
  );
}