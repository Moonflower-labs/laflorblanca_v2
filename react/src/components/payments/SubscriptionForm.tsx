/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { PaymentIntent, StripePaymentElementOptions } from "@stripe/stripe-js";

const SubscriptionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);

  // Initialize an instance of stripe.
  const stripe = useStripe();
  const elements = useElements();
  const clientSecret = location.state?.clientSecret as string;
  const subscriptionId = location.state?.subscriptionId as string;

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Pago realizado con éxito!");
          break;
        case "processing":
          setMessage("El pago se está procesando.");
          break;
        case "requires_payment_method":
          setMessage("Introduce los datos para confirmar el pago.");
          break;
        default:
          setMessage("Ha ocurrido un error.");
          break;
      }
      setPaymentIntent(paymentIntent as PaymentIntent);
    }).catch((error) => {
      console.error(error)
    });
  }, [clientSecret, location.search, stripe]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.log("no stuff")
      return;
    }
    elements.submit();
    const params = subscriptionId ? `?subscriptionId=${subscriptionId}` : "";
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success${params}`,
      },
    });

    if (error) {
      setMessage(error.message as string);
      return;
    }
  };

  if (paymentIntent && paymentIntent.status === "succeeded") {
    navigate("/success");
    return null;
  }
  const paymentElementOptions = {
    layout: "tabs",
    business: { name: "La Flor Blanca" },
  };
  if (clientSecret == null) {
    return null;
  }
  
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto rounded-lg border border-primary/40 shadow-lg p-10 min-w-[400px] w-[32vw] text-center"
      >
        <PaymentElement
          options={ paymentElementOptions as StripePaymentElementOptions }
        />

        <button disabled={!stripe || !elements} className="btn btn-primary">
          Suscribir
          {paymentIntent && <span> £{paymentIntent?.amount / 100}</span>}
        </button>

        <div className="mt-4">{message}</div>
      </form>
    </>
  );
};

export default SubscriptionForm;
