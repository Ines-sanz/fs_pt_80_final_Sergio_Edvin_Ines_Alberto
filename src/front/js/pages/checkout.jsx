import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../component/checkoutForm.jsx";
import "../../styles/checkout.css";

export const Checkout = () => {
  const stripePromise = loadStripe(process.env.STRIPE_PROMISE);
  const { store, actions } = useContext(Context);

  // Calculate the total price of the items in the shopping cart
  const calculateTotalPrice = () => {
    return store.shoppingCart.reduce(
      (total, product) => total + parseFloat(product.price || 0),
      0
    );
  };

  useEffect(() => {
    if (store.user) {
      actions.userShoppingCart();
    }
  }, [store.user, actions]);

  return (
    <div className="container order-summary">
      {/* Shipping Address */}
      <div className="shipping-address">
        <h2>Dirección de Envío</h2>
        {store.user ? (
          <>
            <p>{store.user.address}</p>
            <p>
              {store.user.city}, {store.user.postalCode}
            </p>
          </>
        ) : (
          <p>No se encontró la dirección del usuario.</p>
        )}
      </div>

      {/* Product List */}
      <div className="product-list">
        <h2>Lista de mis compras</h2>
        {store.shoppingCart.length > 0 ? (
          <ul>
            {store.shoppingCart.map((product, index) => (
              <li className="Card" key={index}>
                <p>
                  {product.name} - {parseFloat(product.price).toFixed(2)}€
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="sinproductos">No hay productos en el carrito.</p>
        )}
        <h3>Total: {calculateTotalPrice().toFixed(2)}€</h3>
      </div>

      {/* Stripe Checkout Form */}
      <div className="container mt-4">
        <h1>Por favor, introduzca los datos de su tarjeta</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm totalAmount={calculateTotalPrice()} />
        </Elements>
      </div>
    </div>
  );
};
