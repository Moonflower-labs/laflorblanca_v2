/* eslint-disable react-refresh/only-export-components */
import Product from "../components/payments/Product";
import { api } from "../api/axios";
import {
  ActionFunctionArgs,
  Await,
  defer,
  useLoaderData,
} from "react-router-dom";
import { ProductItem } from "../utils/definitions";
import { Suspense, useMemo } from "react";
import StoreSkeleton from "../components/skeletons/StoreSkeleton";
import authProvider from "../utils/auth";
import { useCart } from "../context/CartContext";

export const storeLoader = () => {
  return api
    .get("products/")
    .then((response) => { return defer({ products: response.data })}
    )
    .catch((error) => {
      console.error(error);
      return null;
    });
};
export const storeAction = ({ request }: ActionFunctionArgs) => {
  if (request.method === "post") {
    console.log("post");
  }
};

export const Store = () => {
  const { products } = (useLoaderData() as { products: ProductItem[] }) ?? {products: null};
  const { addToCart } = useCart();

 
  return (
    <>
      <h2 className="text-3xl text-center text-primary font-semibold pt-3 mb-4">
        Tienda
      </h2>
      {!authProvider.isAuthenticated && (
        <div role="alert" className="alert bg-warning/60 b mb-4 w-fit mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-black shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            Si estás suscrito a cualquier plan de{" "}
            <span className="text-primary">La Flor Blanca</span>, asegúrate de
            iniciar sesión para aprovecharte de los precios de miembros.{" "}
          </span>
        </div>
      )}
      <Suspense fallback={<StoreSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center pb-4">
          <Await
            // resolve={products}
            resolve={useMemo(
              () =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(products);
                  }, 600);
                }),
              [products]
            )}
            errorElement={
              <p className="text-error text-xl text-center">
                ⚠️ Error cargando los productos!
              </p>
            }
          >
            {(productList) =>
              productList ? (
                productList.map((item: ProductItem) => (
                  <Product
                    key={item.product.id}
                    item={item}
                    addToCart={addToCart}
                  />
                ))
              ) : (
                <div className="text-2xl text-center mx-auto col-span-full">
                  No hay productos que mostrar
                </div>
              )
            }
          </Await>
        </div>
      </Suspense>
    </>
  );
};

