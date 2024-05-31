import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as Error;
  console.error(error);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="text-center p-4 my-auto">
        <h1 className="text-5xl mb-3">Oops!</h1>
        <h5 className="text-3xl mb-3">Sorry, an error has ocurred.</h5>
        <p className="text-2xl text-red-600">
          <i>
            {isRouteErrorResponse(error)
              ? error.statusText || error.message
              : error.message}
          </i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
