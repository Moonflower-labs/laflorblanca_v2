import { Outlet, useRouteLoaderData } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { Stripe, StripeElementsOptions } from "@stripe/stripe-js";

const PaymentsLayout = () => {
  const { stripePromise } = useRouteLoaderData("root") as {
    stripePromise: Stripe | PromiseLike<Stripe | null>;
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientSecret =
    (location.state?.clientSecret as string) ||
    searchParams.get("payment_intent_client_secret");

  if (!stripePromise || !clientSecret) {
    return;
  }
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#a92deb",
    },
  };
  const options = {
    clientSecret,

    appearance,
  };
  return (
    <>
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={options as StripeElementsOptions}
        >
          <Outlet />
        </Elements>
      )}
    </>
  );
};

export default PaymentsLayout;
