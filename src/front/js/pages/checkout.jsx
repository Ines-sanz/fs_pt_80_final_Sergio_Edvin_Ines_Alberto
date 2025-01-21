import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/checkout.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from "../component/checkoutForm.jsx";

export const Checkout = () => {

  const stripePromise = loadStripe(process.env.STRIPE_PROMISE);

    return (
          <>
        <h1>checkout</h1>
        <Elements stripe={stripePromise}>
				<CheckoutForm />
			  </Elements>
          </>
    )
}

