/* eslint-disable react-refresh/only-export-components */
import type { ActionFunctionArgs } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { api } from "../../api/axios";
import authProvider from "../../utils/auth";

export const loader = async () => {
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
  try {
    const response = await api.options("api/login/");
    return response ? response.data : null;
  } catch (error) {
    console.error(error)
  }

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  //   TODO: validate input data
  try {
    await authProvider.login(formData);

    if (authProvider.isAuthenticated) {
      const redirectTo = formData.get("redirectTo") as string | null;
      redirect(redirectTo || "/");
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const Component = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl text-primary font-bold">Iniciar sesión</h1>
        <p className="py-8">
          ¿ No tienes una cuenta ?{" "}
          <Link to={"register"} className="link-primary">Registro</Link>
        </p>
      </div>
      <Form method="post">
        <div className="card shrink-0 w-full shadow-2xl bg-base-100 mx-auto">
          <div className="card-body">
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
          </div>
        </div>
      </Form>
    </>
  );
};
