/* eslint-disable react-refresh/only-export-components */
import type { LoaderFunctionArgs } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import authProvider from "../../utils/auth";
import { api } from "../../api/axios";

export const registerLoader = async () => {
  const response = await api.options("api/login/");

  return response ? response.data : null;
};

export const registerAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const response = await authProvider.register(formData);

  if (response !== null && response !== undefined) {
    return null;
  }
  await authProvider.login(formData);
  return redirect("/");
};

const Register = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl text-primary font-bold">
          Registrar usuario
        </h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <Form method="post" className="card-body mx-auto">
          <div className="form-control mb-3">
            <input
              type="text"
              placeholder="Usuario"
              className="floating-label-input peer"
              name="username"
              id="username"
              required
            />
            <label className="floating-label" htmlFor="username">
              <span className="label-text">Nombre de usuario</span>
            </label>
          </div>
          <div className="form-control mb-3">
            <input
              type="email"
              placeholder="Email"
              className="floating-label-input peer"
              name="email"
              id="email"
              required
            />{" "}
            <label className="floating-label" htmlFor="email">Email</label>
          </div>
          <div className="form-control mb-3">
            <input
              type="password"
              placeholder="Contraseña"
              className="floating-label-input peer"
              name="password"
              id="password"
              required
            />
            <label className="floating-label" htmlFor="password">
            Contraseña
            </label>
          </div>
          <div className="form-control mb-3">
            <input
              type="password"
              placeholder="Contraseña"
              className="floating-label-input peer"
              name="confirmation"
              id="confirmation"
              required
            />
            <label className="floating-label" htmlFor="confirmation">
            Confirma la contraseña
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Registrar</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
