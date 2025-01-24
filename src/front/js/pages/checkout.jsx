import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/checkout.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from "../component/checkoutForm.jsx";

export const Checkout = () => {
  const stripePromise = loadStripe(process.env.STRIPE_PROMISE);
  
  const { store, actions } = useContext(Context);

  // Calculate the total price of the items in the shopping cart
  const calculateTotalPrice = () => {
    return store.shoppingCart.reduce((total, product) => {
      return total + product.price;
    }, 0);
  };

  // Handle cart update when the component loads
  useEffect(() => {
    if (store.user) {
      actions.userShoppingCart(); // Fetch the cart products
    }
  }, [store.user, actions]);

  return (
    <>
      <div className="container order-summary">
        <div className="shipping-address">
          <h2>Dirección de envío</h2>
          <p>{store.user?.address}</p>
          <p>{store.user?.city}, {store.user?.postalCode}</p>
        </div>

        <div className="product-list">
          <h2>Lista de mis compras</h2>
          <ul>
            {store.shoppingCart.map((product, index) => (
              <div className="Card" key={index}>
                <p>{product.name} - {product.price}€</p>
              </div>
            ))}
          </ul>
          <h3>Total: {calculateTotalPrice()}€</h3>
        </div>

        <div className="container mt-4">
          <h1>Por favor, introduzca los datos de su tarjeta</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm totalAmount={calculateTotalPrice()} />
          </Elements>
        </div>
      </div>
    </>
  );
};
