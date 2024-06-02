/* eslint-disable react-refresh/only-export-components */
import type { ActionFunctionArgs } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { api } from "../../api/axios";
import authProvider from "../../utils/auth";
import { toast } from "react-toastify";

export const loginLoader = async () => {
  // todo: ensure this works
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
  const response = await api.options("api/login/");

  return response ? response.data : null;
};

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  //   TODO: validate input data
  try {
    await authProvider.login(formData);

    const redirectTo = formData.get("redirectTo") as string | null;

    return redirect(redirectTo || "/");
  } catch (error) {
    console.error(error);
    toast.error("Ha ocurrido un error");
  }
  return null;
};

const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl text-primary font-bold">Iniciar sesión</h1>
        <p className="py-8">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <Form className="card-body mx-auto" method="post">
          <input type="hidden" name="redirectTo" value={from} />
          <div className="form-control mb-3">
            <input
              type="text"
              placeholder="Usuario"
              className="floating-label-input peer"
              name="username"
              id="username"
            />
            <label htmlFor="username" className="floating-label">
              Nombre de usuario
            </label>
          </div>
          {/* <div className="form-control mb-3">
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
          </div> */}
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
            <div className="label">
              <Link
                to={"/reset-password"}
                className="label-text-alt link link-hover"
              >
                Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Iniciar sesión
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
