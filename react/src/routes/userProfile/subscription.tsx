/* eslint-disable react-refresh/only-export-components */
import { FaCheckCircle } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { api } from "../../api/axios";
import { useLoaderData } from "react-router-dom";
import { Membership } from "../../utils/definitions";

export const loader = async () => {

  try {
    const response = await api.get("api/user-profile/");
    const profile = response.data[0];
    return profile;
  } catch (error) {
    console.error(error);
    return null;
  }

}

export const Component = () => {

  const { membership } = useLoaderData() as { membership: Membership } || {}
  return (
    <div>
      {membership ? (
        <>
          <div className="overflow-x-auto mt-8">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold">{membership?.plan?.name}</td>
                  <td>
                    {membership?.status === "active" ? (
                      <FaCheckCircle
                        size={20}
                        title="Activa"
                        className="text-success"
                      />
                    ) : (
                      <IoWarning
                        size={20}
                        title="Inactiva"
                        className="text-warning"
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
      ) : (
        <div className="text-xl text-center text-semibold pt-8">No tienes ninguna suscripción.</div>
      )}

    </div>
  );
};

