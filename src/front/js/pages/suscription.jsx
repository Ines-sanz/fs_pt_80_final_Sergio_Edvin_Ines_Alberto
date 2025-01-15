import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/suscripcion.css";

export const Suscription = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
                <h2>Conviértete en Premium Boss</h2>
                <h3>Únete a nuestra comunidad y disfruta de las mejores ventajas.</h3>
            <div className="card-container">
                <div className="card basic">
                    <div className="icon"></div>
                    <div className="circle-icon">
                        <img
                            src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/user.png"
                            alt="Basic subscription user illustration"
                        />
                    </div>
                    <ul className="bulleted-list">
                        <li>Descuentos estándar</li>
                        <li>Tarifas de envío regulares</li>
                        <li>Visibilidad limitada de tus productos</li>
                        <li>Acceso a contenido general</li>
                        <li>Soporte y asistencia estándar</li>
                    </ul>
                    <p className="price">Gratis</p>
                </div>

                <div className="card premium">
                    <div className="icon crown"></div>
                    <div className="circle-icon">
                        <img
                            src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/premium-user.png"
                            alt="Premium subscription user illustration"
                        />
                    </div>
                    <h2>PREMIUM BOSS</h2>
                    <ul className="bulleted-list">
                        <li>Descuentos exclusivos</li>
                        <li>Envíos gratuitos</li>
                        <li>Mejora de la visibilidad de sus productos</li>
                        <li>Acceso anticipado a contenido exclusivo</li>
                        <li>Soporte y asistencia mejorado</li>
                    </ul>
                    <p className="price">9.99€<span>/mes</span></p>
                    <button className="join-btn">¡Únete!</button>
                </div>
            </div>
        </>
    );
};
