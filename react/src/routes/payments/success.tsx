/* eslint-disable react-refresh/only-export-components */
import { useStripe } from "@stripe/react-stripe-js";
import { PaymentIntentResult } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useLocation } from "react-router-dom";
import { api } from "../../api/axios";
import { storage } from "../../utils/storage";
import { useCart } from "../../context/CartContext";
import { PaymentIntent } from "../../utils/definitions";

export const successLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const subscriptionId = url.searchParams.get("subscriptionId");
  if (subscriptionId) {
    try {
      const response = await api.get(
        `subscriptions/?subscriptionId=${subscriptionId}`
      );
      const subscription = response.data;
      return subscription;
    } catch (error) {
      console.error(error);
    }
  }
  return null;
};

export interface Subscription {
  current_period_start:number,
  current_period_end:number,

}

const Success = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { subscription } = (useLoaderData() as { subscription: Subscription }) ?? { subscription: null };
  const { setCartItems } = useCart();
  console.log(subscription);
  const clientSecret = searchParams.get("payment_intent_client_secret") as string;
  const stripe = useStripe();
  const [message, setMessage] = useState("");
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | undefined>();
  // TODO: fetch subscription data, invoice link etc.

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }

    stripe
      ?.retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: PaymentIntentResult) => {
        setPaymentIntent(paymentIntent as PaymentIntent);
        console.log(paymentIntent)
        switch (paymentIntent?.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            console.log(paymentIntent);
            setCartItems([]);
            storage.remove("cart");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [clientSecret, setCartItems, stripe]);

  

  return (
    <div className="text-center">
      <div className="text-3xl text-primary">Success</div>
      {message && <div>{message}</div>}
      {subscription && (
        <div>
          <p>
            from{" "}
            {new Date(subscription?.current_period_start * 1000).toLocaleString()}
          </p>
          <p>
            to{" "}
            {new Date(subscription?.current_period_end * 1000).toLocaleString()}
          </p>
        </div>
      )}
      <>
        <a
          href={`https://dashboard.stripe.com/test/payments/${paymentIntent?.id}`}
          target="_blank"
          rel="noreferrer"
        >
          {paymentIntent?.id}
        </a>
      </>
    </div>
  );
};

export default Success;