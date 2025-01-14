import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Suscription = () => {
    const { store, actions } = useContext(Context);

    return (
       <>
       <div className="card-container">
  <div className="card basic">
    <div className="icon"></div>
    <h2>Básico</h2>
        <ul>
                <li>Descuentos estándar</li>
                <li>Tarifas de envío regulares</li>
                <li>Visibilidad limitada de tus productos</li>
                <li>Acceso a contenido general</li>
                <li>Soporte y asistencia estándar</li>
                <li>Acceso al FAQ</li>
        </ul>
    <p>Gratis</p>
  </div>

  <div className="card premium">
    <div className="icon crown"></div>
    <h2>PREMIUM BOSS</h2>
        <ul>
                <li>Descuentos exclusivos</li>
                <li>Envios gratuitos</li>
                <li>Mejora de la visibilidad de sus productos</li>
                <li>Acceso anticipado a contenido exclusivo</li>
                <li>Soporte y asistencia mejorado</li>
        </ul>
    <p className="price">9.99€<span>/mes</span></p>
    <button>¡Únete!</button>
  </div>
</div>



       </>
    );
};
