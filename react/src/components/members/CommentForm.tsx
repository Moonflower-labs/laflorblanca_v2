import { useEffect, useRef } from "react";
import { CommentFormProps } from "../../utils/definitions";
import { useFetcher } from "react-router-dom";

const CommentForm = ({ object, fieldName }: CommentFormProps) => {
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.message) {
      formRef.current?.reset(); // Reset the form
    }
  }, [fetcher.data?.message, fetcher.state, formRef]);

  return (
    <div className="text-center">
      <h3 className="text-xl text-primary mb-4">Añade un comentario</h3>
      <fetcher.Form
        ref={formRef}
        method="post"
        action="/comment"
        className="flex flex-col mx-3 md:w-1/3 md:mx-auto pb-4"
      >
        <input type="hidden" name={fieldName} value={object.id} />
        <textarea
          className="textarea textarea-primary mb-4"
          placeholder="Comentario"
          name="text"
        ></textarea>
        <p className="text-error mb-3">
          {fetcher.data?.error && fetcher.data.error}
        </p>
        <button type="submit" className="btn btn-primary btn-sm w-1/2 mx-auto">
          Añadir
        </button>
      </fetcher.Form>
    </div>
  );
};

export default CommentForm;
