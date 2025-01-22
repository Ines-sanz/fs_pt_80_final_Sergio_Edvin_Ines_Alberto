import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/checkout.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from "../component/checkoutForm.jsx";

export const Checkout = () => {

  const stripePromise = loadStripe(process.env.STRIPE_PROMISE);
  //prueba
  const shippingAddress = "Calle Ramon 123, Barcelona, España"; // ejemplo 
  const products = [
    { nombre: "Producto 1", precio: "20€" },
    { nombre: "Producto 2", precio: "15€" },
    { nombre: "Producto 3", precio: "30€" },
  ];

  

    return (
          <>
          {/* new part*/}
 <div className="container order-summary">
      <div className="shipping-address">
        <h2>Dirección de envío</h2>
        <p>{shippingAddress}</p>
      </div>
      <div className="product-list">
        <h2>Lista de mis compras</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.nombre} - {product.precio}
            </li>
          ))}
        </ul>
        {/* sum part starts here */}
        <div className="summary">
      <p>Total productos: {products.length}</p>
      <p>Precio total: {products.reduce((total, product) => total + parseFloat(product.precio), 0)} €</p>
    </div>
    {/* sum part ends here */}
        
      </div>
     
    </div>
     {/* until here*/}

          <div className="container mt-4">
        <h1>Por favor, introduzca los datos de su tarjeta</h1>
        <Elements stripe={stripePromise}>
				<CheckoutForm />
			  </Elements>
          </div>
          </>
    )
}

