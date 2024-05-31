import { useFetcher } from "react-router-dom";

const LogoutBtn = () => {
  const fetcher = useFetcher();
  const isLoggingOut = fetcher.formData != null;

  return (
    <>
      <fetcher.Form
        method="post"
        action="/logout"
        className="flex justify-center w-full"
      >
        <button
          className="btn btn-md btn-outline btn-primary w-full"
          type="submit"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              Logging out
              <span className="loading loading-infinity loading-md"></span>
            </>
          ) : (
            "Log Out"
          )}
        </button>
      </fetcher.Form>
    </>
  );
};

export default LogoutBtn;
