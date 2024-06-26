/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from "react";
import {
  useNavigation,
  useSubmit,
  useFetcher,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { BsFilterCircle } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";


const FilterComponent = () => {
  const { q } = (useLoaderData() as { q: string | null }) || { q: null };
  const searchFormRef = useRef<HTMLFormElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigation = useNavigation();
  const location = useLocation();
  const submit = useSubmit();
  const fetcher = useFetcher();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("search");
  const searchParams = new URLSearchParams(location.search);
  const isChecked =
    searchParams.get("favorites") === "on" ||
    searchParams.get("favorites") === "true";

  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  const debounceSearchSubmit = (event: HTMLFormElement, options?: object) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      submit(event, { ...options, preventScrollReset: true, replace: true });
    }, 800);
  };

  useEffect(() => {
    if (formRef.current) {
      const favoriteElement =
        (formRef.current.elements.namedItem("favorites") as HTMLInputElement) ||
        null;

      // TODO: Inverted logic, needs correcting
      favoriteElement.value = isChecked ? "false" : "true";
    }
  }, [isChecked]);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 align-middle w-[90%] mx-auto pb-4">
      <div className="flex flex-row gap-4 align-middle w-full">
        <fetcher.Form
          ref={searchFormRef}
          onChange={(event) => debounceSearchSubmit(event.currentTarget)}
          className="flex flex-row gap-4 align-middle w-full"
        >


          <label className="input input-bordered input-md w-full md:w-1/3 flex items-center align-middle gap-2">
            <input
              type="text"
              className="w-full"
              placeholder="Buscar"
              name="search"
              id="search"
              defaultValue={q || ""}
            />
            <FaSearch size={24} className="text-primary" />
          </label>
        </fetcher.Form>
        <div aria-hidden hidden={!searching}>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </div>
      <div className="dropdown dropdown-bottom md:dropdown-end my-auto">
        <div
          tabIndex={0}
          role="button"
          className="w-full flex justify-between md:gap-4 m-1 text-primary"
        >
          Filtros
          <BsFilterCircle size={24} />
        </div>
        <fetcher.Form
          ref={formRef}
          onReset={() => {
            const searchParams = new URLSearchParams(
              navigation.location?.search
            );
            searchParams.delete("favorites");
            searchParams.delete("category");
            history.replaceState(null, "", `?${searchParams.toString()}`);
          }}
        >
          <div
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72"
          >
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Favoritos</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  name="favorites"
                  // defaultValue={isChecked ? "true" : "false"}
                  defaultChecked={isChecked}
                  onChange={() => {
                    submit(formRef.current, {
                      preventScrollReset: true,
                    }); // Submit the form on every change
                  }}
                />
              </label>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue={"Categoría"}
              name="category"
              onChange={() => {
                submit(formRef.current, { preventScrollReset: true });
              }}
            >
              <option disabled>Categoría</option>
              <option value="luz">Luz</option>
              <option value="chakras">Chakras</option>
            </select>
            <button type="reset">Reset</button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default FilterComponent;
