/* eslint-disable react-refresh/only-export-components */
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/axios";
import { AxiosError } from "axios";

export const resetPassAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  try {
    await api.post("api/password_reset/", formData);
    toast.success("Comprueba tu email");
    return redirect("/");
  } catch (error) {
    console.error(error);
    toast.error("Ha ocurrido un error");
    if (error instanceof AxiosError && error.response?.data.error) {
      toast.warning(error.response?.data?.error);
    }
  }
  return null;
};

const ResetPassword = () => {
  const navigation = useNavigation();
  return (
    <>
      <div className="text-center px-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Resetear tu contraseña
        </h1>

        <p className="py-8">
          Introduce tu dirección de email y recibirás un link para cambiar tu
          contraseña.
        </p>
      </div>

      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <Form method="post" className="card-body">
        <div className="form-control">
          <input
            type="email"
            placeholder="email"
            className="floating-label-input peer"
            name="email"
            id="email"
            required
          />
          <label htmlFor="email" className="floating-label">
            Email
          </label>
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            disabled={navigation.state === ("submitting" || "loading")}
            className="btn btn-primary"
          >
            Resetear contraseña
          </button>
        </div>
      </Form>
      </div>
    </>
  );
};

export default ResetPassword;
