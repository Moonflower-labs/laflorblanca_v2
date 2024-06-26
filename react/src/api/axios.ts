import axios, { AxiosError, AxiosResponse } from "axios";
import getCookie from "../utils/cookie";
import { toast } from "react-toastify";

const isDevelopment = import.meta.env.DEV;

const BASEURL = isDevelopment ? "http://localhost:8000/" : "/";


const axiosConfig = {
  baseURL: BASEURL,
  ...(isDevelopment && { withCredentials: true }),
};

export const api = axios.create(axiosConfig);

api.interceptors.request.use(
  function (config) {
    config.headers["x-csrftoken"] = getCookie("csrftoken") || "";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Create a reusable error handling function
export const handleApiError = (error: Error | AxiosError) => {
  console.error(error);

  if (error instanceof AxiosError && error.response?.data.error) {
   // toast.error(error.response.data.error); // Display the error message from the response
    console.log(error.response.data.error);
  } else {
    // toast.error("An error occurred."); // Display a default error message
    console.error("An error occurred.");
  }
  return error;
};

// a higher-order function for handling API calls with error handling
const withErrorHandling =
  (apiCall: (formData: FormData) => Promise<unknown>) =>
  async (formData: FormData): Promise<AxiosResponse<unknown>> => {
    try {
      const response = await apiCall(formData);
      return response as AxiosResponse<unknown>; // Casting the response to AxiosResponse<unknown>
    } catch (err) {
      handleApiError(err as AxiosError<unknown>); // Utilize the error function with specific type
      return err as AxiosResponse<unknown>; // Return the error as AxiosResponse<unknown>
    }
  };

// Usage of withErrorHandling while making the API call
export const registerUser = async (userData: FormData) => {
  const response = await withErrorHandling(api.post.bind(api, "api/register/"))(
    userData
  );
  if (response) {
    console.log("User registration successful:", response);
    // Additional logic for successful registration
  } else {
    console.log("User registration failed due to an error.");
    // Additional logic for handling the failure
  }
};

export const login = async (formData: FormData) => {
  try {
    const response =  api.post("api/login/", formData);

    toast.promise(response, {
      pending: "Iniciando sesión...",
      success: "Sesión iniciada con éxito.",
      error: "Credenciales invalidas!",
    });
    return (await response).data;
  } catch (error) {
    handleApiError(error as Error | AxiosError<unknown>);
   return null
  }
};
export const logout = async () => {
  try {
    const response = api.post("api/logout/");
    // Display a promise toast message
    toast.promise(response, {
      pending: "Cerrando sesión...",
      success: "Sesión cerrada con éxito.",
      error: "Ha ocurrido un error.",
    });
    return (await response).data;
  } catch (error) {
    handleApiError(error as Error | AxiosError<unknown>);
    return null;
  }
};
export const register = async (formData: FormData) => {
  try {
    const response = api.post("api/register/", formData);

    // Display a promise toast message
    toast.promise(response, {
      pending: "Registrando usuario...",
      success: "Usuario registrado con éxito",
      error: "Ha ocurrido un error.",
    });
    return (await response).data;
  } catch (error) {
    handleApiError(error as Error | AxiosError<unknown>);
    return null;
  }
};
