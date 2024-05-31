/* eslint-disable react-refresh/only-export-components */
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/axios";
import { AxiosError } from "axios";

export const confirmResetAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const { uidb64, token } = params;
  const formData = await request.formData();
  const password = formData.get("password");
  const confirm = formData.get("confirm");
  if (password !== confirm) {
    return { error: "Las contraseñas no coinciden" };
  }
  try {
    await api.patch(`api/reset/${uidb64}/${token}`, formData);
    toast.success("Tu contraseña ha sido cambiada");
    return redirect("/login");
  } catch (error: unknown) {
    console.error(error);
    toast.error("Ha ocurrido un error");

    if (error instanceof AxiosError && error.response?.data.error) {
      toast.warning(error.response?.data?.error);
    }
  }
  return null;
};

const ConfirmReset = () => {
  const { error } = (useActionData() as { error: string }) || { error: null };
  const navigation = useNavigation();
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold  mb-4">
          Comfirma el cambio de contraseña
        </h1>

        <p className="py-8 w-2/3 mx-auto">Elige una contraseña nueva.</p>
      </div>

      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <Form method="post" className="card-body">
        <div className="form-control mb-3">
          <input
            type="password"
            placeholder="Contraseña"
            className="floating-label-input peer"
            name="password"
            id="password"
            required
          />
          <label htmlFor="password" className="floating-label">
            Contraseña
          </label>
        </div>
        <div className="form-control mb-3">
          <input
            type="password"
            placeholder="Comfirmación"
            className="floating-label-input peer"
            name="confirm"
            id="confirm"
            required
          />
          <label htmlFor="confirm" className="floating-label">
            Comfirmación
          </label>
        </div>
        {error && <div className="text-error text-center">{error}</div>}
        <div className="form-control mt-6">
          <button
            type="submit"
            disabled={navigation.state === ("submitting" || "loading")}
            className="btn btn-primary"
          >
            Confirmar
          </button>
        </div>
      </Form></div>
    </>
  );
};

export default ConfirmReset;
