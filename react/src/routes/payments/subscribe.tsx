/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useRouteLoaderData } from "react-router-dom";
import SubscriptionForm from "../../components/payments/SubscriptionForm";
import { Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
 
const Subscribe = () => {
  const { stripePromise } = useRouteLoaderData("root") as {
    stripePromise: Stripe | PromiseLike<Stripe | null>;
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientSecret =
    (location.state?.clientSecret as string) ||
    searchParams.get("payment_intent_client_secret");
    
  console.log("secret", clientSecret)
  console.log("promise", stripePromise)

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
    <div className="pb-3">
      <h1 className="text-center text-3xl text-primary font-semibold pt-3 mb-3">
        Confirma tu suscripción
      </h1>
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={options as StripeElementsOptions}
        >
          <SubscriptionForm />
        </Elements>
      )}
      {/* <SubscriptionForm /> */}
    </div>
  );
};

export default Subscribe;
