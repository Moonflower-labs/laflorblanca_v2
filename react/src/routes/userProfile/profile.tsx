/* eslint-disable react-refresh/only-export-components */
import { Link, Outlet, useLoaderData } from "react-router-dom";
import type { ActionFunction, ActionFunctionArgs } from "react-router-dom";
import { LoaderFunction } from "react-router-dom";
import { api } from "../../api/axios";
import { FaCheckCircle } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";

export const userProfileLoader: LoaderFunction = async () => {
  try {
    const response = await api.get("api/user-profile/");
    const profile = response.data[0];
    return profile;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const userProfileAction: ActionFunction = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  return formData;
};

interface Profile {
  membership:{
    plan:{
      name: string;
     
    }
    status: string;
  }
}

export const UserProfile = () => {
  const profile = useLoaderData() as Profile;
  console.log(profile);
  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-3xl text-center text-primary font-semibold pt-3">
        Mi Perfil
      </h1>
      <div role="tablist" className="tabs tabs-lifted">
        <Link to={"/"} role="tab" className="tab">
          Overview
        </Link>
        <Link to={"favorites"} role="tab" className="tab">
          Mis favoritos
        </Link>
        <Link to={"subscription"} role="tab" className="tab">
          Suscripción
        </Link>
      </div>
      {profile ? (
        <>
          {profile?.membership && (
            <>
              <div className="overflow-x-auto mt-8">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Suscripción</th>
                      <th>Plan</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">Hart Hagerty</div>
                          </div>
                        </div>
                      </td>
                      <td>{profile?.membership?.plan?.name}</td>
                      <td>
                        {profile?.membership?.status === "active" ? (
                          <FaCheckCircle
                            size={20}
                            title="Activa"
                            className="text-success mx-auto"
                          />
                        ) : (
                          <IoWarning
                            size={20}
                            title="Inactiva"
                            className="text-warning mx-auto"
                          />
                        )}
                      </td>
                      <th>
                        <button className="btn btn-outline btn-primary btn-xs">
                          Cambiar plan
                        </button>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : (
        <div>No hemos encontrado tu perfil</div>
      )}
      <Outlet />
    </div>
  );
};