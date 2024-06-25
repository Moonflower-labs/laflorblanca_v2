import { useState, useMemo, useEffect, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { type Stripe, type StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "../../components/payments/CheckoutForm";
import { api } from "../../api/axios";
import AddressForm from "../../components/payments/AddressForm";
import { useRouteLoaderData } from "react-router-dom";
import { CartProduct } from "../../utils/definitions";
import { useCart } from "../../context/CartContext";



export default function Checkout() {

  const { stripePromise } = useRouteLoaderData("root") as { stripePromise: Stripe | PromiseLike<Stripe | null> };
  const lastCartItems = useRef<CartProduct[]>([]);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [amount, setAmount] = useState(0);
  const { cartItems } = useCart();

  useEffect(() => {
    // Update the reference when cartItems change
    lastCartItems.current = cartItems;

  }, [cartItems]);



  useMemo(() => {
    const fetchData = async () => {
      // Check if the payment intent exists and there are changes in cartItems
      if (!clientSecret && cartItems.length > 0) {
        try {
          const response = await api.post("/create-payment-intent/", {
            items: cartItems,
          });
          setClientSecret(response.data.clientSecret);
          setAmount(response.data.amount);
          setPaymentIntentId(response.data.id);
        } catch (error) {
          console.error("Error creating payment intent:", error);
          // Handle the error
        }
      } else if (clientSecret && cartItems.length > 0) {
        // Check if cartItems are different than the ones used in the last PATCH request
        const isEqual =
          JSON.stringify(cartItems) === JSON.stringify(lastCartItems.current);

        if (!isEqual) {
          try {
            const response = await api.patch("/create-payment-intent/", {
              paymentIntentId,
              items: cartItems,
            });
            setAmount(response.data.amount);
          } catch (error) {
            console.error("Error updating payment intent:", error);
            // Handle the error
          }
        }
      }
    };

    fetchData(); // Fetch the data when the component mounts or when relevant data changes
  }, [cartItems, clientSecret, paymentIntentId]);

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
    <div className="pb-4">
      <h1 className="text-3xl text-center text-primary font-semibold pt-3 mb-4">
        Checkout
      </h1>
      {clientSecret && stripePromise && (
        <Elements
          options={options as StripeElementsOptions}
          stripe={stripePromise}
        >
          <AddressForm />
          <CheckoutForm amount={amount} />
        </Elements>
      )}
    </div>
  );
}

