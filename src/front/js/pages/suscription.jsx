import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/suscripcion.css";

export const Suscription = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
                <h2><strong>Conviértete en Premium Boss</strong></h2>
                <h3>Únete a nuestra comunidad y disfruta de las mejores ventajas.</h3>
            <div className="card-container">
                <div className="card basic">
                    
                    <div className="circle-icon">
                        <img
                            src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/user.png"
                            alt="Basic subscription user illustration"
                        />
                    </div>
                    <ul className="text">
                        <li className="bulleted-list d-flex flex-start">Descuentos estándar</li>
                        <li className="bulleted-list d-flex flex-start">Tarifas de envío regulares</li>
                        <li className="bulleted-list d-flex flex-start">Visibilidad limitada de tus productos</li>
                        <li className="bulleted-list d-flex flex-start">Acceso a contenido general</li>
                        <li className="bulleted-list d-flex flex-start">Soporte y asistencia estándar</li>
                    </ul>
                 
                </div>

                <div className="card premium">
                    
                    <div className="circle-icon">
                        <img
                            src="https://res.cloudinary.com/dr0wlij0c/image/upload/v1736453861/web-illustrations/premium-user.png"
                            alt="Premium subscription user illustration"
                        />
                    </div>
                    <h2>PREMIUM BOSS</h2>
                    <ul className="text">
                        <li className="bulleted-list d-flex flex-start">Descuentos exclusivos</li>
                        <li className="bulleted-list d-flex flex-start">Envíos gratuitos</li>
                        <li className="bulleted-list d-flex flex-start">Mejora de la visibilidad de sus productos</li>
                        <li className="bulleted-list d-flex flex-start">Acceso anticipado a contenido exclusivo</li>
                        <li className="bulleted-list d-flex flex-start">Soporte y asistencia mejorado</li>
                    </ul>
                    <div className="container">
                    <p><strong className="price">9.99€</strong><span>/mes</span></p>
                    <button className="join-btn"><strong>¡Únete!</strong></button>
                    </div>
                </div>
            </div>
        </>
    );
};
